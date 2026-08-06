/**
 * Seeds Team, FAQ, and Blog placeholder content when collections are empty.
 */
import { config as loadDotenv } from "dotenv";

loadDotenv({ override: false });

async function seed() {
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const { TeamMemberData } = await import("../data/TeamData");
  const { FaqData } = await import("../data/FaqData");
  const { BlogPostData } = await import("../data/BlogData");

  const payload = await getPayload({ config });

  const teamExisting = await payload.find({
    collection: "team-members",
    limit: 1,
  });
  if (teamExisting.totalDocs === 0) {
    for (const m of TeamMemberData) {
      await payload.create({
        collection: "team-members",
        data: {
          name: m.name,
          slug: m.slug,
          role: m.role,
          published: true,
          bio: m.bio,
          photoUrl: m.photo,
          areas: m.areas.map((label) => ({ label })),
          phone: m.phone,
          email: m.email,
          order: m.order,
        },
      });
      console.log(`[seed-content] team — ${m.slug}`);
    }
  } else {
    const team = await payload.find({
      collection: "team-members",
      limit: 50,
      depth: 0,
      pagination: false,
    });
    let synced = 0;
    for (const doc of team.docs) {
      const source = TeamMemberData.find((m) => m.slug === doc.slug);
      if (!source?.photo) continue;
      const current =
        typeof doc.photoUrl === "string" ? doc.photoUrl : "";
      if (current === source.photo) continue;
      await payload.update({
        collection: "team-members",
        id: doc.id,
        data: {
          photoUrl: source.photo,
          photo: null,
        },
      });
      synced += 1;
      console.log(`[seed-content] team photo — ${doc.slug} → ${source.photo}`);
    }
    console.log(
      synced
        ? `[seed-content] Synced ${synced} team photo(s)`
        : "[seed-content] Team photos already up to date"
    );
  }

  const faqExisting = await payload.find({ collection: "faqs", limit: 1 });
  if (faqExisting.totalDocs === 0) {
    for (const f of FaqData) {
      await payload.create({
        collection: "faqs",
        data: {
          question: f.question,
          answer: f.answer,
          category: f.category as
            | "general"
            | "buying"
            | "selling"
            | "renting"
            | "plots",
          published: true,
          order: f.order,
        },
      });
      console.log(`[seed-content] faq — ${f.id}`);
    }
  } else {
    console.log("[seed-content] Skip faqs (already seeded)");
  }

  const postExisting = await payload.find({ collection: "posts", limit: 1 });
  if (postExisting.totalDocs === 0) {
    for (const p of BlogPostData) {
      await payload.create({
        collection: "posts",
        data: {
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          body: p.body,
          coverUrl: p.cover,
          category: p.category as
            | "real-estate"
            | "buying-tips"
            | "patna-local"
            | "investment",
          authorName: p.authorName,
          publishedAt: p.publishedAt,
          published: true,
        },
      });
      console.log(`[seed-content] post — ${p.slug}`);
    }
  } else {
    console.log("[seed-content] Skip posts (already seeded)");
  }

  console.log("[seed-content] Done.");
}

seed().catch((err) => {
  console.error("[seed-content] Failed:", err);
  process.exit(1);
});

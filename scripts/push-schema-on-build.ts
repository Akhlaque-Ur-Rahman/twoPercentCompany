/**
 * One-shot schema sync for empty Neon DBs during Vercel build.
 * Uses NODE_ENV=development so Payload's drizzle push runs.
 */
process.env.NODE_ENV = "development";

const raw = (process.env.DATABASE_URL || "").trim().replace(/^["']|["']$/g, "");
process.env.DATABASE_URL = raw;

async function main() {
  if (!/^postgres(ql)?:\/\//i.test(raw)) {
    console.log(
      "[push-schema-on-build] Skip: DATABASE_URL is not Postgres (local SQLite / missing)."
    );
    return;
  }

  console.log("[push-schema-on-build] Pushing Payload schema to Postgres...");
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  await getPayload({ config });
  console.log("[push-schema-on-build] Done.");
}

main().catch((err) => {
  console.error("[push-schema-on-build] Failed:", err);
  process.exit(1);
});

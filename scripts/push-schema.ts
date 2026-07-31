// Prefer already-injected env (e.g. `vercel env run`). Only fall back to local file.
import dotenv from "dotenv";
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.length < 20) {
  dotenv.config({ path: ".env.production.local" });
}

// Force development so Postgres adapter will drizzle-push schema
process.env.NODE_ENV = "development";

async function main() {
  const raw = process.env.DATABASE_URL || "";
  const cleaned = raw.trim().replace(/^["']|["']$/g, "");
  process.env.DATABASE_URL = cleaned;

  const isPostgres = /^postgres(ql)?:\/\//i.test(cleaned);
  console.log("Using Postgres adapter:", isPostgres);
  console.log("DATABASE_URL length:", cleaned.length);
  if (!isPostgres) {
    throw new Error(
      "DATABASE_URL is not a Postgres URL. Refusing to push schema."
    );
  }

  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const payload = await getPayload({ config });
  console.log("Payload init OK — schema should be pushed to Postgres.");
  console.log(
    "Collections:",
    payload.config.collections.map((c) => c.slug).join(", ")
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

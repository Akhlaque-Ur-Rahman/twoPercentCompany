/**
 * One-shot schema sync for empty Neon DBs during Vercel build.
 * Auto-accepts Drizzle push prompts (non-interactive CI).
 */
(process.env as Record<string, string | undefined>).NODE_ENV = "development";
process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";

const raw = (process.env.DATABASE_URL || "").trim().replace(/^["']|["']$/g, "");
process.env.DATABASE_URL = raw;

async function main() {
  if (!/^postgres(ql)?:\/\//i.test(raw)) {
    console.log("[push-schema-on-build] Skip: DATABASE_URL is not Postgres.");
    return;
  }

  // Always accept Drizzle data-loss / create-table warnings in CI.
  const promptsMod = await import("prompts");
  promptsMod.default = (async () => ({ confirm: true })) as typeof promptsMod.default;

  console.log("[push-schema-on-build] Pushing Payload schema to Postgres...");
  const { getPayload } = await import("payload");
  const config = (await import("../payload.config")).default;
  const payload = await getPayload({ config });

  try {
    await payload.find({ collection: "users", limit: 1 });
    console.log("[push-schema-on-build] Verified: users table is queryable.");
  } catch (err) {
    console.error("[push-schema-on-build] users table still missing after push.");
    throw err;
  }

  console.log("[push-schema-on-build] Done.");
}

main().catch((err) => {
  console.error("[push-schema-on-build] Failed:", err);
  process.exit(1);
});

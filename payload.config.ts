import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Faqs } from "./collections/Faqs";
import { Leads } from "./collections/Leads";
import { Listings } from "./collections/Listings";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { TeamMembers } from "./collections/TeamMembers";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUrl = (process.env.DATABASE_URL || "file:./payload.db")
  .trim()
  .replace(/^["']|["']$/g, "");
const usePostgres = /^postgres(ql)?:\/\//i.test(databaseUrl);
const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — 2% Company CMS",
      description: "Manage listings, media, team, FAQs, posts, and leads.",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/svg/favicon.svg",
        },
      ],
    },
    theme: "dark",
    avatar: "default",
    components: {
      graphics: {
        Logo: "/components/admin/Logo",
        Icon: "/components/admin/Icon",
      },
      beforeLogin: ["/components/admin/BeforeLogin"],
      beforeDashboard: ["/components/admin/BeforeDashboard"],
      afterNavLinks: ["/components/admin/NavFooterLink"],
      actions: ["/components/admin/ProfileMenu"],
      logout: {
        Button: "/components/admin/LogoutButton",
      },
    },
  },
  collections: [Users, Media, Listings, TeamMembers, Faqs, Posts, Leads],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
      }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: {
        media: true,
      },
      token: blobToken || "",
      // Bypass Vercel serverless 4.5MB body limit for uploads.
      clientUploads: true,
    }),
  ],
  sharp,
});

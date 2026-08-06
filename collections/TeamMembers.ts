import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    group: "Content",
    description: "Advisors shown on the Team page",
    defaultColumns: ["name", "role", "published", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "role",
      type: "text",
      required: true,
      admin: { description: 'e.g. "Senior Advisor"' },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    { name: "bio", type: "textarea" },
    {
      name: "photoUrl",
      type: "text",
      admin: { description: "Public path e.g. /images/..." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "areas",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "phone",
      type: "text",
      admin: { description: "WhatsApp / call number" },
    },
    { name: "email", type: "email" },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};

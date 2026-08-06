import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Content",
    description: "Blog / insights articles",
    defaultColumns: ["title", "category", "publishedAt", "published"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar" },
    },
    { name: "excerpt", type: "textarea", required: true },
    { name: "body", type: "textarea", required: true },
    {
      name: "coverUrl",
      type: "text",
      admin: { description: "Public image path" },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      type: "select",
      defaultValue: "real-estate",
      options: [
        { label: "Real Estate", value: "real-estate" },
        { label: "Buying Tips", value: "buying-tips" },
        { label: "Patna Local", value: "patna-local" },
        { label: "Investment", value: "investment" },
      ],
    },
    {
      name: "authorName",
      type: "text",
      defaultValue: "2% Company",
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};

import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    group: "Content",
    description: "FAQ entries for marketing pages",
    defaultColumns: ["question", "category", "order", "published"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "category",
      type: "select",
      defaultValue: "general",
      options: [
        { label: "General", value: "general" },
        { label: "Buying", value: "buying" },
        { label: "Selling", value: "selling" },
        { label: "Renting", value: "renting" },
        { label: "Plots", value: "plots" },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
  ],
};

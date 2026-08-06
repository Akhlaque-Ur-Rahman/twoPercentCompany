import type { CollectionConfig } from "payload";

export const Listings: CollectionConfig = {
  slug: "listings",
  admin: {
    useAsTitle: "title",
    group: "Content",
    description: "Properties and plots shown on the website",
    defaultColumns: ["title", "type", "price", "published", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Property", value: "property" },
        { label: "Plot", value: "plot" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "longDescription",
      type: "textarea",
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "text",
      required: true,
      admin: {
        description: 'Display price, e.g. "1,25,00,000"',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "lat",
          type: "number",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "lng",
          type: "number",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description:
          "Public path or absolute URL for the cover image (e.g. /images/foo.webp). Used when no Media upload is set.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional CMS upload. Overrides imageUrl when set.",
      },
    },
    {
      name: "galleryUrls",
      type: "array",
      labels: { singular: "Gallery URL", plural: "Gallery URLs" },
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        description: "Optional CMS uploads. Merged with gallery URLs when mapping.",
      },
    },
    {
      name: "floorPlanUrls",
      type: "array",
      labels: { singular: "Floor plan URL", plural: "Floor plan URLs" },
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "floorPlans",
      type: "upload",
      relationTo: "media",
      hasMany: true,
    },
    {
      name: "video",
      type: "text",
      admin: {
        description: "Video path or URL (e.g. /videos/property-sale.webm)",
      },
    },
    {
      name: "virtualTourUrl",
      type: "text",
      admin: {
        description:
          "360° / Matterport / Kuula URL (embeddable). Leave blank to use the default demo tour.",
      },
    },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Features" },
      admin: {
        description: "Amenities shown in the features grid on the detail page",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "assignedExpert",
      type: "relationship",
      relationTo: "team-members",
      admin: {
        description: "Advisor shown on this listing’s detail page",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "specifications",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

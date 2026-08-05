import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "status", "createdAt"],
  },
  defaultSort: "-createdAt",
  access: {
    // Public create via Local API from our route; admin-only read/update
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Contact", value: "contact" },
        { label: "Sell", value: "sell" },
        { label: "Rent Landlord", value: "rent_landlord" },
        { label: "Tenant Enquiry", value: "tenant_enquiry" },
        { label: "Investor", value: "investor" },
        { label: "Newsletter", value: "newsletter" },
        { label: "Tour", value: "tour" },
        { label: "Listing Enquiry", value: "listing_enquiry" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "name", type: "text" },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "payload",
      type: "json",
      admin: { description: "Full form payload" },
    },
  ],
};

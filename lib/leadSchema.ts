import { z } from "zod";

export const leadTypeSchema = z.enum([
  "contact",
  "sell",
  "rent_landlord",
  "tenant_enquiry",
  "investor",
  "newsletter",
  "tour",
  "listing_enquiry",
  "home_inquiry",
]);

export const leadBodySchema = z
  .object({
    type: leadTypeSchema,
    name: z.string().trim().max(200).optional(),
    email: z
      .string()
      .trim()
      .email("Invalid email")
      .max(200)
      .optional()
      .or(z.literal("")),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().max(5000).optional(),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (data.type === "newsletter") {
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email required",
          path: ["email"],
        });
      }
      return;
    }
    if (!data.name && !data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide name, email, or phone",
        path: ["name"],
      });
    }
  });

export type LeadBody = z.infer<typeof leadBodySchema>;

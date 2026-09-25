import { z } from "zod";

export const STATUSES = [
  "No response yet",
  "Applied",
  "Interview",
  "Rejected",
  "Offer",
  "Withdrawn",
] as const;

export const criteriaSchema = z.object({
  titles: z.string(),
  location: z.string(),
  salary: z.string(),
  sources: z.string(),
  notes: z.string(),
});

export type Criteria = z.infer<typeof criteriaSchema>;

export const applicationSchema = z.object({
  id: z.string(),
  date: z.string(),
  company: z.string(),
  role: z.string(),
  platform: z.string(),
  status: z.enum(STATUSES),
  contact: z.string(),
  contactRole: z.string(),
  lastTouch: z.string(),
  notes: z.string(),
});

export type Application = z.infer<typeof applicationSchema>;

export const applicationInputSchema = applicationSchema
  .omit({ id: true })
  .partial();

export type ApplicationInput = z.infer<typeof applicationInputSchema>;

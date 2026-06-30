import { z } from "zod";

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  title: z.string().min(1),
  status: z.enum(["draft", "published"]),
  role: z.string().min(1),
  cardImage: z.string().min(1),
  subtitle: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  url: z.string().url().nullable(),
  content: z.string(),
  images: z.array(z.string()).max(5),
  extraContent: z.string().nullable(),
});

export type Project = z.infer<typeof projectSchema>;

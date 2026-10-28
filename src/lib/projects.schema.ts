import { z } from "zod";

const sectionBlockSchema = z.object({
  type: z.literal("section"),
  heading: z.string().min(1),
  body: z.string().min(1),
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().optional().default(""),
  caption: z.string().min(1).optional(),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  sectionBlockSchema,
  imageBlockSchema,
]);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type SectionBlock = z.infer<typeof sectionBlockSchema>;
export type ImageBlock = z.infer<typeof imageBlockSchema>;

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  title: z.string().min(1),
  status: z.enum(["draft", "published"]),
  role: z.string().min(1),
  client: z.string().min(1).optional(),
  scope: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  completed: z.string().min(1).optional(),
  cardImage: z.string().min(1),
  order: z.number().int().optional(),
  subtitle: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  url: z
    .union([z.string().url(), z.null()])
    .optional()
    .transform((value) => value ?? null),
  blocks: z.array(contentBlockSchema).min(1),
});

export type Project = z.infer<typeof projectSchema>;

import { z } from "zod";

export const galleryItemSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
  order: z.number().int().optional(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

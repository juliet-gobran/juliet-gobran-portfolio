import fs from "fs";
import path from "path";

import { galleryItemSchema, type GalleryItem } from "@/lib/gallery.schema";

const GALLERY_DIR = path.join(process.cwd(), "content", "gallery");

function readGalleryItemFile(filename: string, galleryDir: string): GalleryItem {
  const filePath = path.join(galleryDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON in content/gallery/${filename}`, {
      cause: error,
    });
  }

  const result = galleryItemSchema.safeParse(json);
  if (!result.success) {
    throw new Error(
      `Invalid gallery item schema in content/gallery/${filename}: ${result.error.message}`,
      { cause: result.error },
    );
  }

  return result.data;
}

export function getGalleryItems(galleryDir = GALLERY_DIR): GalleryItem[] {
  const filenames = fs
    .readdirSync(galleryDir)
    .filter((name) => name.endsWith(".json"))
    .sort();

  return filenames
    .map((filename) => readGalleryItemFile(filename, galleryDir))
    .sort((a, b) => {
      const aOrder = a.order;
      const bOrder = b.order;
      const aHasOrder = typeof aOrder === "number";
      const bHasOrder = typeof bOrder === "number";

      if (aHasOrder && bHasOrder) {
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return a.slug.localeCompare(b.slug);
      }

      if (aHasOrder) {
        return -1;
      }

      if (bHasOrder) {
        return 1;
      }

      return a.slug.localeCompare(b.slug);
    });
}

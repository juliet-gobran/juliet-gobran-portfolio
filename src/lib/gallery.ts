import path from "path";

import { compareByOrder, readContentDir } from "@/lib/content";
import { galleryItemSchema, type GalleryItem } from "@/lib/gallery.schema";

const GALLERY_DIR = path.join(process.cwd(), "content", "gallery");

export function getGalleryItems(galleryDir = GALLERY_DIR): GalleryItem[] {
  return readContentDir(galleryDir, galleryItemSchema).sort(compareByOrder);
}

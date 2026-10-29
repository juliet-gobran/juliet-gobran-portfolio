import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "fs";
import os from "os";
import path from "path";

import { describe, expect, it } from "vitest";

import { getGalleryItems } from "@/lib/gallery";

function createGalleryDir() {
  const root = mkdtempSync(path.join(os.tmpdir(), "gallery-test-"));
  const galleryDir = path.join(root, "gallery");
  mkdirSync(galleryDir);
  return { root, galleryDir };
}

describe("gallery helpers", () => {
  it("reads items ordered by their order field", () => {
    const { root, galleryDir } = createGalleryDir();

    try {
      writeFileSync(
        path.join(galleryDir, "b-second.json"),
        JSON.stringify({
          slug: "b-second",
          src: "/images/gallery/b-second.webp",
          width: 1094,
          height: 875,
          alt: "Second item",
          order: 2,
        }),
      );
      writeFileSync(
        path.join(galleryDir, "a-first.json"),
        JSON.stringify({
          slug: "a-first",
          src: "/images/gallery/a-first.webp",
          width: 1094,
          height: 875,
          alt: "First item",
          order: 1,
        }),
      );

      expect(getGalleryItems(galleryDir).map((item) => item.slug)).toEqual([
        "a-first",
        "b-second",
      ]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("throws when gallery item JSON does not match schema", () => {
    const { root, galleryDir } = createGalleryDir();

    try {
      writeFileSync(
        path.join(galleryDir, "bad.json"),
        JSON.stringify({ slug: "bad" }),
      );

      expect(() => getGalleryItems(galleryDir)).toThrow();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

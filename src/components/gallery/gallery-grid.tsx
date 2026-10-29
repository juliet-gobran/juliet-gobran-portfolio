import Image from "next/image";

import { RevealOnScroll } from "@/components/reveal-on-scroll";
import type { GalleryItem } from "@/lib/gallery.schema";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <RevealOnScroll key={item.slug} delayMs={(index % 3) * 100}>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-card border border-border-subtle bg-surface-sunken">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}

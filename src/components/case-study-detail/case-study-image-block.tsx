import Image from "next/image";

import type { ImageBlock } from "@/lib/projects.schema";

type CaseStudyImageBlockProps = {
  block: ImageBlock;
};

export function CaseStudyImageBlock({ block }: CaseStudyImageBlockProps) {
  return (
    <figure className="flex w-full flex-col items-center gap-2">
      <div className="w-full overflow-hidden rounded-control border border-border-subtle bg-surface-sunken">
        <Image
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          sizes="(min-width: 1024px) 800px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {block.caption ? (
        <figcaption className="w-full text-center font-albert-sans text-case-study-link font-light text-text-primary">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

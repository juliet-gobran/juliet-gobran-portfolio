import { CaseStudyImageBlock } from "@/components/case-study-detail/case-study-image-block";
import { CaseStudySectionBlock } from "@/components/case-study-detail/case-study-section-block";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import type { ContentBlock } from "@/lib/projects.schema";

type CaseStudyContentProps = {
  blocks: ContentBlock[];
};

export function CaseStudyContent({ blocks }: CaseStudyContentProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 lg:w-[800px]">
      {blocks.map((block, index) => (
        <RevealOnScroll key={index}>
          {block.type === "section" ? (
            <CaseStudySectionBlock block={block} />
          ) : (
            <CaseStudyImageBlock block={block} />
          )}
        </RevealOnScroll>
      ))}
    </div>
  );
}

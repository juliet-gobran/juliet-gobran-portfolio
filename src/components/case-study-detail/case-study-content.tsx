import { CaseStudyImageBlock } from "@/components/case-study-detail/case-study-image-block";
import { CaseStudySectionBlock } from "@/components/case-study-detail/case-study-section-block";
import type { ContentBlock } from "@/lib/projects.schema";

type CaseStudyContentProps = {
  blocks: ContentBlock[];
};

export function CaseStudyContent({ blocks }: CaseStudyContentProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4 py-16 lg:w-[800px]">
      {blocks.map((block, index) =>
        block.type === "section" ? (
          <CaseStudySectionBlock key={index} block={block} />
        ) : (
          <CaseStudyImageBlock key={index} block={block} />
        ),
      )}
    </div>
  );
}

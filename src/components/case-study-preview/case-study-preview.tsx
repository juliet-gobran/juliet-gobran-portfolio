import { CaseStudyImageFrame } from "@/components/case-study-preview/case-study-image-frame";
import { CaseStudyMeta } from "@/components/case-study-preview/case-study-meta";
import type { Project } from "@/lib/projects.schema";

type CaseStudyPreviewProps = {
  project: Pick<
    Project,
    | "slug"
    | "title"
    | "subtitle"
    | "url"
    | "role"
    | "client"
    | "scope"
    | "industry"
    | "completed"
    | "cardImage"
  >;
};

export function CaseStudyPreview({ project }: CaseStudyPreviewProps) {
  return (
    <article className="flex w-full flex-col-reverse items-start gap-8 md:flex-row">
      <CaseStudyMeta project={project} />
      <CaseStudyImageFrame src={project.cardImage} />
    </article>
  );
}

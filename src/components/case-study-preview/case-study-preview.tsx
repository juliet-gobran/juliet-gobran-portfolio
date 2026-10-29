import Link from "next/link";

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
    <article className="flex w-full flex-col-reverse items-start md:flex-row md:gap-8">
      <CaseStudyMeta project={project} />
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="group w-full flex-1"
      >
        <CaseStudyImageFrame src={project.cardImage} />
      </Link>
    </article>
  );
}

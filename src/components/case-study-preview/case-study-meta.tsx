import { CaseStudyCta } from "@/components/case-study-preview/case-study-cta";
import { CaseStudyHeader } from "@/components/case-study-preview/case-study-header";
import { CaseStudySpecs } from "@/components/case-study-preview/case-study-specs";
import type { Project } from "@/lib/projects.schema";

type CaseStudyMetaProps = {
  project: Pick<
    Project,
    | "slug"
    | "title"
    | "subtitle"
    | "url"
    | "client"
    | "scope"
    | "industry"
    | "completed"
  >;
};

export function CaseStudyMeta({ project }: CaseStudyMetaProps) {
  return (
    <div className="flex w-full flex-col md:w-[400px] md:shrink-0">
      <CaseStudyHeader
        title={project.title}
        subtitle={project.subtitle}
        url={project.url}
      />
      <CaseStudySpecs
        client={project.client}
        scope={project.scope}
        industry={project.industry}
        completed={project.completed}
      />
      <CaseStudyCta slug={project.slug} />
    </div>
  );
}

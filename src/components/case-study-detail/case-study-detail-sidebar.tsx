import { CaseStudyDetailHeader } from "@/components/case-study-detail/case-study-detail-header";
import { CaseStudySpecs } from "@/components/case-study-preview/case-study-specs";
import type { Project } from "@/lib/projects.schema";

type CaseStudyDetailSidebarProps = {
  project: Pick<
    Project,
    | "title"
    | "subtitle"
    | "url"
    | "role"
    | "client"
    | "scope"
    | "industry"
    | "completed"
  >;
};

export function CaseStudyDetailSidebar({ project }: CaseStudyDetailSidebarProps) {
  return (
    <div className="flex w-full shrink-0 flex-col lg:sticky lg:top-0 lg:w-[400px]">
      <CaseStudyDetailHeader
        title={project.title}
        subtitle={project.subtitle}
        url={project.url}
      />
      <CaseStudySpecs
        role={project.role}
        client={project.client}
        scope={project.scope}
        industry={project.industry}
        completed={project.completed}
      />
    </div>
  );
}

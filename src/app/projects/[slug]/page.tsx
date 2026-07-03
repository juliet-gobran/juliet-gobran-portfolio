import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectContentPanel } from "@/components/project/project-content-panel";
import { ProjectExtraContent } from "@/components/project/project-extra-content";
import { ProjectImageGallery } from "@/components/project/project-image-gallery";
import { ProjectPageHeader } from "@/components/project/project-page-header";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Juliet Gobran`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto flex w-full max-w-project flex-col gap-4 md:gap-8">
      <ProjectPageHeader project={project} />

      <div className="flex flex-col gap-4 md:gap-8 lg:hidden">
        <ProjectImageGallery images={project.images} />
        <ProjectContentPanel content={project.content} />
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-[2fr_1fr] items-start gap-8">
          <div className="sticky top-0">
            <ProjectImageGallery images={project.images} />
          </div>
          <ProjectContentPanel content={project.content} />
        </div>
      </div>

      {project.extraContent ? (
        <ProjectExtraContent content={project.extraContent} />
      ) : null}
    </article>
  );
}

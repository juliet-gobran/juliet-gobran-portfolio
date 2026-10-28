import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/components/case-study-detail/case-study-content";
import { CaseStudyDetailSidebar } from "@/components/case-study-detail/case-study-detail-sidebar";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
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
    <article className="mx-auto flex w-full max-w-[1232px] flex-col items-start gap-8 lg:flex-row lg:justify-center">
      <RevealOnScroll className="w-full shrink-0 lg:sticky lg:top-0 lg:w-[400px]">
        <CaseStudyDetailSidebar project={project} />
      </RevealOnScroll>
      <CaseStudyContent blocks={project.blocks} />
    </article>
  );
}

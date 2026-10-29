import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/components/case-study-detail/case-study-content";
import { CaseStudyDetailSidebar } from "@/components/case-study-detail/case-study-detail-sidebar";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { SITE_NAME } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: ProjectPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const title = `${project.title} — ${SITE_NAME}`;
  // Overriding openGraph/twitter replaces the root's, so carry the site card image over.
  const { openGraph, twitter } = await parent;

  return {
    title,
    description: project.subtitle,
    openGraph: {
      type: "article",
      locale: "en_AU",
      siteName: SITE_NAME,
      title,
      description: project.subtitle,
      url: `/projects/${project.slug}`,
      images: openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.subtitle,
      images: twitter?.images,
    },
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

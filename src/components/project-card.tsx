import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects.schema";

type ProjectCardProps = {
  project: Pick<
    Project,
    "slug" | "title" | "role" | "subtitle" | "cardImage" | "year"
  >;
};

const cardLinkClassName =
  "group grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] md:gap-6";

const metaPillClassName =
  "inline-flex w-fit rounded-pill bg-accent-orange px-4 py-1 font-albert-sans text-project-meta font-medium text-text-on-accent";

const titleClassName =
  "project-card-title font-jura text-project-title font-bold leading-[1.15] text-text-primary md:text-project-title-md lg:text-project-title-lg";

const subtitleClassName =
  "font-albert-sans text-lg font-light text-text-primary md:text-project-body";

const imageFrameClassName =
  "relative aspect-square overflow-hidden rounded-card bg-background-dark";

const imageClassName = "project-card-image object-cover";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={cardLinkClassName}>
      <div className="flex flex-col gap-2">
        <span className={metaPillClassName}>
          {`${project.year} • ${project.role}`}
        </span>
        <h2 className={titleClassName}>{project.title}</h2>
        <p className={subtitleClassName}>{project.subtitle}</p>
      </div>

      <div className={imageFrameClassName}>
        <Image
          src={project.cardImage}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className={imageClassName}
        />
      </div>
    </Link>
  );
}

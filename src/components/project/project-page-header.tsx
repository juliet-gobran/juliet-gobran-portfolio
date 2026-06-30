import type { Project } from "@/lib/projects.schema";

type ProjectPageHeaderProps = {
  project: Pick<Project, "title" | "subtitle" | "role" | "year" | "url">;
};

const metaPillClassName =
  "inline-flex w-fit rounded-pill bg-accent-orange px-4 py-1 font-albert-sans text-project-meta font-medium text-text-on-accent";

export function ProjectPageHeader({ project }: ProjectPageHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <span className={metaPillClassName}>
        {`${project.year} · ${project.role}`}
      </span>
      <h1 className="font-jura text-project-title font-bold leading-[1.15] text-text-primary md:text-project-title-md">
        {project.title}
      </h1>
      <p className="font-albert-sans text-project-body font-light text-text-primary">
        {project.subtitle}
      </p>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-albert-sans text-base font-light text-text-primary underline"
        >
          {project.url}
        </a>
      ) : null}
    </header>
  );
}

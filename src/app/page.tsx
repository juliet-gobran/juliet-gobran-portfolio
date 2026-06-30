import { ProjectCard } from "@/components/project-card";
import { getPublishedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getPublishedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-project-stack-gap">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

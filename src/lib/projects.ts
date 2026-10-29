import path from "path";

import { compareByOrder, readContentDir } from "@/lib/content";
import { projectSchema, type Project } from "@/lib/projects.schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(projectsDir = PROJECTS_DIR): Project[] {
  return readContentDir(projectsDir, projectSchema);
}

export function getPublishedProjects(projectsDir = PROJECTS_DIR): Project[] {
  return getAllProjects(projectsDir)
    .filter((project) => project.status === "published")
    .sort(compareByOrder);
}

export function getProjectBySlug(
  slug: string,
  projectsDir = PROJECTS_DIR,
): Project | undefined {
  return getAllProjects(projectsDir).find((project) => project.slug === slug);
}

export function getAllProjectSlugs(projectsDir = PROJECTS_DIR): string[] {
  return getAllProjects(projectsDir).map((project) => project.slug);
}

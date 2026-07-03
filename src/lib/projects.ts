import fs from "fs";
import path from "path";

import { projectSchema, type Project } from "@/lib/projects.schema";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjectFile(filename: string, projectsDir: string): Project {
  const filePath = path.join(projectsDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return projectSchema.parse(JSON.parse(raw));
}

export function getAllProjects(projectsDir = PROJECTS_DIR): Project[] {
  const filenames = fs
    .readdirSync(projectsDir)
    .filter((name) => name.endsWith(".json"))
    .sort();

  return filenames.map((filename) => readProjectFile(filename, projectsDir));
}

export function getPublishedProjects(projectsDir = PROJECTS_DIR): Project[] {
  return getAllProjects(projectsDir)
    .filter((project) => project.status === "published")
    .sort((a, b) => {
      const aOrder = a.order;
      const bOrder = b.order;
      const aHasOrder = typeof aOrder === "number";
      const bHasOrder = typeof bOrder === "number";

      if (aHasOrder && bHasOrder) {
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return a.slug.localeCompare(b.slug);
      }

      if (aHasOrder) {
        return -1;
      }

      if (bHasOrder) {
        return 1;
      }

      return a.slug.localeCompare(b.slug);
    });
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

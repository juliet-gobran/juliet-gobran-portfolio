import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "fs";
import os from "os";
import path from "path";

import { describe, expect, it } from "vitest";

import {
  getAllProjectSlugs,
  getAllProjects,
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/projects";

function createProjectsDir() {
  const root = mkdtempSync(path.join(os.tmpdir(), "projects-test-"));
  const projectsDir = path.join(root, "projects");
  mkdirSync(projectsDir);
  return { root, projectsDir };
}

describe("projects helpers", () => {
  it("reads and filters published projects", () => {
    const { root, projectsDir } = createProjectsDir();

    try {
      writeFileSync(
        path.join(projectsDir, "a-draft.json"),
        JSON.stringify({
          slug: "a-draft",
          title: "Draft",
          status: "draft",
          role: "Senior Product Designer",
          cardImage: "/images/projects/a-draft/card.webp",
          subtitle: "Draft subtitle",
          year: 2026,
          url: null,
          content: "Draft content",
          images: [],
          extraContent: null,
        }),
      );
      writeFileSync(
        path.join(projectsDir, "b-published.json"),
        JSON.stringify({
          slug: "b-published",
          title: "Published",
          status: "published",
          role: "Senior Product Designer",
          cardImage: "/images/projects/b-published/card.webp",
          subtitle: "Published subtitle",
          year: 2025,
          url: "https://example.com",
          content: "Published content",
          images: ["/images/projects/b-published/image-1.webp"],
          extraContent: null,
        }),
      );

      expect(getAllProjects(projectsDir)).toHaveLength(2);
      expect(getPublishedProjects(projectsDir).map((project) => project.slug)).toEqual(
        ["b-published"],
      );
      expect(getProjectBySlug("b-published", projectsDir)?.title).toBe("Published");
      expect(getAllProjectSlugs(projectsDir)).toEqual(["a-draft", "b-published"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("throws when project JSON does not match schema", () => {
    const { root, projectsDir } = createProjectsDir();

    try {
      writeFileSync(
        path.join(projectsDir, "bad.json"),
        JSON.stringify({
          slug: "bad",
          title: "Bad Project",
          status: "published",
        }),
      );

      expect(() => getAllProjects(projectsDir)).toThrow();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});

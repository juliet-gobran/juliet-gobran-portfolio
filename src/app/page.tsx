import { CaseStudyPreview } from "@/components/case-study-preview/case-study-preview";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { WollongongClock } from "@/components/wollongong-clock";
import { getPublishedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getPublishedProjects();

  return (
    <div className="mx-auto flex w-full max-w-home flex-col">
      <RevealOnScroll className="flex flex-col gap-4">
        <h1 className="max-w-content font-jura text-3xl font-semibold text-text-primary md:text-intro-heading">
          I&rsquo;m Juliet, a Product Designer who turns unknowns into
          shipped products.
        </h1>
        <WollongongClock />
      </RevealOnScroll>

      {projects.length > 0 ? (
        <div className="flex flex-col">
          {projects.map((project) => (
            <RevealOnScroll key={project.slug} className="py-case-study-section-y">
              <CaseStudyPreview project={project} />
            </RevealOnScroll>
          ))}
        </div>
      ) : null}
    </div>
  );
}

import { CaseStudyPreview } from "@/components/case-study-preview/case-study-preview";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { WollongongClock } from "@/components/wollongong-clock";
import { getPublishedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getPublishedProjects();

  return (
    <div className="mx-auto flex w-full max-w-home flex-col">
      <RevealOnScroll className="flex flex-col gap-4">
        <h1 className="max-w-content font-jura text-3xl font-bold text-text-primary md:text-intro-heading">
          I&rsquo;m Juliet, a Product Designer who turns unknowns into
          shipped products.
        </h1>
        <WollongongClock />
      </RevealOnScroll>

      {projects.length > 0 ? (
        <section id="work" aria-label="Work" className="flex flex-col">
          {projects.map((project) => (
            <RevealOnScroll key={project.slug} className="py-case-study-section-y">
              <CaseStudyPreview project={project} />
            </RevealOnScroll>
          ))}
        </section>
      ) : null}

      <section
        id="gallery"
        aria-label="Gallery"
        className="py-case-study-section-y"
      >
        <h2 className="font-jura text-case-study-title font-bold leading-[1.15] text-text-primary">
          Gallery
        </h2>
      </section>

      <section
        id="about"
        aria-label="About"
        className="py-case-study-section-y"
      >
        <h2 className="font-jura text-case-study-title font-bold leading-[1.15] text-text-primary">
          About
        </h2>
      </section>

      <section
        id="contact"
        aria-label="Contact"
        className="py-case-study-section-y"
      >
        <h2 className="font-jura text-case-study-title font-bold leading-[1.15] text-text-primary">
          Contact
        </h2>
      </section>
    </div>
  );
}

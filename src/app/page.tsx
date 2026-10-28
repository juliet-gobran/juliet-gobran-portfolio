import { AccentEasterEgg } from "@/components/accent-easter-egg";
import { CaseStudyPreview } from "@/components/case-study-preview/case-study-preview";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { WollongongClock } from "@/components/wollongong-clock";
import { getGalleryItems } from "@/lib/gallery";
import { getPublishedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getPublishedProjects();
  const galleryItems = getGalleryItems();

  return (
    <div className="mx-auto flex w-full max-w-home flex-col">
      <RevealOnScroll className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-2 min-[800px]:flex-row">
          <h1 className="max-w-content min-w-0 flex-1 font-jura text-3xl font-bold text-text-primary md:text-intro-heading">
            I&rsquo;m Juliet, a Product Designer who turns unknowns into
            shipped products.
          </h1>
          <AccentEasterEgg />
        </div>
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

      {galleryItems.length > 0 ? (
        <section
          id="gallery"
          aria-label="Gallery"
          className="flex flex-col gap-8 py-case-study-section-y"
        >
          <h2 className="font-jura text-case-study-title font-bold leading-[1.15] text-text-primary">
            Gallery of my work
          </h2>
          <GalleryGrid items={galleryItems} />
        </section>
      ) : null}

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

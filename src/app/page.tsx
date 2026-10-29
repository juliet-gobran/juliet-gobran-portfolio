import { AboutSection } from "@/components/about/about-section";
import { AccentEasterEgg } from "@/components/accent-easter-egg";
import { CaseStudyPreview } from "@/components/case-study-preview/case-study-preview";
import { ContactSection } from "@/components/contact/contact-section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SectionHeading } from "@/components/section-heading";
import { WollongongClock } from "@/components/wollongong-clock";
import { getGalleryItems } from "@/lib/gallery";
import { getPublishedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getPublishedProjects();
  const galleryItems = getGalleryItems();

  return (
    <div className="flex w-full flex-col">
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
      </div>

      {galleryItems.length > 0 ? (
        <section
          id="gallery"
          aria-label="Gallery"
          className="flex w-full flex-col gap-8 py-case-study-section-y"
        >
          <SectionHeading>Gallery of my work</SectionHeading>
          <GalleryGrid items={galleryItems} />
        </section>
      ) : null}

      <div className="mx-auto flex w-full max-w-home flex-col">
        <section
          id="about"
          aria-label="About"
          className="py-case-study-section-y"
        >
          <AboutSection />
        </section>
      </div>

      <section id="contact" aria-label="Contact" className="w-full pt-case-study-section-y">
        <RevealOnScroll>
          <ContactSection />
        </RevealOnScroll>
      </section>
    </div>
  );
}

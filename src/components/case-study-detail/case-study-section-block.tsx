import type { SectionBlock } from "@/lib/projects.schema";

type CaseStudySectionBlockProps = {
  block: SectionBlock;
};

export function CaseStudySectionBlock({ block }: CaseStudySectionBlockProps) {
  const paragraphs = block.body.split(/\n\n+/);

  return (
    <div className="flex w-full flex-col gap-2 py-4 text-text-primary">
      <h2 className="font-jura text-case-study-page-heading font-bold">
        {block.heading}
      </h2>
      <div className="font-albert-sans text-case-study-body font-light">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={index < paragraphs.length - 1 ? "mb-2" : undefined}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

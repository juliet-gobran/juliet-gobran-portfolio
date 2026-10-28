import Link from "next/link";

type CaseStudyCtaProps = {
  slug: string;
};

export function CaseStudyCta({ slug }: CaseStudyCtaProps) {
  return (
    <div className="p-2">
      <Link
        href={`/projects/${slug}`}
        className="flex h-[34px] w-full items-center justify-center rounded-control border border-cta-accent-dark bg-cta-accent font-jura text-case-study-button font-bold text-text-primary transition-opacity duration-300 ease-in-out hover:opacity-70"
      >
        View case study
      </Link>
    </div>
  );
}

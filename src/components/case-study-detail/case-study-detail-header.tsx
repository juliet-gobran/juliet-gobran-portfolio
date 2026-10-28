import { formatDisplayUrl } from "@/lib/format-display-url";

type CaseStudyDetailHeaderProps = {
  title: string;
  subtitle: string;
  url: string | null;
};

export function CaseStudyDetailHeader({
  title,
  subtitle,
  url,
}: CaseStudyDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-2 py-4 text-text-primary">
      <h1 className="font-jura text-4xl font-semibold leading-[1.15] lg:text-case-study-page-title">
        {title}
      </h1>
      <p className="font-albert-sans text-case-study-body font-light lg:text-case-study-page-subtitle">
        {subtitle}
      </p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-albert-sans text-case-study-link font-light underline"
        >
          {formatDisplayUrl(url)}
        </a>
      ) : null}
    </div>
  );
}

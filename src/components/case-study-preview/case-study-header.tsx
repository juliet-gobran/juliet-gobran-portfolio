import { formatDisplayUrl } from "@/lib/format-display-url";

type CaseStudyHeaderProps = {
  title: string;
  subtitle: string;
  url: string | null;
};

export function CaseStudyHeader({ title, subtitle, url }: CaseStudyHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-2 py-4 text-text-primary">
      <h3 className="font-jura text-case-study-title font-semibold leading-[1.15]">
        {title}
      </h3>
      <p className="font-albert-sans text-case-study-body font-light">
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

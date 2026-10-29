import { SectionHeading } from "@/components/section-heading";

type IconProps = { className?: string };

const ICON_STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function ArrowOutwardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...ICON_STROKE}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...ICON_STROKE}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function AttachFileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...ICON_STROKE}>
      <path d="M15.5 7v9a3.5 3.5 0 0 1-7 0V5.75a2.25 2.25 0 0 1 4.5 0V15.5a1 1 0 0 1-2 0V7.5" />
    </svg>
  );
}

const LINK_CLASS =
  "inline-flex items-center gap-1 font-jura text-base text-text-primary transition-opacity duration-300 ease-in-out hover:opacity-70 md:text-nav-link";

const ICON_CLASS = "size-5 md:size-6";

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/juliet-gobran/" },
  { label: "Medium", href: "https://medium.com/@juliet.gobran" },
  { label: "Github", href: "https://github.com/juliet-gobran" },
];

export function ContactSection() {
  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-card border border-border-subtle bg-surface-sunken px-6 py-12">
      <SectionHeading className="text-center">Find me here</SectionHeading>

      <div className="flex flex-col items-center gap-4">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                {label}
                <ArrowOutwardIcon className={ICON_CLASS} />
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <li>
            <a href="mailto:juliet.gobran00@gmail.com" className={LINK_CLASS}>
              Email
              <MailIcon className={ICON_CLASS} />
            </a>
          </li>
          <li>
            <a
              href="/files/juliet-gobran-cv.pdf"
              download="JulietGobran-CV.pdf"
              className={LINK_CLASS}
            >
              Resume
              <AttachFileIcon className={ICON_CLASS} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

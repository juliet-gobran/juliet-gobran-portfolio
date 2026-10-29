import Image from "next/image";

import {
  ClaudeIcon,
  CursorIcon,
  FigmaIcon,
  IllustratorIcon,
  NotionIcon,
} from "@/components/about/toolkit-icons";
import { HoverTag } from "@/components/hover-tag";
import { StarIcon } from "@/components/icons/accent-icons";

const BIO_PARAGRAPHS = [
  "I’ve been tinkering away at different designs and software now for 5 years. What started as a split passion in technology and visual art has landed me comfortably in the middle spot: product design.",
  "From enterprise to agencies, I’ve learnt to work with a well established design system, or build one from scratch myself. My curiosity in AI has enabled me to build this website with Claude, feeding in my early Figma designs while letting the real thing be the ongoing artefact.",
  "When I’m not behind the laptop I’m usually at the beach, up a mountain, in an op shop or drinking coffee, always with good company.",
];

const QUALIFICATIONS = [
  "Bachelor of Computer Science (Software Engineering)",
  "Bachelor of Creative Arts (Visual Arts & Design)",
];

const TOOLKIT = [
  { name: "Figma", Icon: FigmaIcon },
  { name: "Claude", Icon: ClaudeIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "Cursor", Icon: CursorIcon },
  { name: "Illustrator", Icon: IllustratorIcon },
];

export function AboutSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-jura text-case-study-title font-bold leading-[1.15] text-text-primary">
        Hi, I&rsquo;m Juliet
      </h2>

      <div className="@container flex w-full flex-col gap-8 @[832px]:flex-row">
        <div className="relative w-[400px] max-w-full shrink-0 rounded-card border border-border-subtle bg-surface-sunken p-8">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-card">
            <Image
              src="/images/about/juliet-portrait.webp"
              alt="Juliet smiling on a street in Perth, wearing a brown jacket and carrying a tote bag"
              width={896}
              height={1100}
              sizes="400px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-0 right-2 size-32 drop-shadow-surface">
            <StarIcon />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-col gap-4 font-albert-sans text-case-study-body font-light text-text-primary">
            {BIO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-jura text-case-study-page-heading font-bold text-text-primary">
              Qualifications
            </h3>
            <div className="flex flex-col font-albert-sans text-case-study-body font-light text-text-primary">
              {QUALIFICATIONS.map((qualification) => (
                <p key={qualification}>{qualification}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-jura text-case-study-page-heading font-bold text-text-primary">
              Typical Toolkit
            </h3>
            <div className="flex flex-wrap gap-4">
              {TOOLKIT.map(({ name, Icon }) => (
                <div key={name} className="group relative size-12 shrink-0">
                  <Icon />
                  <HoverTag>{name}</HoverTag>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

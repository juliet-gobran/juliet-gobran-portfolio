"use client";

import { useEffect, useState } from "react";

import { type Accent, useAccent } from "@/components/accent-provider";
import { HoverTag } from "@/components/hover-tag";
import { HeartIcon, StarIcon, ThumbsUpIcon } from "@/components/icons/accent-icons";

const APPEAR_DELAY_MS = 1500;

const EGGS: {
  accent: Accent;
  label: string;
  Icon: () => React.JSX.Element;
  position: string;
}[] = [
  {
    accent: "blue",
    label: "thumbs-up",
    Icon: ThumbsUpIcon,
    position: "min-[800px]:absolute min-[800px]:top-0 min-[800px]:left-0 min-[800px]:size-12 lg:size-14",
  },
  {
    accent: "orange",
    label: "star",
    Icon: StarIcon,
    position: "min-[800px]:absolute min-[800px]:top-14 min-[800px]:left-14 lg:size-12",
  },
  {
    accent: "pink",
    label: "heart",
    Icon: HeartIcon,
    position: "min-[800px]:absolute min-[800px]:top-16 min-[800px]:left-2 min-[800px]:size-9 lg:size-11",
  },
];

export function AccentEasterEgg() {
  const { accent, setAccent } = useAccent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setIsVisible(true),
      APPEAR_DELAY_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    // A reserved frame next to the headline (>=800px) so the icons never
    // overlap the heading text; below 800px it collapses into a plain row
    // of ~40px icons under the heading instead.
    <div className="flex w-full flex-wrap items-center justify-start gap-4 min-[800px]:relative min-[800px]:h-36 min-[800px]:w-32 min-[800px]:shrink-0 min-[800px]:justify-normal min-[800px]:gap-0">
      {EGGS.map(({ accent: eggAccent, label, Icon, position }, index) => (
        <button
          key={eggAccent}
          type="button"
          aria-label={`Set accent color to ${eggAccent}`}
          title={label}
          onClick={() => setAccent(eggAccent)}
          style={{ transitionDelay: isVisible ? `${index * 120}ms` : undefined }}
          className={`group relative flex size-10 shrink-0 items-center justify-center drop-shadow-surface transition-all duration-500 ease-out hover:scale-110 hover:duration-200 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:hover:scale-100 ${
            isVisible
              ? "scale-100 opacity-100"
              : "scale-0 opacity-0 motion-reduce:scale-100"
          } ${position}`}
        >
          <Icon />
          {eggAccent !== accent ? <HoverTag>Click me</HoverTag> : null}
        </button>
      ))}
    </div>
  );
}

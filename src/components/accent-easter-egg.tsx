"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useAccent } from "@/components/accent-provider";
import { HoverTag } from "@/components/hover-tag";
import { HeartIcon, StarIcon, ThumbsUpIcon } from "@/components/icons/accent-icons";
import type { Accent } from "@/lib/accents";

const APPEAR_DELAY_MS = 1500;
const TOAST_DURATION_MS = 2500;

type EggIcon = () => React.JSX.Element;

const EGGS: {
  accent: Accent;
  Icon: EggIcon;
  position: string;
}[] = [
  {
    accent: "blue",
    Icon: ThumbsUpIcon,
    position: "min-[800px]:absolute min-[800px]:top-0 min-[800px]:left-0 min-[800px]:size-12 lg:size-14",
  },
  {
    accent: "orange",
    Icon: StarIcon,
    position: "min-[800px]:absolute min-[800px]:top-14 min-[800px]:left-14 lg:size-12",
  },
  {
    accent: "pink",
    Icon: HeartIcon,
    position: "min-[800px]:absolute min-[800px]:top-16 min-[800px]:left-2 min-[800px]:size-9 lg:size-11",
  },
];

function EasterEggToast({ Icon, isShown }: { Icon: EggIcon; isShown: boolean }) {
  // Portalled to <body>: the egg sits inside a translated reveal wrapper, which
  // would otherwise become the containing block for this fixed-position toast.
  return createPortal(
    <div
      role="status"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-pill bg-text-primary py-2 pr-4 pl-2 font-jura text-sm whitespace-nowrap text-background transition-all duration-300 ease-out starting:translate-y-4 starting:opacity-0 motion-reduce:transition-none md:text-base ${
        isShown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <span className="size-7 shrink-0">
        <Icon />
      </span>
      Easter egg: accent colour changed
    </div>,
    document.body,
  );
}

export function AccentEasterEgg() {
  const { accent, setAccent } = useAccent();
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState<{ id: number; Icon: EggIcon } | null>(null);
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setIsVisible(true),
      APPEAR_DELAY_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(
      () => setIsToastShown(false),
      TOAST_DURATION_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function handleClick(eggAccent: Accent, Icon: EggIcon) {
    if (eggAccent === accent) {
      return;
    }

    setAccent(eggAccent);
    setToast((previous) => ({ id: (previous?.id ?? 0) + 1, Icon }));
    setIsToastShown(true);
  }

  return (
    // A reserved frame next to the headline (>=800px) so the icons never
    // overlap the heading text; below 800px it collapses into a plain row
    // of ~40px icons under the heading instead.
    <div className="flex w-full flex-wrap items-center justify-start gap-4 min-[800px]:relative min-[800px]:h-36 min-[800px]:w-32 min-[800px]:shrink-0 min-[800px]:justify-normal min-[800px]:gap-0">
      {EGGS.map(({ accent: eggAccent, Icon, position }, index) => (
        <button
          key={eggAccent}
          type="button"
          aria-label={`Set accent color to ${eggAccent}`}
          onClick={() => handleClick(eggAccent, Icon)}
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
      {toast ? (
        <EasterEggToast key={toast.id} Icon={toast.Icon} isShown={isToastShown} />
      ) : null}
    </div>
  );
}

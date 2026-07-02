"use client";

import Image from "next/image";

import { useMotionPreference } from "@/components/motion-preference-provider";
import { useGalaxyCrossfade } from "@/hooks/use-galaxy-crossfade";

const FADE_MS = 5000;

const GALAXY_IMAGES = [
  "/galaxy/1-Galaxy.png",
  "/galaxy/2-Galaxy.png",
  "/galaxy/3-Galaxy.png",
  "/galaxy/4-Galaxy.png",
  "/galaxy/5-Galaxy.png",
  "/galaxy/6-Galaxy.png",
] as const;
export { getResumeAction } from "@/hooks/use-galaxy-crossfade";

export function GalaxyBackground() {
  const { effectiveMotionEnabled } = useMotionPreference();
  const {
    currentIndex,
    nextIndex,
    frontOpacity,
    isPaused,
    transitionMs,
  } = useGalaxyCrossfade({
    fadeMs: FADE_MS,
    images: GALAXY_IMAGES,
    motionEnabled: effectiveMotionEnabled,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background-dark"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={GALAXY_IMAGES[currentIndex]}
          alt=""
          fill
          priority={currentIndex === 0}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{
          opacity: frontOpacity,
          transitionProperty: isPaused ? "none" : "opacity",
          transitionTimingFunction: "linear",
          transitionDuration: isPaused ? "0ms" : `${transitionMs}ms`,
        }}
      >
        <Image
          src={GALAXY_IMAGES[nextIndex]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

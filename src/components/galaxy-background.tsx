"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useMotionPreference } from "@/components/motion-preference-provider";

const FADE_MS = 5000;

const GALAXY_IMAGES = [
  "/galaxy/1-Galaxy.png",
  "/galaxy/2-Galaxy.png",
  "/galaxy/3-Galaxy.png",
  "/galaxy/4-Galaxy.png",
  "/galaxy/5-Galaxy.png",
  "/galaxy/6-Galaxy.png",
] as const;

function getNextIndex(index: number) {
  return (index + 1) % GALAXY_IMAGES.length;
}

type ResumeAction =
  | { kind: "start"; durationMs: number };

export function getResumeAction(opacity: number, fadeMs: number): ResumeAction {
  if (opacity <= 0.001) {
    return { kind: "start", durationMs: fadeMs };
  }

  return { kind: "start", durationMs: Math.max(120, fadeMs * (1 - opacity)) };
}

export function GalaxyBackground() {
  const { effectiveMotionEnabled } = useMotionPreference();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frontOpacity, setFrontOpacity] = useState(0);
  const [transitionMs, setTransitionMs] = useState(0);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  const frontLayerRef = useRef<HTMLDivElement>(null);
  const isCompletingFadeRef = useRef(false);
  const isPausedRef = useRef(false);
  const wasPausedRef = useRef(false);
  const pauseOpacityRef = useRef(0);
  const resumeRequestedRef = useRef(false);
  const rafFirstPassRef = useRef<number | null>(null);
  const rafSecondPassRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const isPaused = !effectiveMotionEnabled || isDocumentHidden;
  const nextIndex = getNextIndex(currentIndex);

  const completeFade = useCallback(() => {
    if (isCompletingFadeRef.current) {
      return;
    }

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    isCompletingFadeRef.current = true;
    setCurrentIndex((index) => getNextIndex(index));
    setFrontOpacity(0);
    setTransitionMs(0);

    queueMicrotask(() => {
      isCompletingFadeRef.current = false;
    });
  }, []);

  const startFade = useCallback((durationMs: number) => {
    if (rafFirstPassRef.current !== null) {
      window.cancelAnimationFrame(rafFirstPassRef.current);
    }
    if (rafSecondPassRef.current !== null) {
      window.cancelAnimationFrame(rafSecondPassRef.current);
    }

    setTransitionMs(durationMs);

    rafFirstPassRef.current = window.requestAnimationFrame(() => {
      rafSecondPassRef.current = window.requestAnimationFrame(() => {
        if (isPausedRef.current) {
          return;
        }
        setFrontOpacity(1);
      });
    });
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentHidden(document.visibilityState === "hidden");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useLayoutEffect(() => {
    if (isPaused && !wasPausedRef.current) {
      if (rafFirstPassRef.current !== null) {
        window.cancelAnimationFrame(rafFirstPassRef.current);
        rafFirstPassRef.current = null;
      }
      if (rafSecondPassRef.current !== null) {
        window.cancelAnimationFrame(rafSecondPassRef.current);
        rafSecondPassRef.current = null;
      }
      const element = frontLayerRef.current;

      if (element) {
        const opacity = Number.parseFloat(getComputedStyle(element).opacity);

        if (!Number.isNaN(opacity)) {
          pauseOpacityRef.current = opacity;
          setFrontOpacity(opacity);
        }
      }

      setTransitionMs(0);
    }

    if (!isPaused && wasPausedRef.current) {
      resumeRequestedRef.current = true;
    }

    wasPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    if (resumeRequestedRef.current) {
      resumeRequestedRef.current = false;
      const opacity = pauseOpacityRef.current;
      const resumeAction = getResumeAction(opacity, FADE_MS);

      startFade(resumeAction.durationMs);

      return;
    }

    if (isCompletingFadeRef.current || frontOpacity !== 0) {
      return;
    }

    startFade(FADE_MS);
  }, [
    isPaused,
    currentIndex,
    frontOpacity,
    completeFade,
    startFade,
  ]);

  useEffect(() => {
    if (isPaused || transitionMs === 0) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      completeFade();
    }, transitionMs + 100);
    fallbackTimerRef.current = fallbackTimer;

    return () => {
      window.clearTimeout(fallbackTimer);
      if (fallbackTimerRef.current === fallbackTimer) {
        fallbackTimerRef.current = null;
      }
    };
  }, [isPaused, transitionMs, currentIndex, completeFade]);

  useEffect(() => {
    return () => {
      if (rafFirstPassRef.current !== null) {
        window.cancelAnimationFrame(rafFirstPassRef.current);
      }
      if (rafSecondPassRef.current !== null) {
        window.cancelAnimationFrame(rafSecondPassRef.current);
      }
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (
        event.target !== event.currentTarget ||
        event.propertyName !== "opacity" ||
        isPaused
      ) {
        return;
      }

      completeFade();
    },
    [isPaused, completeFade],
  );

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
        ref={frontLayerRef}
        className="absolute inset-0 z-10"
        style={{
          opacity: frontOpacity,
          transitionProperty: isPaused ? "none" : "opacity",
          transitionTimingFunction: "linear",
          transitionDuration: isPaused ? "0ms" : `${transitionMs}ms`,
        }}
        onTransitionEnd={handleTransitionEnd}
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

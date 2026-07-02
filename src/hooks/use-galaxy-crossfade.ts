"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MIN_RESUME_MS = 120;
const COMPLETION_BUFFER_MS = 100;

type Phase = "idle" | "fading" | "paused";

export type ResumeAction = { kind: "start"; durationMs: number };

export type UseGalaxyCrossfadeOptions = {
  fadeMs: number;
  images: readonly string[];
  motionEnabled: boolean;
};

export function getNextIndex(index: number, imageCount: number) {
  return (index + 1) % imageCount;
}

export function getResumeAction(opacity: number, fadeMs: number): ResumeAction {
  if (opacity <= 0.001) {
    return { kind: "start", durationMs: fadeMs };
  }

  return {
    kind: "start",
    durationMs: Math.max(MIN_RESUME_MS, fadeMs * (1 - opacity)),
  };
}

function getOpacityAtTime(
  startedAtMs: number,
  fromOpacity: number,
  durationMs: number,
  nowMs: number,
) {
  if (durationMs <= 0) {
    return fromOpacity;
  }

  const elapsed = nowMs - startedAtMs;
  const progress = Math.min(1, Math.max(0, elapsed / durationMs));

  return fromOpacity + (1 - fromOpacity) * progress;
}

export function useGalaxyCrossfade({
  fadeMs,
  images,
  motionEnabled,
}: UseGalaxyCrossfadeOptions) {
  const imageCount = images.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [frontOpacity, setFrontOpacity] = useState(0);
  const [transitionMs, setTransitionMs] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [loadedByIndex, setLoadedByIndex] = useState(() =>
    images.map((_, index) => index === 0),
  );

  const rafFirstPassRef = useRef<number | null>(null);
  const rafSecondPassRef = useRef<number | null>(null);
  const completionTimerRef = useRef<number | null>(null);
  const sequenceRef = useRef(0);
  const wasPausedRef = useRef(false);

  const startedAtMsRef = useRef<number | null>(null);
  const fadeFromOpacityRef = useRef(0);
  const activeDurationRef = useRef(0);
  const pausedOpacityRef = useRef(0);
  const isPausedRef = useRef(false);

  const isPaused = !motionEnabled || isDocumentHidden;
  const nextIndex = useMemo(
    () => getNextIndex(currentIndex, imageCount),
    [currentIndex, imageCount],
  );
  const isNextImageReady = loadedByIndex[nextIndex] ?? false;

  const clearAsync = useCallback(() => {
    if (rafFirstPassRef.current !== null) {
      window.cancelAnimationFrame(rafFirstPassRef.current);
      rafFirstPassRef.current = null;
    }

    if (rafSecondPassRef.current !== null) {
      window.cancelAnimationFrame(rafSecondPassRef.current);
      rafSecondPassRef.current = null;
    }

    if (completionTimerRef.current !== null) {
      window.clearTimeout(completionTimerRef.current);
      completionTimerRef.current = null;
    }
  }, []);

  const completeFade = useCallback(
    (sequence: number) => {
      if (sequence !== sequenceRef.current) {
        return;
      }

      clearAsync();
      startedAtMsRef.current = null;
      activeDurationRef.current = 0;
      fadeFromOpacityRef.current = 0;
      pausedOpacityRef.current = 0;

      setCurrentIndex((index) => getNextIndex(index, imageCount));
      setFrontOpacity(0);
      setTransitionMs(0);
      setPhase("idle");
    },
    [clearAsync, imageCount],
  );

  const startFade = useCallback(
    (fromOpacity: number, durationMs: number) => {
      if (isPausedRef.current || !isNextImageReady) {
        return;
      }

      clearAsync();
      const sequence = sequenceRef.current + 1;
      sequenceRef.current = sequence;
      fadeFromOpacityRef.current = fromOpacity;

      setPhase("fading");
      setFrontOpacity(fromOpacity);
      setTransitionMs(0);

      rafFirstPassRef.current = window.requestAnimationFrame(() => {
        if (sequence !== sequenceRef.current || isPausedRef.current) {
          return;
        }

        setTransitionMs(durationMs);

        rafSecondPassRef.current = window.requestAnimationFrame(() => {
          if (sequence !== sequenceRef.current || isPausedRef.current) {
            return;
          }

          startedAtMsRef.current = performance.now();
          activeDurationRef.current = durationMs;
          setFrontOpacity(1);

          completionTimerRef.current = window.setTimeout(() => {
            completeFade(sequence);
          }, durationMs + COMPLETION_BUFFER_MS);
        });
      });
    },
    [clearAsync, completeFade, isNextImageReady],
  );

  const pauseFade = useCallback(() => {
    if (phase !== "fading" || startedAtMsRef.current === null) {
      pausedOpacityRef.current = frontOpacity;
      setTransitionMs(0);
      setPhase("paused");
      return;
    }

    const currentOpacity = getOpacityAtTime(
      startedAtMsRef.current,
      fadeFromOpacityRef.current,
      activeDurationRef.current,
      performance.now(),
    );

    clearAsync();
    startedAtMsRef.current = null;
    activeDurationRef.current = 0;
    pausedOpacityRef.current = currentOpacity;

    setFrontOpacity(currentOpacity);
    setTransitionMs(0);
    setPhase("paused");
  }, [clearAsync, frontOpacity, phase]);

  const resumeFade = useCallback(() => {
    const currentOpacity = pausedOpacityRef.current;
    const resumeAction = getResumeAction(currentOpacity, fadeMs);

    startFade(currentOpacity, resumeAction.durationMs);
  }, [fadeMs, startFade]);

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

    if (isPaused && !wasPausedRef.current) {
      pauseFade();
    } else if (!isPaused && wasPausedRef.current) {
      resumeFade();
    }

    wasPausedRef.current = isPaused;
  }, [isPaused, pauseFade, resumeFade]);

  useEffect(() => {
    if (isPaused || phase !== "idle" || frontOpacity !== 0 || !isNextImageReady) {
      return;
    }

    startFade(0, fadeMs);
  }, [fadeMs, frontOpacity, isNextImageReady, isPaused, phase, startFade]);

  useEffect(() => {
    if (isPaused || phase !== "paused" || !isNextImageReady) {
      return;
    }

    resumeFade();
  }, [isPaused, isNextImageReady, phase, resumeFade]);

  useEffect(() => {
    let isDisposed = false;

    const markImageReady = (index: number) => {
      if (isDisposed) {
        return;
      }

      setLoadedByIndex((current) => {
        if (current[index]) {
          return current;
        }

        const next = [...current];
        next[index] = true;
        return next;
      });
    };

    images.forEach((src, index) => {
      if (loadedByIndex[index]) {
        return;
      }

      const image = new window.Image();
      image.src = src;

      if (image.complete) {
        markImageReady(index);
        return;
      }

      const onResolve = () => markImageReady(index);
      const onReject = () => markImageReady(index);

      image.addEventListener("load", onResolve, { once: true });
      image.addEventListener("error", onReject, { once: true });

      void image.decode().then(onResolve).catch(onReject);
    });

    return () => {
      isDisposed = true;
    };
  }, [images, loadedByIndex]);

  useEffect(() => {
    return () => {
      clearAsync();
    };
  }, [clearAsync]);

  return {
    currentIndex,
    nextIndex,
    frontOpacity,
    transitionMs,
    isPaused,
    phase,
  };
}

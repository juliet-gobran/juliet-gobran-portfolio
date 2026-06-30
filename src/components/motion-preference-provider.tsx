"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionPreferenceContextValue = {
  motionEnabled: boolean;
  setMotionEnabled: (value: boolean) => void;
  systemPrefersReducedMotion: boolean;
  effectiveMotionEnabled: boolean;
  /** @deprecated Use motionEnabled / setMotionEnabled */
  reduceMotion: boolean;
  /** @deprecated Use setMotionEnabled */
  setReduceMotion: (value: boolean) => void;
};

const MotionPreferenceContext =
  createContext<MotionPreferenceContextValue | null>(null);

export function useMotionPreference() {
  const context = useContext(MotionPreferenceContext);

  if (!context) {
    throw new Error(
      "useMotionPreference must be used within MotionPreferenceProvider",
    );
  }

  return context;
}

type MotionPreferenceProviderProps = {
  children: ReactNode;
};

export function MotionPreferenceProvider({
  children,
}: MotionPreferenceProviderProps) {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSystemPreference = () => {
      setSystemPrefersReducedMotion(mediaQuery.matches);
    };

    updateSystemPreference();
    mediaQuery.addEventListener("change", updateSystemPreference);

    return () => mediaQuery.removeEventListener("change", updateSystemPreference);
  }, []);

  const value = useMemo(
    () => ({
      motionEnabled,
      setMotionEnabled,
      systemPrefersReducedMotion,
      effectiveMotionEnabled: motionEnabled && !systemPrefersReducedMotion,
      reduceMotion: !motionEnabled || systemPrefersReducedMotion,
      setReduceMotion: (paused: boolean) => setMotionEnabled(!paused),
    }),
    [motionEnabled, systemPrefersReducedMotion],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      {children}
    </MotionPreferenceContext.Provider>
  );
}

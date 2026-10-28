"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const ACCENTS = ["orange", "pink", "blue"] as const;
export type Accent = (typeof ACCENTS)[number];

export const DEFAULT_ACCENT: Accent = "orange";

const STORAGE_KEY = "accent";

type AccentContextValue = {
  accent: Accent;
  setAccent: (accent: Accent) => void;
};

const AccentContext = createContext<AccentContextValue | null>(null);

function isAccent(value: string | null): value is Accent {
  return value !== null && (ACCENTS as readonly string[]).includes(value);
}

function applyAccent(accent: Accent) {
  document.documentElement.dataset.accent = accent;
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (private mode, disabled) — fall back to default
    }

    if (!isAccent(stored)) {
      return;
    }

    const timeoutId = window.setTimeout(() => setAccentState(stored), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — accent still applies for this session
    }
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);

  if (!context) {
    throw new Error("useAccent must be used within an AccentProvider");
  }

  return context;
}

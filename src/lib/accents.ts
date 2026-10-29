export const ACCENTS = ["orange", "pink", "blue"] as const;
export type Accent = (typeof ACCENTS)[number];

export const DEFAULT_ACCENT: Accent = "orange";
export const ACCENT_STORAGE_KEY = "accent";

export function isAccent(value: string | null): value is Accent {
  return value !== null && (ACCENTS as readonly string[]).includes(value);
}

// Runs inline in <head> before first paint so a saved accent never flashes the default.
export const APPLY_SAVED_ACCENT_SCRIPT = `(function(){try{var a=localStorage.getItem(${JSON.stringify(
  ACCENT_STORAGE_KEY,
)});if(${JSON.stringify(ACCENTS)}.indexOf(a)!==-1){document.documentElement.dataset.accent=a;}}catch(e){}})();`;

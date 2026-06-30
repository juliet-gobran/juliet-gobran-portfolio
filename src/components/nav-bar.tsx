"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { useMotionPreference } from "@/components/motion-preference-provider";
import { NAV_LINKS } from "@/lib/nav-links";

const navItemClassName =
  "text-text-primary transition-colors duration-300 ease-in-out hover:text-accent-orange";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_LINKS.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={navItemClassName}
          onClick={onNavigate}
        >
          {label}
        </a>
      ))}
    </>
  );
}

function MotionToggle({ className }: { className?: string }) {
  const {
    motionEnabled,
    setMotionEnabled,
    effectiveMotionEnabled,
    systemPrefersReducedMotion,
  } = useMotionPreference();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={effectiveMotionEnabled}
      aria-label={
        systemPrefersReducedMotion
          ? "Motion (disabled by system reduced motion preference)"
          : "Motion"
      }
      disabled={systemPrefersReducedMotion}
      onClick={() => setMotionEnabled(!motionEnabled)}
      className={`group flex items-center gap-1 font-jura text-base md:text-nav-link disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ""}`}
    >
      <span
        className={`${navItemClassName} ${effectiveMotionEnabled ? "text-accent-orange" : ""}`}
      >
        Motion
      </span>
      <span
        aria-hidden
        className={`relative h-4 w-7 shrink-0 rounded-full border border-border-shell transition-colors duration-300 ease-in-out group-hover:border-accent-orange ${effectiveMotionEnabled ? "bg-accent-orange" : "bg-transparent"}`}
      >
        <span
          className={`absolute top-1/2 left-0.5 size-2.5 -translate-y-1/2 rounded-full bg-text-primary transition-transform duration-300 ease-in-out ${effectiveMotionEnabled ? "translate-x-3" : ""}`}
        />
      </span>
    </button>
  );
}

function MenuToggle({
  isOpen,
  onClick,
  menuId,
}: {
  isOpen: boolean;
  onClick: () => void;
  menuId: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
      className="flex size-8 flex-col items-center justify-center gap-1.5 md:hidden"
    >
      <span
        className={`block h-px w-5 bg-text-primary transition-all duration-300 ease-in-out ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`block h-px w-5 bg-text-primary transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-px w-5 bg-text-primary transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </button>
  );
}

export function NavBar() {
  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (navRef.current && !navRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <nav
      ref={navRef}
      aria-label="Site navigation"
      className="relative font-jura text-base md:text-nav-link"
    >
      <div className="hidden items-center gap-nav-link-gap md:flex">
        <NavLinks />
        <MotionToggle />
      </div>

      <div className="md:hidden">
        <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} menuId={menuId} />

        <div
          id={menuId}
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`absolute top-full right-0 z-20 mt-1 min-w-44 origin-top-right rounded-shell-top border border-border-shell bg-background-dark p-3 transition-all duration-300 ease-in-out ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
        >
          <div className="flex flex-col gap-3">
            <NavLinks onNavigate={closeMenu} />
            <MotionToggle className="w-full justify-between" />
          </div>
        </div>
      </div>
    </nav>
  );
}

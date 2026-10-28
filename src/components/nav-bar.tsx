"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const NAV_ITEMS = ["Work", "Gallery", "About"] as const;

function NavLinks() {
  return (
    <>
      {NAV_ITEMS.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </>
  );
}

function ContactCta({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center justify-center rounded-control border border-border-subtle bg-surface-raised px-2 py-1 font-jura text-base font-semibold text-text-primary md:text-case-study-button ${className ?? ""}`}
    >
      Contact
    </span>
  );
}

const hamburgerBarClassName =
  "block h-px w-5 bg-text-primary transition-all duration-300 ease-in-out";

function MenuToggle({
  isOpen,
  onClick,
  menuId,
}: {
  isOpen: boolean;
  onClick: () => void;
  menuId: string;
}) {
  const barStateClassNames = isOpen
    ? ["translate-y-[7px] rotate-45", "opacity-0", "-translate-y-[7px] -rotate-45"]
    : ["", "", ""];

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
      className="flex size-8 flex-col items-center justify-center gap-1.5 md:hidden"
    >
      {barStateClassNames.map((stateClassName, index) => (
        <span
          key={index}
          className={`${hamburgerBarClassName} ${stateClassName}`}
        />
      ))}
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
        <ContactCta />
      </div>

      <div className="md:hidden">
        <MenuToggle isOpen={isMenuOpen} onClick={toggleMenu} menuId={menuId} />

        <div
          id={menuId}
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`absolute top-full right-0 z-20 mt-1 min-w-44 origin-top-right rounded-control border border-border-subtle bg-surface-sunken p-3 transition-all duration-300 ease-in-out ${isMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`}
        >
          <div className="flex flex-col gap-3">
            <NavLinks />
            <ContactCta className="w-full" />
          </div>
        </div>
      </div>
    </nav>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { StarIcon } from "@/components/icons/accent-icons";

export const metadata: Metadata = {
  title: "Page not found — Juliet Gobran",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-home flex-col items-start gap-6 py-16">
      <div className="size-16 drop-shadow-surface">
        <StarIcon />
      </div>
      <h1 className="font-jura text-3xl font-bold text-text-primary md:text-intro-heading">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="max-w-content font-albert-sans text-case-study-body font-light text-text-primary">
        The link might be old or mistyped. My work, gallery and contact details
        are all on the home page.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-control border border-cta-accent-dark bg-cta-accent px-4 py-1 font-jura text-base font-bold text-text-primary transition-opacity duration-300 ease-in-out hover:opacity-70 md:text-case-study-button"
      >
        Back home
      </Link>
    </div>
  );
}

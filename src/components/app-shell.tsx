import Link from "next/link";

import { NavBar } from "@/components/nav-bar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative h-dvh overflow-hidden bg-background">
      <div className="relative flex h-full min-h-0 flex-col p-shell-inset">
        <header className="relative z-10 flex shrink-0 items-center justify-between rounded-control border border-border-subtle bg-surface-sunken px-nav-padding-x py-nav-padding-y">
          <Link
            href="/"
            className="font-jura text-2xl font-bold text-text-primary transition-opacity duration-300 ease-in-out hover:opacity-70 md:text-nav-name"
          >
            Juliet Gobran
          </Link>
          <NavBar />
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-center-padding-x py-center-padding-y">
          {children}
        </main>
      </div>
    </div>
  );
}

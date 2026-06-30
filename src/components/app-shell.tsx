import Link from "next/link";

import { GalaxyBackground } from "@/components/galaxy-background";
import { MotionPreferenceProvider } from "@/components/motion-preference-provider";
import { NavBar } from "@/components/nav-bar";
import { WollongongClock } from "@/components/wollongong-clock";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-dvh">
      <MotionPreferenceProvider>
        <GalaxyBackground />
        <div className="relative flex min-h-dvh flex-col p-shell-inset">
          <div className="flex min-h-0 flex-1 flex-col">
            <header className="relative flex shrink-0 items-center justify-between rounded-t-shell-top border border-border-shell px-nav-padding-x py-nav-padding-y">
              <Link
                href="/"
                className="font-jura text-2xl text-text-primary transition-colors duration-300 ease-in-out hover:text-accent-orange md:text-nav-name"
              >
                Juliet Gobran
              </Link>
              <NavBar />
            </header>

            <main className="min-h-0 flex-1 overflow-y-auto px-center-padding-x py-center-padding-y">
              {children}
            </main>

            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 rounded-b-shell-bottom border border-border-shell px-footer-padding-x py-footer-padding-y">
              <span className="font-jura text-base text-text-primary md:text-nav-link">
                Senior Product Designer
              </span>
              <WollongongClock />
            </footer>
          </div>
        </div>
      </MotionPreferenceProvider>
    </div>
  );
}

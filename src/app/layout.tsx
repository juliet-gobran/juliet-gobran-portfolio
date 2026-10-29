import type { Metadata } from "next";
import { Albert_Sans, Jura } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { AccentProvider } from "@/components/accent-provider";
import { AppShell } from "@/components/app-shell";
import { APPLY_SAVED_ACCENT_SCRIPT } from "@/lib/accents";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jura.variable} ${albertSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: APPLY_SAVED_ACCENT_SCRIPT }}
        />
      </head>
      <body className="h-dvh overflow-hidden" suppressHydrationWarning>
        <noscript>
          <style>{`.js-reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <AccentProvider>
          <AppShell>{children}</AppShell>
        </AccentProvider>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Albert_Sans, Jura } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { AccentProvider } from "@/components/accent-provider";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const SET_ACCENT_BEFORE_PAINT = `(function(){try{var a=localStorage.getItem("accent");if(a==="pink"||a==="blue"||a==="orange"){document.documentElement.dataset.accent=a;}}catch(e){}})();`;

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
  metadataBase: new URL("https://www.juliet-gobran.com.au"),
  title: {
    default: "Juliet Gobran",
    template: "%s",
  },
  description: "Senior Product Designer portfolio",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Juliet Gobran",
    title: "Juliet Gobran",
    description: "Senior Product Designer portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juliet Gobran",
    description: "Senior Product Designer portfolio",
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
          dangerouslySetInnerHTML={{ __html: SET_ACCENT_BEFORE_PAINT }}
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

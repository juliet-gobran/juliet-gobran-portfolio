import type { Metadata } from "next";
import { Albert_Sans, Jura } from "next/font/google";

import { AppShell } from "@/components/app-shell";
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
    >
      <body className="min-h-dvh">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

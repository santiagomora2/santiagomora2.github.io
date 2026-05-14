import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { BackgroundLayer } from "@/components/background-layer";
import { SiteNav } from "@/components/site-nav";
import { TerminalWindow } from "@/components/terminal-window";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Santiago Mora | Terminal Portfolio",
    template: "%s | Santiago Mora",
  },
  description: "Minimal terminal-style portfolio for Santiago Mora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--page-bg)] text-[var(--page-fg)]">
        <ThemeProvider>
          <BackgroundLayer />
          <main className="relative mx-auto flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6">
            <TerminalWindow>
              <SiteNav />
              {children}
            </TerminalWindow>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

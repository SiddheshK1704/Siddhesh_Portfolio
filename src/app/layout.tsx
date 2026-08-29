import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { IntroSequence } from "@/components/intro/IntroSequence";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SID. | Portfolio",
  description:
    "Portfolio of Siddhesh Khankhoje — building intelligent systems and software experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Decorative noise texture over the entire site. z-40 keeps
            it above page content but below the navbar (z-50).
            pointer-events-none + aria-hidden: purely visual, never
            intercepts clicks or gets announced to screen readers. */}
        <div
          aria-hidden
          className="grain-overlay fixed inset-0 z-40 pointer-events-none"
        />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
        {/* Mounted last, with z-[100] (above the navbar's z-50), so
            it fully covers the real page underneath until it's done. */}
        <IntroSequence />
      </body>
    </html>
  );
}

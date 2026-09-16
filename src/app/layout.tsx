import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { IntroSequence } from "@/components/intro/IntroSequence";
import { GlobalBackground } from "@/components/reactbits/GlobalBackground";
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
      <body className="min-h-full flex flex-col relative bg-background text-foreground">
        {/* Global interactive Ferrofluid background */}
        <GlobalBackground />

        {/* Decorative noise texture over the entire site */}
        <div
          aria-hidden
          className="grain-overlay fixed inset-0 z-30 pointer-events-none"
        />
        <div className="relative z-10 flex flex-col min-h-full">
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </div>
        {/* Mounted last, with z-[100] (above the navbar's z-50), so
            it fully covers the real page underneath until it's done. */}
        <IntroSequence />
      </body>
    </html>
  );
}

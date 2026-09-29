import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, Noto_Sans_Devanagari } from "next/font/google";
import { Navbar } from "@/components/navbar/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MultilingualIntro } from "@/components/intro/MultilingualIntro";
import { INTRO_GATE_SCRIPT } from "@/components/intro/introGate";
import { THEME_SCRIPT } from "@/components/theme/themeScript";
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

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "600", "700"],
  subsets: ["devanagari"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  title: "SID. | Siddhesh Khankhoje",
  description:
    "Building intelligent systems and software experiences — from RAG pipelines to full-stack products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} ${notoSansDevanagari.variable} h-full antialiased`}
      data-theme="dark"
      // THEME_SCRIPT / INTRO_GATE_SCRIPT may change <html> before hydration
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative bg-background text-foreground selection:bg-accent/25 selection:text-white">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT + INTRO_GATE_SCRIPT }} />

        {/* Ambient room: dark navy by default, daylight paper in light theme */}
        <GlobalBackground />

        {/* Quiet noise texture */}
        <div
          aria-hidden
          className="grain-overlay fixed inset-0 z-30 pointer-events-none"
        />

        {/* Fast multilingual greeting intro sequence */}
        <MultilingualIntro />

        <div className="relative z-10 flex flex-col min-h-full">
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}

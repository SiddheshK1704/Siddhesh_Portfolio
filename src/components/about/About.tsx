import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/case-study/parts";
import { photographs } from "@/data/about";
import { AboutIntro } from "./AboutIntro";
import { MotorsportsIntro } from "./MotorsportsIntro";
import { PhotographyCarousel } from "./PhotographyCarousel";
import { GamesCollection } from "./GamesCollection";
import { AboutResume } from "./AboutResume";

// The About section. Server component: it only composes children; the
// interactive pieces (sunset reveal, photo carousel) are client islands.
//
// id="about" is the Navbar's #about target.
//
// NARRATIVE: the person first, then what they build — curiosity →
// personality → things I love → technology → motorsport → photography →
// games, then the resume as the formal close.
//   01 AboutIntro        — giant ABOUT + typed line; who I am, with the
//                          8-bit/real sunset portrait
//   02 MotorsportsIntro  — the car story, set editorially
//   03 Photography       — drag-through carousel of my photos
//   04 GamesCollection   — a gallery wall, Ghost of Tsushima largest
//      AboutResume       — "if you're here for the formal version —"
export function About() {
  return (
    <section id="about" className="flex flex-col overflow-x-clip">
      <AboutIntro />
      <MotorsportsIntro />

      {/* 03 / PHOTOGRAPHY — heading in the content column, photos full-bleed */}
      <div className="py-20 sm:py-28">
        <div className="px-6 lg:px-16">
          <div className="max-w-6xl mx-auto border-t border-border/60 pt-16 sm:pt-24 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-6">
              <Reveal>
                <SectionLabel n="03">Photography</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h3 className="text-h1 font-sans text-foreground">A few frames I&apos;ve taken.</h3>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <p className="work-hint font-pixel text-[8px] leading-relaxed text-muted/80 sm:pb-3">
                <span className="work-hint--hover">Drag to browse</span>
                <span className="work-hint--tap">Swipe to browse</span>
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="mt-12 sm:mt-16">
          <PhotographyCarousel photos={photographs} />
        </Reveal>
      </div>

      <GamesCollection />
      <AboutResume />
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/case-study/parts";

// MotorsportsIntro — the car story, set as an editorial narrative:
// an opening lede, the body in a reading column with small pixel margin
// notes, and the closing line as a pull quote. The words are Siddhesh's
// own, unchanged.

function MarginNote({ children }: { children: string }) {
  return (
    <p className="font-pixel text-[8px] leading-[1.9] uppercase text-muted lg:pt-2">{children}</p>
  );
}

export function MotorsportsIntro() {
  return (
    <div className="px-6 lg:px-16 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto border-t border-border/60 pt-16 sm:pt-24 flex flex-col gap-14 sm:gap-20">
        {/* Opening */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <SectionLabel n="02">Motorsports</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-h2 font-sans text-foreground max-w-4xl">
              Ever since I was a child, the sound of a roaring engine could quiet the world around
              me.{" "}
              <span className="text-muted">
                My mother introduced me to cars, taught me to sketch them, and unknowingly planted
                the spark that would become a lifelong obsession.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Body: margin note left, reading column right */}
        <div className="flex flex-col gap-12 sm:gap-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <Reveal className="lg:col-span-3">
              <MarginNote>2018 · Formula 1</MarginNote>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-7">
              <p className="text-lg sm:text-xl leading-relaxed tracking-tight text-foreground/90">
                In 2018, I discovered Formula 1—and everything changed. Watching Max Verstappen
                race didn&apos;t just deepen my love for cars; it taught me something bigger.
                Determination, consistency, and refusing to give up even when the odds are
                impossible. His drive became a blueprint for how I approach both passion and life.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <Reveal className="lg:col-span-3">
              <MarginNote>Slipstream</MarginNote>
            </Reveal>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={0.06}>
                <p className="text-body text-muted leading-relaxed">
                  I built{" "}
                  <Link
                    href="/work/slipstream"
                    className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    Slipstream
                  </Link>{" "}
                  to share that passion. This place is a tribute to the machines that push
                  boundaries, redefine performance, and spark dreams. Whether it&apos;s the violent
                  precision of a supercar or the timeless elegance of a classic, every machine
                  carries a story worth telling.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-body text-muted leading-relaxed">
                  <span className="text-foreground">Explore. Compare. Dream.</span> Slipstream is
                  more than a collection—it&apos;s a celebration of automotive excellence, crafted
                  for those who feel alive behind a revving engine.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* The line it all comes back to */}
        <Reveal delay={0.08}>
          <blockquote className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 border-t border-border/60 pt-12 sm:pt-16">
            <span aria-hidden="true" className="font-pixel text-2xl leading-none text-accent lg:col-span-3 lg:text-right lg:pt-2">
              &ldquo;
            </span>
            <p className="lg:col-span-8 text-h1 font-sans text-foreground">
              Speed isn&apos;t just about going fast.{" "}
              <span className="text-muted">
                It&apos;s about the clarity you find when the world blurs away.
              </span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </div>
  );
}

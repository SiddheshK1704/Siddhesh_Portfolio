"use client";

import { Reveal } from "@/components/ui/Reveal";

export function AboutPeople() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Heading with clean static Geist typography */}
        <Reveal>
          <h3 className="text-h1 max-w-3xl font-sans tracking-tight">
            I like <span className="text-accent">good conversations.</span>
          </h3>
        </Reveal>

        {/* Copy */}
        <div className="max-w-xl flex flex-col gap-8">
          <Reveal delay={0.1}>
            <p className="text-body text-muted leading-relaxed">
              I like talking to people, hearing how they think, getting
              into ridiculously deep conversations about things that
              probably didn&apos;t need a two-hour breakdown — and figuring
              things out together.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-body text-muted leading-relaxed">
              I&apos;m usually more interested in understanding someone
              than being the loudest person in the room.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

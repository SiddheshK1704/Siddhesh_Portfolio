"use client";

import { Reveal } from "@/components/ui/Reveal";
import TextPressure from "@/components/reactbits/TextPressure";

export function AboutPeople() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Heading with robust Text Pressure variable font interaction */}
        <Reveal>
          <div className="max-w-3xl">
            <TextPressure
              text="I like good conversations."
              accentText="good conversations."
              className="text-h1 font-sans tracking-tight"
              weight={true}
              width={false}
              italic={false}
              alpha={false}
            />
          </div>
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

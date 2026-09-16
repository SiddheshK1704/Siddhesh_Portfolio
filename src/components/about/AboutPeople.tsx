"use client";

import { Reveal } from "@/components/ui/Reveal";
import TextPressure from "@/components/reactbits/TextPressure";

export function AboutPeople() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Heading with React Bits TextPressure variable font interaction */}
        <Reveal>
          <h3 className="sr-only">I like good conversations.</h3>
          <div className="relative h-[90px] sm:h-[120px] md:h-[140px] w-full max-w-3xl overflow-hidden select-none">
            <TextPressure
              text="I like good conversations."
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor="#f5f5f5"
              minFontSize={28}
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

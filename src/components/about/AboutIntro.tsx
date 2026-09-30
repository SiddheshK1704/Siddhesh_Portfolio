import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/case-study/parts";
import { TextType } from "@/components/reactbits/TextType";
import { SunsetReveal } from "./SunsetReveal";

// AboutIntro — the person first, then what they build.
// A giant editorial ABOUT (same scale as WORK) with a quiet typed line
// beside it; below, the story on the left and the interactive sunset
// portrait on the right (stacked on mobile). The sunset and the typed
// line are the only client islands.
//
// Story order: person → curiosity → interests → technology → building.

const TYPED = [
  "I like figuring things out.",
  "I like good conversations.",
  "I like things with engines.",
  "I like animals. All of them.",
  "I like making things.",
  "I notice the little things.",
];

export function AboutIntro() {
  return (
    <div className="px-6 lg:px-16 pt-28 sm:pt-32 pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 sm:gap-20">
        {/* ABOUT, with a line typing itself out beside it */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-work font-sans text-foreground">ABOUT</h2>
            <p className="text-body sm:text-lg text-muted font-sans md:pb-3 min-h-[1.5em]">
              <TextType
                texts={TYPED}
                prefix={
                  <span className="font-pixel text-[9px] leading-none text-accent mr-3 self-center">
                    &gt;
                  </span>
                }
              />
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-start">
          {/* The story */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <Reveal>
              <SectionLabel n="01">Who I am</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="text-h2 font-sans text-foreground max-w-xl">
                I&apos;m curious about almost everything,{" "}
                <span className="text-muted">and happiest when I&apos;m figuring out how it works.</span>
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl sm:text-2xl leading-snug tracking-tight text-foreground/90 max-w-xl">
                Technology, art, the way a sketch turns into something real — I&apos;d rather
                understand things from the ground up than simply know that they work.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-body text-muted leading-relaxed max-w-md">
                I love a good conversation, and the people it brings into my life. I have a soft
                spot for dogs, cats and just about every animal. And cars and bikes? They still
                excite me more than almost anything.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-body text-muted leading-relaxed max-w-md">
                That same curiosity is what pulled me into software. I study Computer Science at
                SRM University, and these days I spend most of my time where AI/ML meets real
                products — taking ideas apart, then building them into things people can use.
              </p>
            </Reveal>
          </div>

          {/* The 8-bit me — and the real one underneath. No instructions:
              it's there to be found. */}
          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <SunsetReveal className="w-full max-w-[520px] lg:max-w-none" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

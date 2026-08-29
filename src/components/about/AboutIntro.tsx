import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

// AboutIntro — the editorial introduction to the About section.
//
// LAYOUT STRATEGY (vs the Hero):
//   Hero  = text left + photo right, side by side from the start.
//   About = full-width headline FIRST, then photo LEFT + details RIGHT.
//
// This reversal + the full-width headline create a fundamentally
// different visual rhythm — same design system, different composition.
//
// Still a SERVER COMPONENT — no hooks needed yet. <Reveal> (a Client
// Component) handles the entrance animations as a child.

export function AboutIntro() {
  return (
    <div className="px-6 lg:px-16 pt-32 pb-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── Section eyebrow ────────────────────────────── */}
        <Reveal>
          <p className="text-eyebrow">About</p>
        </Reveal>

        {/* ── Full-width editorial headline ──────────────── 
            This spans the entire content width — NOT confined
            to a column like the Hero's name. The sentence wraps
            naturally across 3–4 lines at text-h1 size, creating
            an editorial text-block feel.
            
            Selective color: "ask a lot of questions" is the one
            phrase pulled into accent blue — it's a defining trait,
            so the visual treatment highlights it rather than
            letting it blend into the rest of the sentence. */}
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-3xl">
            I build things,{" "}
            <span className="text-accent">
              ask a lot of questions,
            </span>{" "}
            and like figuring out how things work.
          </h2>
        </Reveal>

        {/* ── Photo + details split ──────────────────────── 
            REVERSED from the Hero: photo on the LEFT, supporting
            details on the RIGHT. Equal 50/50 split (not the Hero's
            60/40). This alone makes it feel like a different section.
            
            On mobile: stacks naturally — photo first, text below. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Photo column (LEFT on desktop) */}
          <Reveal delay={0.15}>
            <div className="relative max-w-md">
              {/* Vertical accent line — a thin blue stroke to the
                  left of the photo, visible on desktop only. This
                  detail doesn't exist anywhere else in the site;
                  it's unique to the About section. */}
              <div
                aria-hidden
                className="absolute -left-4 top-0 bottom-0 w-[2px] bg-accent/40 hidden lg:block"
              />

              {/* Photo frame — the aspect-[3/4] container crops
                  the 9:16 source to a 3:4 portrait. object-cover
                  fills the frame; object-position centers on the
                  lower portion where you + the lake are. */}
              <div className="relative aspect-[3/4] rounded-[var(--radius-md)] overflow-hidden border border-border">
                <Image
                  src="/images/sid-about.jpeg"
                  alt="Sid standing by a lake at dusk, looking out toward a treeline under an overcast sky"
                  fill
                  sizes="(min-width: 1024px) 500px, calc(100vw - 48px)"
                  className="object-cover object-[50%_60%]"
                />
                {/* Subtle blue tint — same technique as the Hero
                    photo but lighter (5% instead of 10%). Gives the
                    image a slight cool-tone cohesion with the site's
                    blue accent without looking filtered. */}
                <div className="absolute inset-0 bg-accent/5 mix-blend-multiply pointer-events-none" />
                {/* Inner ring — a 1px inset border that sits on top
                    of the image, adding a layer of depth. Without it
                    the image edge meets the outer border too flatly. */}
                <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
              </div>
            </div>
          </Reveal>

          {/* Details column (RIGHT on desktop) */}
          <div className="flex flex-col gap-10 lg:pt-12">
            {/* Accent line — horizontal, same as the Hero's but
                positioned differently (right column, not left). */}
            <Reveal delay={0.2}>
              <div className="h-[2px] w-16 bg-accent" />
            </Reveal>

            {/* Supporting copy — conversational, not corporate. */}
            <Reveal delay={0.25}>
              <p className="text-body text-muted max-w-md leading-relaxed">
                Currently studying Computer Science at SRM University,
                Chennai — building at the intersection of AI/ML and
                software engineering. I&apos;d rather understand something
                from the ground up than skim the surface, and I care
                about details most people skip.
              </p>
            </Reveal>

            {/* ── Metadata grid ────────────────────────────── 
                Quick-reference details in an editorial sidebar
                style — like a magazine pull-quote, not a resume.
                
                grid-cols-[auto_1fr]: the label column sizes to
                its content (auto), the value column takes the
                remaining space (1fr). This keeps labels aligned
                regardless of their text length. */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-small border-t border-border pt-8">
                <span className="text-eyebrow">Location</span>
                <span className="text-foreground">Chennai, India</span>

                <span className="text-eyebrow">Focus</span>
                <span className="text-foreground">AI/ML &amp; Software Engineering</span>

                <span className="text-eyebrow">Currently</span>
                <span className="text-foreground">CS @ SRM University</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Reveal } from "@/components/ui/Reveal";

// AboutPeople — the People / Conversations section.
//
// SERVER COMPONENT — purely static content with <Reveal> animation.
//
// DESIGN APPROACH:
//   Simple, editorial. A large heading followed by two paragraphs
//   of conversational copy. No complex layout, no cards, no grid.
//   The simplicity IS the design — after the visual complexity of
//   the Interests and Motorsports sections, a quieter moment with
//   just text and space lets the words land.
//
//   max-w-xl on the copy container prevents lines from stretching
//   too wide on large screens, maintaining comfortable reading width.
//
// PERSONALITY NOTE (from spec):
//   "Being a listener" is part of the personality but NOT the
//   defining characteristic. The copy leads with enjoying people
//   and conversations broadly, and the listener aspect appears
//   naturally in the second paragraph without being labelled.

export function AboutPeople() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* ── Heading ──────────────────────────────────────── 
            "people" in accent blue — it's the key word of this
            section, and the selective color treatment matches the
            pattern from AboutIntro ("ask a lot of questions"). */}
        <Reveal>
          <h3 className="text-h1 max-w-3xl">
            I like{" "}
            <span className="text-accent">good conversations.</span>
          </h3>
        </Reveal>

        {/* ── Copy ─────────────────────────────────────────── 
            Two paragraphs, separate Reveal wrappers so they
            stagger in. First paragraph: what I enjoy. Second
            paragraph: how I show up — the listener aspect
            emerges naturally here without being the headline. */}
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

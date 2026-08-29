import { Reveal } from "@/components/ui/Reveal";

// AboutInterests — the "Life Outside Code" transition + interest list.
//
// SERVER COMPONENT — no "use client" needed. <Reveal> (a Client
// Component) handles the entrance animations as a child.
//
// DESIGN APPROACH:
//   The interests are presented as a full-width typographic list
//   separated by hairline borders — like a magazine table of contents
//   or an editorial index. This is deliberately NOT cards, NOT icons,
//   NOT emojis. Just type, space, and structure.
//
//   Each interest gets a small counter number on the right side in
//   eyebrow style, adding an editorial detail without clutter.
//
// WHY text-h2 FOR INTERESTS:
//   Large enough to feel editorial and important, but not so large
//   that it competes with the section heading above. text-h1 is
//   reserved for the transition heading; text-h2 gives the interests
//   presence while maintaining hierarchy.

const INTERESTS = [
  "Motorsports",
  "Football",
  "Books",
  "Chess",
  "Driving",
  "Conversations",
];

export function AboutInterests() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* ── Transition heading ──────────────────────────────
            This marks the shift from "who I am professionally" to
            "who I am as a person." The two-tone treatment (foreground
            for the setup, muted for the payoff) creates a natural
            reading pause — your eye lands on the bright text first,
            then discovers the rest. */}
        <Reveal>
          <h3 className="text-h1 max-w-2xl">
            When I&apos;m not building things,{" "}
            <span className="text-muted">
              there&apos;s a lot more going on.
            </span>
          </h3>
        </Reveal>

        {/* ── Interest list ────────────────────────────────────
            Full-width rows with hairline borders between them.
            Each row: interest name (left, large) + index number
            (right, small monospace). The border-t on the container
            gives us the top edge; each row adds border-b for the
            bottom edge of that row. */}
        <div className="border-t border-border">
          {INTERESTS.map((interest, i) => (
            <Reveal key={interest} delay={0.05 * (i + 1)}>
              <div className="flex items-baseline justify-between py-5 border-b border-border">
                <span className="text-h2">{interest}</span>
                <span className="text-eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

// AboutMotorsports — the Motorsports / Max Verstappen deep-dive.
//
// NOW A CLIENT COMPONENT because we need:
//   - useRef       → to grab a DOM reference to the section element
//   - useScroll    → to track how far this section has scrolled
//   - useTransform → to map scroll progress to a pixel offset
//   - useReducedMotion → to disable parallax for accessibility
//
// WHY "use client" IS NECESSARY:
//   Server Components run on the server during build/request time.
//   They have no access to the browser's DOM, scroll position, or
//   window object. Parallax requires reading the live scroll position
//   on every frame — that can only happen in the browser, so the
//   component must be a Client Component.
//
//   The trade-off: this file now ships JavaScript to the browser.
//   But it's a small amount — just the scroll tracking logic.
//   The rest of the About sub-sections remain Server Components.
//
// PARALLAX APPROACH:
//   The background image container is intentionally TALLER than the
//   section (extends 80px above and below via -top-20 -bottom-20).
//   As the section scrolls through the viewport, the image shifts
//   from y: +30px to y: -30px — a total of 60px of movement.
//   Because the container has 160px of extra height (80px × 2),
//   there's always image visible, never a gap.
//
//   The content scrolls at normal speed on top of this. The difference
//   in scroll rates between content and image creates the depth effect.

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const QUALITIES = ["Precision", "Instinct", "Consistency", "Pressure"];

export function AboutMotorsports() {
  // useRef creates a mutable reference object. We attach it to the
  // section's DOM element via the ref={} prop. This lets useScroll
  // know WHICH element to track scroll progress for — without it,
  // useScroll would track the entire page, not just this section.
  const sectionRef = useRef<HTMLDivElement>(null);

  // useReducedMotion returns true if the user has enabled
  // "Reduce motion" in their OS accessibility settings.
  // When true, we set parallax offset to 0 (no movement).
  const shouldReduceMotion = useReducedMotion();

  // useScroll returns a scrollYProgress MotionValue — a reactive
  // number between 0 and 1 that updates automatically as the user
  // scrolls. It does NOT cause React re-renders; Motion updates
  // the DOM directly via its own animation system.
  //
  // The offset array defines WHEN 0 and 1 occur:
  //   "start end"  → progress = 0 when section's TOP reaches viewport BOTTOM
  //   "end start"  → progress = 1 when section's BOTTOM reaches viewport TOP
  //
  // This covers the ENTIRE time the section is visible on screen.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // useTransform maps one range to another:
  //   Input:  scrollYProgress goes from 0 → 1
  //   Output: imageY goes from +30 → -30 (pixels)
  //
  // When the section first enters the viewport (progress ≈ 0),
  // the image is shifted 30px DOWN. As you scroll through
  // (progress → 1), the image moves to 30px UP. Total movement: 60px.
  //
  // The content on top scrolls at normal speed. The image moves
  // slower (only 60px across the entire section height), which is
  // what creates the parallax depth illusion.
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [30, -30]
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden min-h-[80vh] flex items-center">

      {/* ── Background image with parallax ────────────────── 
          motion.div applies the parallax y-offset. The div extends
          80px beyond the section edges in both directions so the
          movement never reveals the section background behind it.
          
          overflow-hidden on the parent clips the extra height,
          so visually the image appears contained within the section. */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-x-0 -top-20 -bottom-20"
      >
        <Image
          src="/images/max-verstappen.jpg"
          alt="Max Verstappen"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Dark overlay — 75% of the background color layered over
            the image. This keeps the white text readable while still
            letting the photo atmosphere show through. Adjust the
            opacity fraction (75) to taste: lower = more image visible,
            higher = more readable text. */}
        <div className="absolute inset-0 bg-background/75" />

        {/* Subtle blue tint — same technique as Hero and AboutIntro
            photos. Gives the image cool-tone cohesion with the
            site's accent color. */}
        <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
      </motion.div>

      {/* ── Content ───────────────────────────────────────── 
          z-10 ensures the text renders ABOVE the background image
          layer. Without it, the absolutely-positioned image div
          would paint on top of the content. */}
      <div className="relative z-10 px-6 lg:px-16 py-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">

          {/* ── Section eyebrow ──────────────────────────────── */}
          <Reveal>
            <p className="text-eyebrow">Motorsports</p>
          </Reveal>

          {/* ── Name ─────────────────────────────────────────── */}
          <Reveal delay={0.1}>
            <h3 className="text-h1">Max Verstappen</h3>
          </Reveal>

          {/* ── Accent separator ─────────────────────────────── */}
          <Reveal delay={0.15}>
            <div className="h-[2px] w-16 bg-accent" />
          </Reveal>

          {/* ── Qualities + copy split ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

            {/* Qualities — stacked like timing data labels */}
            <Reveal delay={0.2}>
              <div className="flex flex-col gap-2">
                {QUALITIES.map((q) => (
                  <span key={q} className="text-h2 text-muted">
                    {q}.
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Personal copy */}
            <Reveal delay={0.25}>
              <p className="text-body text-muted max-w-md leading-relaxed lg:pt-2">
                There&apos;s something about watching someone operate at that
                level — where every input is deliberate, every correction
                happens before the problem is even visible. It&apos;s the kind
                of precision and composure I find myself thinking about,
                whether I&apos;m debugging a system or building something new.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

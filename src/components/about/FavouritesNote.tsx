"use client";

import { motion, useReducedMotion } from "motion/react";

// A small margin annotation: "some of my favourites" with a hand-drawn,
// looping arrow heading down-right toward the games. The line draws
// itself once when it scrolls into view (static with reduced motion).

// Loose ink: a gentle rise, one loop, then a sweep down to the tip.
const STROKE = "M2 14 C 22 6, 44 6, 54 18 C 62 28, 56 40, 46 36 C 36 32, 42 16, 58 16 C 74 16, 90 52, 110 70";
const HEAD = "M100 68 L110 70 L107 60";

export function FavouritesNote() {
  const reduce = useReducedMotion();
  // Always animate to the drawn state; reduced motion just makes it
  // instant. (useReducedMotion is null on the first render, so switching
  // the props themselves would leave the arrow stuck undrawn.)
  const draw = (delay: number, duration: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: reduce ? { duration: 0 } : { delay, duration, ease: [0.45, 0, 0.25, 1] as const },
  });

  return (
    <div className="flex items-start gap-1 text-muted">
      <p className="font-sans text-sm tracking-tight -rotate-3 origin-left pt-0.5 whitespace-nowrap">
        some of my favourites
      </p>
      <svg
        aria-hidden="true"
        viewBox="0 0 114 76"
        className="w-22 sm:w-26 h-auto shrink-0 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Starts once the surrounding Reveal has faded in */}
        <motion.path d={STROKE} {...draw(0.6, 1.1)} />
        <motion.path d={HEAD} {...draw(1.65, 0.25)} />
      </svg>
    </div>
  );
}

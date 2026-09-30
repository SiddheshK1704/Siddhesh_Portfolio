"use client";

import { motion, useScroll, useTransform } from "motion/react";
import GradualBlur from "@/components/reactbits/GradualBlur";

/** Distance from the true page bottom (px) over which the blur fades out. */
const FADE_RANGE = 220;

/**
 * BottomBlur — a subtle Gradual Blur fixed to the bottom of the viewport,
 * so content softens as it approaches the edge.
 *
 * Near the end of the page it fades out, so it never sits over the
 * footer; scrolling back up brings it back. The fade is driven by the
 * real remaining scroll distance (scrollHeight − viewport − scrollY),
 * not a percentage, so it lands on the footer whatever the page length.
 * Computed inside Motion's frame loop: no scroll listener of our own and
 * no React re-renders.
 */
export function BottomBlur() {
  const { scrollY } = useScroll();

  const opacity = useTransform(() => {
    // Server render: assume the top of the page (effect fully on)
    if (typeof document === "undefined") return 1;
    const doc = document.documentElement;
    const remaining = doc.scrollHeight - window.innerHeight - scrollY.get();
    return Math.min(1, Math.max(0, remaining / FADE_RANGE));
  });

  return (
    <motion.div
      style={{ opacity }}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 sm:h-28"
    >
      <GradualBlur position="bottom" layers={5} strength={6} className="absolute inset-0" />
    </motion.div>
  );
}

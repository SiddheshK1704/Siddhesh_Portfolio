"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * BottomBlur — progressive viewport blur that diffuses content as it scrolls off
 * the bottom edge, smoothly clearing to 0 opacity when reaching the final footer.
 */
export function BottomBlur() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Opacity clears gracefully as the user reaches the bottom of the page
  const blurOpacity = useTransform(scrollYProgress, [0.85, 0.96, 1.0], [0.8, 0.35, 0]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ opacity: blurOpacity }}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 h-24 sm:h-32 z-40 backdrop-blur-[8px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]"
    />
  );
}


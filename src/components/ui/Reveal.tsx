"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Wraps any content in a fade-up animation that triggers once,
 * the first time it scrolls into view. Used across Hero, Selected
 * Work, and (soon) About/Contact so every section feels considered
 * without hand-writing the same animation logic repeatedly.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  // Respects the OS-level "reduce motion" accessibility setting —
  // if set, content simply appears with no movement.
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      // This mismatch is expected and harmless: content visible on
      // first paint (like our Hero) is already "in view" on the
      // client the instant it mounts, but the server has no concept
      // of a viewport and always renders the pre-animation state.
      // The two states reconcile within a frame either way.
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

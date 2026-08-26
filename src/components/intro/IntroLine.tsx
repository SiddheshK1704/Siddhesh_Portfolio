"use client";

import { motion } from "motion/react";

type IntroLineProps = {
  text: string;
  isReceding: boolean;
};

/**
 * Renders one line of text with a left-to-right masked reveal, then
 * (when `isReceding` becomes true) scales down and fades back —
 * the "moves behind the next layer" effect from the brief, done
 * with opacity + scale rather than any real 3D/z-axis transform.
 *
 * The reveal itself uses `clip-path: inset(0 X% 0 0)` animated from
 * 100% (fully hidden) to 0% (fully shown) — a mask sliding away,
 * not text being typed. The full string is in the DOM from frame
 * one; only its visibility changes.
 */
export function IntroLine({ text, isReceding }: IntroLineProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={
        isReceding
          ? { opacity: 0, scale: 0.92, y: -12 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.p
        className="text-display text-center"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
}

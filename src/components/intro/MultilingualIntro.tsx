"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurText from "@/components/reactbits/BlurText";
import { INTRO_STORAGE_KEY, shouldPlayIntro } from "./introGate";

const GREETINGS = [
  { text: "Hello", font: "font-sans" },
  { text: "नमस्ते", font: "font-devanagari" },
  { text: "Hola", font: "font-sans" },
];

// Blur Text tuned down: a short travel and moderate blur so each word
// resolves quickly and calmly rather than dropping in.
const BLUR_FROM = { filter: "blur(12px)", opacity: 0, y: 10 };
const BLUR_TO = [
  { filter: "blur(4px)", opacity: 0.6, y: 3 },
  { filter: "blur(0px)", opacity: 1, y: 0 },
];
const EASE = [0.22, 1, 0.36, 1] as const;

export function MultilingualIntro() {
  // Always start "active" so server and client render the same overlay.
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (!shouldPlayIntro()) {
      // Already hidden by INTRO_GATE_SCRIPT; just unmount.
      const t = setTimeout(() => setActive(false), 0);
      return () => clearTimeout(t);
    }

    // Lock scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ~2s total. Each word blurs in (~320ms), holds, then blurs out
    // (~150ms) before the next one resolves.
    //   0ms     Hello
    //   600ms   नमस्ते
    //   1200ms  Hola
    //   1780ms  overlay fades
    //   2060ms  unmount
    const timers = [
      setTimeout(() => setIndex(1), 600),
      setTimeout(() => setIndex(2), 1200),
      setTimeout(() => setIsExiting(true), 1780),
      setTimeout(() => {
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {}
        document.body.style.overflow = originalOverflow;
        setActive(false);
      }, 2060),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [active]);

  if (!active) return null;

  const current = GREETINGS[index];

  return (
    <motion.div
      aria-hidden="true"
      className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-background select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.26, ease: EASE }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.text}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.15, ease: EASE }}
        >
          <BlurText
            text={current.text}
            animateBy="words"
            autoStart
            delay={0}
            stepDuration={0.16}
            easing="easeOut"
            animationFrom={BLUR_FROM}
            animationTo={BLUR_TO}
            className={`text-display text-foreground leading-[1.2] ${current.font}`}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default MultilingualIntro;

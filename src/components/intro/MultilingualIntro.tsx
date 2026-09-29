"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurText from "@/components/reactbits/BlurText";
import {
  INTRO_DONE_EVENT,
  INTRO_PLAYING_CLASS,
  INTRO_STORAGE_KEY,
  INTRO_TIMINGS,
  shouldPlayIntro,
} from "./introGate";

const GREETINGS = [
  { text: "Hello,", font: "font-sans" },
  { text: "नमस्ते,", font: "font-devanagari" },
  { text: "Hola!", font: "font-sans" },
];

// Blur Text tuned down: a short travel and moderate blur so each word
// resolves quickly and calmly rather than dropping in.
const BLUR_FROM = { filter: "blur(12px)", opacity: 0, y: 10 };
const BLUR_TO = [
  { filter: "blur(4px)", opacity: 0.6, y: 3 },
  { filter: "blur(0px)", opacity: 1, y: 0 },
];
const EASE = [0.22, 1, 0.36, 1] as const;
/** Gentle ease-in-out for the overlay dissolve (matches .hero-emerge) */
const DISSOLVE = [0.4, 0, 0.2, 1] as const;

export function MultilingualIntro() {
  // Always start "active" so server and client render the same overlay.
  const [active, setActive] = useState(true);
  // -1 = the quiet pause before the first greeting (empty overlay)
  const [index, setIndex] = useState(-1);
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
    const root = document.documentElement;

    // See INTRO_TIMINGS for the full timeline.
    const { start, step, reveal, exit } = INTRO_TIMINGS;
    const timers = [
      setTimeout(() => setIndex(0), start),
      setTimeout(() => setIndex(1), start + step),
      setTimeout(() => setIndex(2), start + step * 2),
      setTimeout(() => {
        // Overlay dissolves and the hero emerges in the same moment
        setIsExiting(true);
        root.classList.remove(INTRO_PLAYING_CLASS);
      }, start + reveal),
      setTimeout(() => {
        try {
          sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        } catch {}
        document.body.style.overflow = originalOverflow;
        setActive(false);
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      }, start + reveal + exit),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = originalOverflow;
      root.classList.remove(INTRO_PLAYING_CLASS);
    };
  }, [active]);

  if (!active) return null;

  const current = index >= 0 ? GREETINGS[index] : null;

  return (
    <motion.div
      aria-hidden="true"
      className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-background select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: INTRO_TIMINGS.exit / 1000, ease: DISSOLVE }}
    >
      {/* On reveal the last word softens and drifts slightly toward the
          viewer as the overlay dissolves; no zoom, just depth. */}
      <motion.div
        initial={false}
        animate={
          isExiting
            ? { filter: "blur(8px)", scale: 1.03 }
            : { filter: "blur(0px)", scale: 1 }
        }
        transition={{ duration: INTRO_TIMINGS.exit / 1000, ease: DISSOLVE }}
      >
        <AnimatePresence mode="wait">
          {current && (
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
              stepDuration={0.14}
              easing="easeOut"
              animationFrom={BLUR_FROM}
              animationTo={BLUR_TO}
              className={`text-display text-foreground leading-[1.2] ${current.font}`}
            />
          </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default MultilingualIntro;

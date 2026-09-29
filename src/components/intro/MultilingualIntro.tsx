"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const GREETINGS = [
  { text: "Hello", font: "font-sans" },
  { text: "नमस्ते", font: "font-devanagari" },
  { text: "Hola", font: "font-sans" },
];

const STORAGE_KEY = "sid-intro-seen";

function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("intro") === "true";
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (forced) return true;
    if (seen || prefersReducedMotion) return false;
    return true;
  } catch {
    return false;
  }
}

export function MultilingualIntro() {
  const [active, setActive] = useState(shouldPlayIntro);
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Lock scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 1-1.5s total sequence
    // 0ms: Hello
    // 380ms: नमस्ते
    // 780ms: Hola
    // 1180ms: Exit fade
    // 1420ms: Unmount
    const timers = [
      setTimeout(() => setIndex(1), 380),
      setTimeout(() => setIndex(2), 780),
      setTimeout(() => setIsExiting(true), 1180),
      setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        document.body.style.overflow = originalOverflow;
        setActive(false);
      }, 1420),
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090e] select-none pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex items-center justify-center h-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.text}
            className={`flex items-baseline gap-1 text-display text-foreground ${current.font}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{current.text}</span>
            <span className="text-accent text-h1 font-sans">.</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default MultilingualIntro;

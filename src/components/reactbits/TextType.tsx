"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// ── Tweakables ─────────────────────────────────────────────────────
/** ms per character while typing / deleting */
const TYPE_MS = 58;
const DELETE_MS = 26;
/** Hold a finished line this long before deleting it */
const HOLD_MS = 2400;
/** Beat of silence between lines */
const GAP_MS = 420;
/** Reduced motion: whole lines swap in place, no typing */
const REDUCED_SWAP_MS = 4200;

/**
 * Text Type (after React Bits' text-animations/text-type): types a line,
 * holds it, deletes it, moves to the next. Quiet by design — a thin
 * blinking caret, no colour changes. Runs only while on screen.
 *
 * Screen readers get every line at once (visually hidden); the animated
 * text is aria-hidden so it isn't announced character by character.
 */
export function TextType({
  texts,
  className = "",
  prefix,
}: {
  texts: string[];
  className?: string;
  /** Rendered before the typed text, e.g. a small prompt glyph */
  prefix?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  // Only animate while the line is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: show whole lines, swap occasionally
  useEffect(() => {
    if (!reduce || !visible) return;
    const t = window.setInterval(() => setLine((l) => (l + 1) % texts.length), REDUCED_SWAP_MS);
    return () => window.clearInterval(t);
  }, [reduce, visible, texts.length]);

  useEffect(() => {
    if (reduce || !visible) return;
    const target = texts[line];
    let t: number;
    if (phase === "typing") {
      if (shown.length < target.length) {
        t = window.setTimeout(() => setShown(target.slice(0, shown.length + 1)), TYPE_MS);
      } else {
        t = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
      }
    } else {
      if (shown.length > 0) {
        t = window.setTimeout(() => setShown(shown.slice(0, -1)), DELETE_MS);
      } else {
        t = window.setTimeout(() => {
          setLine((l) => (l + 1) % texts.length);
          setPhase("typing");
        }, GAP_MS);
      }
    }
    return () => window.clearTimeout(t);
  }, [reduce, visible, phase, shown, line, texts]);

  // `visible` starts false on server and client alike, so the first render
  // is empty on both (the reduced-motion preference is only known on the
  // client — using it directly here would be a hydration mismatch).
  const text = reduce && visible ? texts[line] : shown;

  return (
    <span ref={rootRef} className={`inline-flex items-baseline ${className}`}>
      <span className="sr-only">{texts.join(" ")}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {prefix}
        <span className="whitespace-pre">{text}</span>
        <span
          // An empty inline-block sits on the baseline; nudge it down so it
          // spans cap height to descender like a real caret.
          className={`ml-0.75 inline-block h-[1em] w-0.5 translate-y-[0.16em] bg-accent ${
            reduce ? "" : "text-type-caret--blink"
          }`}
        />
      </span>
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { IntroLine } from "./IntroLine";

type Stage = "hello" | "thisIsMe" | "done";

// Tuned to sit inside the brief's target ranges: each stage is a
// ~0.9s reveal, a brief hold, then a ~0.5s recede before the next
// stage begins. Two stages total ≈ 4.2s — short enough that it
// reads as "the site quietly introducing itself," not a loading
// screen anyone has to wait out.
const REVEAL_MS = 900;
const HOLD_MS = 700;
const RECEDE_MS = 500;
const STAGE_MS = REVEAL_MS + HOLD_MS + RECEDE_MS;

const SESSION_KEY = "intro-seen";

export function IntroSequence() {
  // Always starts in the exact same state on both server and
  // client — "hello", not receding. All the real decision-making
  // (skip on repeat visit, skip on reduced motion) happens inside
  // the effect below, which only ever runs on the client, after
  // hydration is already complete. This is deliberate: branching
  // to a different INITIAL state here would reintroduce the same
  // category of hydration mismatch fixed earlier in the Drive
  // section — the fix is to keep the first render identical
  // regardless of environment, and let effects handle the rest.
  const [stage, setStage] = useState<Stage>("hello");
  const [isReceding, setIsReceding] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage can throw in some private-browsing modes —
      // fail safe by just treating it as "not seen yet."
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadySeen || prefersReducedMotion) {
      const skipTimer = setTimeout(() => {
        setStage("done");
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // Non-critical if this fails — worst case, the intro plays
          // again next visit, which is a minor inconvenience, not a bug.
        }
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    const timers = [
      setTimeout(() => setIsReceding(true), REVEAL_MS + HOLD_MS),
      setTimeout(() => {
        setStage("thisIsMe");
        setIsReceding(false);
      }, STAGE_MS),
      setTimeout(() => setIsReceding(true), STAGE_MS + REVEAL_MS + HOLD_MS),
      setTimeout(() => {
        setStage("done");
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // See note above — non-critical.
        }
      }, STAGE_MS * 2),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Prevents scrolling behind the overlay while the intro plays.
  useEffect(() => {
    document.body.style.overflow = stage === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden">
      {stage === "hello" && <IntroLine text="Hello," isReceding={isReceding} />}
      {stage === "thisIsMe" && (
        <IntroLine text="This is me." isReceding={isReceding} />
      )}
    </div>
  );
}

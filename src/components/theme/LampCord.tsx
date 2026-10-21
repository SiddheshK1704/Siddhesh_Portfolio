"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useTheme } from "./useTheme";
import { useThemeFlip } from "./useThemeFlip";

// ── Tweakables ─────────────────────────────────────────────────────
/** Tooltip shown beside the handle on hover / keyboard focus. */
export const CORD_HINT = "Give it a tug";
/** How far the handle travels when pulled (px). */
const PULL_DEPTH = 18;
/** Delay between the tug and the theme sweep starting (ms). */
const SWEEP_LEAD = 170;
// Chain length, hover stretch and idle sway live in globals.css (.lamp-cord).

/**
 * Lamp pull cord: a beaded chain hanging from the top of the viewport.
 * Tugging it toggles the theme with the shared sweep (useThemeFlip).
 */
export function LampCord() {
  const theme = useTheme();
  const flip = useThemeFlip();
  const reduceMotion = useReducedMotion();
  // Extra chain length while pulled; drives the --pull CSS variable.
  const pull = useMotionValue(0);

  const tug = () => {
    if (reduceMotion) {
      flip();
      return;
    }
    animate(pull, PULL_DEPTH, { type: "spring", stiffness: 900, damping: 30 }).then(() =>
      animate(pull, 0, { type: "spring", stiffness: 520, damping: 11 })
    );
    flip(SWEEP_LEAD);
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="lamp-cord">
      <span className="lamp-cord__mount" aria-hidden="true" />
      <motion.button
        type="button"
        aria-label={label}
        onClick={tug}
        style={{ "--pull": pull } as Record<string, unknown>}
        className="lamp-cord__btn"
      >
        <span className="lamp-cord__chain" aria-hidden="true" />
        <span className="lamp-cord__handle" aria-hidden="true" />
        <span className="lamp-cord__hint" aria-hidden="true">
          {CORD_HINT}
        </span>
      </motion.button>
    </div>
  );
}

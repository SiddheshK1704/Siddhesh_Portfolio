"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { setTheme, useTheme } from "@/components/theme/useTheme";
import type { Theme } from "@/components/theme/themeScript";

// ── Tweakables ─────────────────────────────────────────────────────
/** Duration of the S-shaped light sweep across the viewport (ms). */
const SWEEP_DURATION = 900;
/** Bulge of the S-curve, as a fraction of viewport width. */
const SWEEP_CURVE = 0.22;
/** Easing of the sweep (smooth ease-in-out). */
const SWEEP_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
/** Pause between the lever flipping and the light sweeping in (ms). */
const FLIP_LEAD = 160;
/** Lever travel from centre (px): up = on (light), down = off (dark). */
const LEVER_TRAVEL = 3.5;
/** Short, stiff, near-critically damped: a physical click, not a bounce. */
const LEVER_SPRING = { type: "spring", stiffness: 700, damping: 34, mass: 0.6 } as const;

/**
 * The region covered by the new theme: everything right of an S-shaped
 * boundary centred at x = `b`. Keyframes differ only in `b`, so both use
 * identical path commands and interpolate cleanly.
 */
function sweepPath(b: number, k: number, w: number, h: number) {
  const right = w + 2 * k + 4;
  const mid = h / 2;
  return `path('M ${right} 0 L ${b + k} 0 C ${b + k} ${mid}, ${b - k} ${mid}, ${b - k} ${h} L ${right} ${h} Z')`;
}

/**
 * Miniature wall light switch. Flipping it sweeps the new theme across
 * the page from the switch's side, behind an S-shaped edge.
 */
export function LightSwitch({ className }: { className?: string }) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  // The lever moves immediately; the theme follows after FLIP_LEAD.
  const [pending, setPending] = useState<Theme | null>(null);
  const busy = useRef(false);

  const lever = pending ?? theme;
  const on = lever === "light";

  const flip = () => {
    if (busy.current) return;
    const next: Theme = theme === "dark" ? "light" : "dark";

    const instant =
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (instant) {
      setTheme(next);
      return;
    }

    busy.current = true;
    setPending(next);

    window.setTimeout(() => {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
          setPending(null);
        });
      });

      transition.ready
        .then(() => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const k = w * SWEEP_CURVE;
          document.documentElement.animate(
            {
              clipPath: [
                // Boundary fully off the right edge → fully off the left edge
                sweepPath(w + k + 2, k, w, h),
                sweepPath(-k - 2, k, w, h),
              ],
            },
            {
              duration: SWEEP_DURATION,
              easing: SWEEP_EASING,
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});

      transition.finished.finally(() => {
        busy.current = false;
      });
    }, FLIP_LEAD);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Lights"
      title={on ? "Lights off" : "Lights on"}
      onClick={flip}
      className={cn("lswitch", className)}
    >
      <span className="lswitch__screw" aria-hidden="true" />
      <span className="lswitch__slot" aria-hidden="true">
        <motion.span
          className="lswitch__lever"
          initial={false}
          animate={{ y: on ? -LEVER_TRAVEL : LEVER_TRAVEL }}
          transition={reduceMotion ? { duration: 0 } : LEVER_SPRING}
        />
      </span>
      <span className="lswitch__screw" aria-hidden="true" />
    </button>
  );
}

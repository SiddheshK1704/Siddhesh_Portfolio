"use client";

import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { setTheme } from "./useTheme";
import type { Theme } from "./themeScript";

// ── Tweakables ─────────────────────────────────────────────────────
/** Duration of the S-shaped light sweep across the viewport (ms). */
const SWEEP_DURATION = 900;
/** Bulge of the S-curve, as a fraction of viewport width. */
const SWEEP_CURVE = 0.22;
/** Easing of the sweep (smooth ease-in-out). */
const SWEEP_EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Window event fired every time the theme trigger is pulled. */
export const THEME_PULLED_EVENT = "theme-pulled";

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
 * Returns `flip(lead)`: toggles the theme, sweeping the new one across the
 * page from the right edge behind an S-shaped boundary. `lead` (ms) delays
 * the sweep so the trigger's own animation reads first. Instant when View
 * Transitions are unsupported or the user prefers reduced motion.
 */
export function useThemeFlip() {
  const busy = useRef(false);

  return useCallback((lead = 0) => {
    if (busy.current) return;
    window.dispatchEvent(new CustomEvent(THEME_PULLED_EVENT));

    // Read the authoritative state (the DOM), not a possibly stale render.
    const current: Theme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next: Theme = current === "dark" ? "light" : "dark";

    const instant =
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (instant) {
      flushSync(() => setTheme(next));
      return;
    }

    busy.current = true;

    window.setTimeout(() => {
      // The callback applies the new theme synchronously so the new
      // snapshot is final.
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next));
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
              // Hold the fully-revealed frame until the transition tears
              // down, so there is never a gap between end and teardown.
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});

      transition.finished.finally(() => {
        busy.current = false;
      });
    }, lead);
  }, []);
}

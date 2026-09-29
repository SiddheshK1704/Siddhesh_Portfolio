"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
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
// Lever travel and its spring-like easing live in globals.css
// (.lswitch__lever), because the lever is positioned by CSS from
// <html data-theme>: correct on the very first paint, even in light mode.

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
  // Set while the lever has flipped but the sweep hasn't run yet.
  const [pending, setPending] = useState<Theme | null>(null);
  const busy = useRef(false);

  const on = (pending ?? theme) === "light";

  const flip = () => {
    if (busy.current) return;
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
    setPending(next);

    window.setTimeout(() => {
      // Old snapshot = current page (lever already flipped). The callback
      // applies the new theme synchronously so the new snapshot is final.
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
    }, FLIP_LEAD);
  };

  return (
    <div className={`lswitch-wrap ${className ?? ""}`}>
      {/* Prompt beside the switch; appears on hover / keyboard focus */}
      <span className="lswitch-hint" aria-hidden="true">
        Flip the switch!
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Lights"
        title={on ? "Lights off" : "Lights on"}
        onClick={flip}
        data-pending={pending ?? undefined}
        className="lswitch"
      >
        <span className="lswitch__screw" aria-hidden="true" />
        <span className="lswitch__slot" aria-hidden="true">
          <span className="lswitch__lever" />
        </span>
        <span className="lswitch__screw" aria-hidden="true" />
      </button>
    </div>
  );
}

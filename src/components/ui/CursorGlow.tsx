"use client";

import { useEffect, useRef } from "react";

/**
 * A soft radial glow that follows the cursor within its parent
 * section. Renders as an absolutely-positioned, non-interactive
 * overlay — drop it inside any `relative` container.
 *
 * Performance note: position updates go straight to the DOM via
 * `style.setProperty` on a ref, NOT React state. Mouse move fires
 * dozens of times per second — running that through React's render
 * cycle would be wasteful; a direct style mutation is instant and
 * skips re-rendering the component entirely.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow absolute inset-0 pointer-events-none"
    />
  );
}

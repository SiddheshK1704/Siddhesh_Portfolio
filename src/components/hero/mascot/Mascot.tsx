"use client";

import { useEffect, type Ref } from "react";
import { preload } from "react-dom";
import { MASCOT_SHEET, NUDGE, framePosition, type MascotFrame } from "./frames";

/** Sprite box relative to the circle it sits in (bust overflows a bit). */
export const MASCOT_SCALE = 1.04;

/**
 * One frame of the sprite sheet, drawn as a background so switching
 * frames is just a background-position change (no image swaps, no
 * flicker once the sheet is loaded).
 */
export function Mascot({
  frame,
  size,
  className,
  ref,
}: {
  frame: MascotFrame;
  size: number;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  // <link rel="preload"> in the document head, plus an early decode.
  preload(MASCOT_SHEET, { as: "image", fetchPriority: "low" });
  useEffect(() => {
    const img = new Image();
    img.src = MASCOT_SHEET;
    img.decode?.().catch(() => {});
  }, []);

  const n = NUDGE[frame];
  return (
    <div
      ref={ref}
      role="img"
      aria-label="Siddhesh's mascot"
      data-frame={frame}
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${MASCOT_SHEET})`,
        backgroundSize: "300% 300%",
        backgroundPosition: framePosition(frame),
        backgroundRepeat: "no-repeat",
        transform: `translate(${n.x}%, ${n.y}%) scale(${n.scale})`,
        transformOrigin: "50% 100%",
      }}
    />
  );
}

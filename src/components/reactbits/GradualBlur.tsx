import type { CSSProperties } from "react";

/**
 * Gradual Blur — adapted from React Bits
 * (reactbits.dev/animations/gradual-blur).
 *
 * A stack of backdrop-filter layers whose blur doubles at each step. Each
 * layer is masked to its own overlapping band, so the blur builds
 * smoothly from nothing to `strength` toward the chosen edge instead of
 * ending in one hard-edged frosted strip. Pure CSS: no JS, no re-renders.
 *
 * Trimmed to what this site needs (bottom/top edge, fixed layer count);
 * positioning, height and opacity come from the caller via className/style.
 */
export default function GradualBlur({
  position = "bottom",
  layers = 5,
  strength = 6,
  className = "",
  style,
}: {
  position?: "bottom" | "top";
  /** Number of stacked blur layers (more = smoother ramp) */
  layers?: number;
  /** Blur (px) of the strongest layer, at the very edge */
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const direction = position === "bottom" ? "to bottom" : "to top";
  const step = 100 / layers;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none isolate ${className}`}
      style={style}
    >
      {Array.from({ length: layers }, (_, i) => {
        // Exponential ramp: the last layer reaches `strength`
        const blur = strength / 2 ** (layers - 1 - i);
        // Each band fades in, holds, and fades out, overlapping neighbors
        const p1 = Math.round(step * i);
        const p2 = Math.round(step * (i + 1));
        const p3 = Math.round(step * (i + 2));
        const p4 = Math.round(step * (i + 3));
        const mask =
          i === layers - 1
            ? `linear-gradient(${direction}, transparent ${p1}%, #000 ${p2}%)`
            : `linear-gradient(${direction}, transparent ${p1}%, #000 ${p2}%, #000 ${Math.min(p3, 100)}%, transparent ${Math.min(p4, 100)}%)`;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur.toFixed(3)}px)`,
              WebkitBackdropFilter: `blur(${blur.toFixed(3)}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

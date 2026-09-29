/**
 * Ambient atmosphere: a dark room with cool light slowly moving through it.
 * Static base + two huge, very soft light fields drifting on 2–3 minute
 * loops + vignette. The grain overlay lives in layout.tsx. Pure CSS
 * (transform-only animation, no filters), paused for prefers-reduced-motion.
 * See "Ambient atmosphere" in globals.css.
 */
export function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="ambient-room" />
      <div className="ambient-light ambient-light--key" />
      <div className="ambient-light ambient-light--fill" />
      <div className="ambient-vignette" />
    </div>
  );
}

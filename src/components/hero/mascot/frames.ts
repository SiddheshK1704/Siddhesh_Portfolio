/**
 * Mascot sprite sheet: public/mascots/me-sheet-transparent.webp, an even
 * 3×3 grid read left-to-right, top-to-bottom (row = floor(i / 3),
 * col = i % 3). It is repacked from the hand-made source art so every
 * cell is the same size, figures are bottom-aligned and heads centred
 * (scripts/repack-mascot-sheet.py, from reference/me-sheet.png).
 */
export const MASCOT_SHEET = "/mascots/me-sheet-transparent.webp";

export const FRAMES = {
  idle: 0,
  "look-left": 1,
  "look-right": 2,
  "look-up": 3,
  "look-down": 4,
  wink: 5,
  surprised: 6,
  wave: 7,
  peek: 8,
} as const;

export type MascotFrame = keyof typeof FRAMES;

/**
 * Per-frame nudge so the head doesn't visibly jump between frames.
 * x / y in % of the sprite box, scale around the bottom centre. Measured
 * from each frame's hair line against idle (the repack already centres
 * heads horizontally) by overlaying every frame on idle.
 */
export const NUDGE: Record<MascotFrame, { x: number; y: number; scale: number }> = {
  idle: { x: 0, y: 0, scale: 1 },
  "look-left": { x: 0, y: 0, scale: 1 },
  "look-right": { x: 0, y: -1.4, scale: 1 },
  "look-up": { x: 0, y: -5.5, scale: 1 },
  "look-down": { x: 0, y: -4.3, scale: 1 },
  wink: { x: 0, y: -4.1, scale: 1 },
  surprised: { x: 0, y: -0.9, scale: 1 },
  wave: { x: 0, y: 0, scale: 1 },
  peek: { x: 1.1, y: -2, scale: 1 },
};

/** How far the bust sinks below the circle's bottom edge (fraction of
 *  the sprite box), so upward nudges never open a gap under it. */
export const MASCOT_SINK = 0.06;

/** One-shot reaction lengths (ms). */
export const ONE_SHOT_MS = {
  wave: 1400,
  wink: 450,
  surprised: 700,
} as const;

/** Background position of a frame's cell (0% / 50% / 100%). */
export function framePosition(frame: MascotFrame) {
  const i = FRAMES[frame];
  return `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`;
}

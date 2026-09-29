import { motionValue } from "motion/react";

/**
 * Shared geometry for the hero → navbar identity hand-off.
 *
 * The Hero measures how far the page must scroll for its "Siddhesh"
 * wordmark to reach the navbar's "SID." brand and publishes that distance
 * here. Hero and Navbar then both derive their state directly from
 * scrollY / identityEnd, so the wordmark shrinking into place and the
 * navbar appearing are one scrubbed movement, not two timed fades.
 *
 * Deriving from scrollY in both places (rather than chaining one derived
 * value off another) keeps them in lockstep even on instant scroll jumps.
 *
 * 0 means "no hero on this page": the Navbar falls back to a plain scroll
 * threshold (e.g. /work/[slug]).
 */
export const identityEnd = motionValue(0);

/** Progress at which the hero word has fully docked onto the navbar brand
 *  (final size and position); it holds there until the crossfade ends. */
export const DOCK_AT = 0.82;
/** Progress window in which the docked word and navbar brand crossfade. */
export const HANDOFF_START = 0.85;
/** Progress at which the navbar surface begins fading in. */
export const NAV_SURFACE_START = 0.6;

export const NAV_BRAND_ID = "nav-brand-mark";

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Maps progress p through [start, end] → [0, 1], clamped. */
export const ramp = (p: number, start: number, end = 1) =>
  clamp01((p - start) / (end - start));

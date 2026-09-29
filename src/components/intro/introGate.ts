// Shared by the server layout (inline script) and client components, so
// this module must not be marked "use client".

export const INTRO_STORAGE_KEY = "sid-intro-seen";

/**
 * Intro timeline (ms from start). Each greeting gets ~0.5s on screen;
 * "Hola" then holds for a breath before the overlay dissolves while the
 * hero emerges underneath.
 *
 *   0     Hello      blurs in
 *   560   नमस्ते      (previous word blurs out ~150ms, next blurs in ~280ms)
 *   1120  Hola
 *   ~1550 Hola fully resolved — breathing room
 *   2000  REVEAL: overlay dissolves, hero emerges (simultaneously)
 *   2600  intro unmounted
 */
export const INTRO_TIMINGS = {
  step: 560,
  reveal: 2000,
  exit: 600,
} as const;

/** Seconds until the hero starts emerging (used to time entrances). */
export const INTRO_DURATION = INTRO_TIMINGS.reveal / 1000;

/** Class on <html> while the intro covers the page; hides the hero. */
export const INTRO_PLAYING_CLASS = "intro-playing";

/** Window event fired once the intro has fully cleared. */
export const INTRO_DONE_EVENT = "sid:intro-done";

export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("intro") === "true";
    const seen = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (forced) return true;
    if (seen || prefersReducedMotion) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Runs before first paint (inlined in layout.tsx). Mirrors
 * shouldPlayIntro(): if the intro is skipped it hides the server-rendered
 * overlay (`intro-skip`); if it plays it marks <html> `intro-playing` so
 * the hero starts in its pre-reveal state. Server and client markup stay
 * identical and nothing flashes.
 */
export const INTRO_GATE_SCRIPT = `try{var q=new URLSearchParams(location.search).get('intro')==='true';var s=sessionStorage.getItem('${INTRO_STORAGE_KEY}')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.classList.add(!q&&(s||r)?'intro-skip':'${INTRO_PLAYING_CLASS}')}catch(e){document.documentElement.classList.add('intro-skip')}`;

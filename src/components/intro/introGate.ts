// Shared by the server layout (inline script) and client components, so
// this module must not be marked "use client".

export const INTRO_STORAGE_KEY = "sid-intro-seen";

/** Seconds until the intro overlay has cleared (used to delay entrances). */
export const INTRO_DURATION = 1.9;

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
 * Runs before first paint (inlined in layout.tsx). If the intro should not
 * play, it hides the server-rendered overlay via a class on <html>, so the
 * server and client markup stay identical and nothing flashes.
 * Mirrors shouldPlayIntro().
 */
export const INTRO_GATE_SCRIPT = `try{var q=new URLSearchParams(location.search).get('intro')==='true';var s=sessionStorage.getItem('${INTRO_STORAGE_KEY}')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!q&&(s||r))document.documentElement.classList.add('intro-skip')}catch(e){document.documentElement.classList.add('intro-skip')}`;

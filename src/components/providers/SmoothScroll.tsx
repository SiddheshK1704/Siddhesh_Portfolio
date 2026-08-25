"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

// Height of the floating navbar (approx), so scrolled-to sections
// don't end up hidden underneath it.
const SCROLL_OFFSET = -96;

/**
 * Intercepts clicks on same-page anchor links (href="#work" etc.)
 * and scrolls to them through Lenis instead of the browser's
 * instant jump, so in-page navigation is smooth too.
 * Must be rendered INSIDE <ReactLenis> to access the instance
 * via context.
 */
function SmoothAnchorLinks() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      event.preventDefault();
      lenis!.scrollTo(el as HTMLElement, {
        offset: SCROLL_OFFSET,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      });
    }

    document.addEventListener("click", handleClick, true); // capture phase
    return () => document.removeEventListener("click", handleClick, true);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // lerp alone gives continuous, buttery wheel/touch scrolling.
        // Deliberately NOT setting `duration`/`easing` here — Lenis
        // treats those as a signal to animate each wheel event as its
        // own timed tween, which restarts constantly on a trackpad and
        // is exactly what produced the jumpy, interrupted feeling.
        // duration/easing are used below only for the one-off
        // "jump to this section" animation on anchor clicks.
        lerp: 0.1,
        smoothWheel: true,
        // Lenis has this on by default, but being explicit: it
        // automatically falls back to near-native scrolling for users
        // with prefers-reduced-motion enabled at the OS level.
        respectReducedMotion: true,
      }}
    >
      <SmoothAnchorLinks />
      {children}
    </ReactLenis>
  );
}

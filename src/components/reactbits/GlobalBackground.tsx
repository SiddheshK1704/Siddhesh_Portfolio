"use client";

import { useSyncExternalStore } from "react";
import Ferrofluid from "./Ferrofluid";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function GlobalBackground() {
  const mounted = useIsMounted();
  const reducedMotion = usePrefersReducedMotion();

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <Ferrofluid
        colors={["#0a1329", "#112554", "#1e40af", "#2563eb", "#38bdf8"]}
        speed={reducedMotion ? 0 : 0.35}
        paused={reducedMotion}
        scale={1.4}
        turbulence={0.6}
        fluidity={0.7}
        rimWidth={0.65}
        sharpness={1.3}
        shimmer={0.4}
        glow={1.5}
        opacity={0.8}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.25}
        mouseInteraction={!reducedMotion}
        mouseStrength={0.6}
        className="w-full h-full"
      />
    </div>
  );
}

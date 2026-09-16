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
        colors={["#0b1220", "#111f38", "#1d4ed8", "#2563eb", "#38bdf8"]}
        speed={reducedMotion ? 0 : 0.35}
        paused={reducedMotion}
        scale={1.4}
        turbulence={0.6}
        fluidity={0.7}
        glow={2.2}
        opacity={0.65}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.25}
        mouseInteraction={!reducedMotion}
        mouseStrength={0.5}
        className="w-full h-full"
      />
    </div>
  );
}

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
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-background pointer-events-none"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-opacity duration-1000"
    >
      <Ferrofluid
        colors={["#080a12", "#0c142b", "#142852", "#3355ff"]}
        speed={reducedMotion ? 0 : 0.6}
        paused={reducedMotion}
        scale={1.3}
        turbulence={0.7}
        fluidity={0.8}
        opacity={0.32}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 1.25}
        mouseInteraction={!reducedMotion}
        mouseStrength={0.5}
        className="w-full h-full opacity-60"
      />
    </div>
  );
}

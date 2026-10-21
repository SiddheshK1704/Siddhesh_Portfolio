"use client";

import { useRef } from "react";
import { useHeroCircle } from "../HeroCircle";
import { Mascot, MASCOT_SCALE } from "./Mascot";
import { MASCOT_SINK } from "./frames";
import { useMascotState } from "./useMascotState";

/** The mascot as a bust inside the hero circle, reacting to its state. */
export function HeroMascot() {
  const { size } = useHeroCircle();
  const ref = useRef<HTMLDivElement>(null);
  const frame = useMascotState(ref);
  const box = Math.round(size * MASCOT_SCALE);

  return (
    <span className="absolute left-1/2 -translate-x-1/2" style={{ bottom: -box * MASCOT_SINK }}>
      <Mascot ref={ref} frame={frame} size={box} />
    </span>
  );
}

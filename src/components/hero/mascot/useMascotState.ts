"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useHeroCircle } from "../HeroCircle";
import { THEME_PULLED_EVENT } from "@/components/theme/useThemeFlip";
import { ONE_SHOT_MS, type MascotFrame } from "./frames";

// ── Tweakables ─────────────────────────────────────────────────────
/** Cursor closer than this to the mascot's centre → idle (px). */
const DEAD_ZONE = 80;
/** Half-width of the left / right look cones (degrees). Cursor above or
 *  below the mascot, outside both cones, leaves it idle. */
const LOOK_CONE = 60;
/** Extra degrees the current look direction keeps beyond its cone. */
const HYSTERESIS = 10;
/** Random wink interval while idle (ms), around 8s. */
const WINK_MIN = 7000;
const WINK_MAX = 9000;
/** Chance that hovering a hero CTA startles the mascot (else no reaction). */
const CTA_SURPRISE_CHANCE = 0.25;

// Tracking only looks sideways; look-up / look-down cells go unused.
type Look = "look-left" | "look-right";
type OneShot = "wave" | "wink" | "surprised";

/** Sector centres in screen angles (atan2 with y pointing down). */
const LOOK_ANGLES: Record<Look, number> = {
  "look-right": 0,
  "look-left": 180,
};

const angleDiff = (a: number, b: number) => Math.abs(((a - b + 540) % 360) - 180);

/** Picks the look for an angle (null = idle), keeping `current` near
 *  its cone's edge so it doesn't flicker. */
function lookFor(angle: number, current: Look | null): Look | null {
  if (current && angleDiff(angle, LOOK_ANGLES[current]) <= LOOK_CONE + HYSTERESIS) return current;
  for (const look of Object.keys(LOOK_ANGLES) as Look[]) {
    if (angleDiff(angle, LOOK_ANGLES[look]) <= LOOK_CONE) return look;
  }
  return null;
}

/**
 * The mascot's frame, from a tiny state machine. Priority:
 * peek (circle moving) > one-shot reaction > cursor tracking > idle.
 */
export function useMascotState(mascotRef: RefObject<HTMLElement | null>): MascotFrame {
  const { phase, subscribe } = useHeroCircle();
  const reduceMotion = useReducedMotion();
  const [oneShot, setOneShot] = useState<OneShot | null>(null);
  const [look, setLook] = useState<Look | null>(null);
  const shotTimer = useRef<number | undefined>(undefined);
  const phaseRef = useRef(phase);
  const reduceRef = useRef(reduceMotion);
  useEffect(() => {
    phaseRef.current = phase;
    reduceRef.current = reduceMotion;
  });

  const fire = useCallback((shot: OneShot) => {
    window.clearTimeout(shotTimer.current);
    setOneShot(shot);
    shotTimer.current = window.setTimeout(() => setOneShot(null), ONE_SHOT_MS[shot]);
  }, []);

  const open = phase === "open";

  useEffect(() => () => window.clearTimeout(shotTimer.current), []);

  // Circle events: greet once it has dropped; surprised when poked.
  useEffect(
    () =>
      subscribe((event) => {
        if (event === "opened" && !reduceRef.current) fire("wave");
        if (event === "poked") fire("surprised");
      }),
    [subscribe, fire]
  );

  // The lamp cord was pulled while the circle is out.
  useEffect(() => {
    const onPulled = () => {
      if (phaseRef.current === "open" || phaseRef.current === "opening") fire("surprised");
    };
    window.addEventListener(THEME_PULLED_EVENT, onPulled);
    return () => window.removeEventListener(THEME_PULLED_EVENT, onPulled);
  }, [fire]);

  // Hovering a hero CTA sometimes startles him (one delegated listener).
  useEffect(() => {
    if (!open || reduceMotion) return;
    const onOver = (e: MouseEvent) => {
      const cta = (e.target as Element | null)?.closest?.("[data-mascot-react]");
      if (!cta || cta.contains(e.relatedTarget as Node | null)) return;
      if (Math.random() < CTA_SURPRISE_CHANCE) fire("surprised");
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, [open, reduceMotion, fire]);

  // Cursor tracking: only while open, with a fine pointer, tab visible.
  useEffect(() => {
    if (!open || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let last: { x: number; y: number; onCta: boolean } | null = null;
    let current: Look | null = null;

    const update = () => {
      raf = 0;
      const el = mascotRef.current;
      if (!el || !last) return;
      const r = el.getBoundingClientRect();
      const dx = last.x - (r.left + r.width / 2);
      const dy = last.y - (r.top + r.height / 2);
      // Idle near the mascot and while a hero CTA is hovered.
      current =
        last.onCta || Math.hypot(dx, dy) < DEAD_ZONE
          ? null
          : lookFor((Math.atan2(dy, dx) * 180) / Math.PI, current);
      setLook(current);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const onCta = !!(e.target as Element | null)?.closest?.("[data-mascot-react]");
      last = { x: e.clientX, y: e.clientY, onCta };
      if (!raf) raf = requestAnimationFrame(update);
    };
    const attach = () => window.addEventListener("pointermove", onMove, { passive: true });
    const detach = () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? detach() : attach());

    attach();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      detach();
      document.removeEventListener("visibilitychange", onVisibility);
      setLook(null);
    };
  }, [open, mascotRef]);

  const idle = open && !oneShot && !look;

  // Random wink every ~8s (7–9s) while idle and open.
  useEffect(() => {
    if (!idle || reduceMotion) return;
    const t = window.setTimeout(() => fire("wink"), WINK_MIN + Math.random() * (WINK_MAX - WINK_MIN));
    return () => window.clearTimeout(t);
  }, [idle, reduceMotion, fire]);

  if ((phase === "opening" || phase === "closing") && !reduceMotion) return "peek";
  // Reactions and tracking only show while the circle is fully out.
  if (open && oneShot) return oneShot;
  if (open && look) return look;
  return "idle";
}

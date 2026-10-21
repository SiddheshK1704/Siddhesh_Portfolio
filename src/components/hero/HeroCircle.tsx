"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";

// ── Tweakables ─────────────────────────────────────────────────────
/** Circle geometry per layout (px). `scale` is the resting dome size
 *  relative to the open circle; `peek` how much of the dome shows. */
const GEOMETRY = {
  desktop: { size: 176, top: 36, scale: 2.4, peek: 28 },
  mobile: { size: 112, top: 4, scale: 2.3, peek: 20 },
} as const;
/** Height of the hover / tap zone along the hero's top edge at rest. */
const REST_ZONE = 64;
/** How long the circle stays out after the cursor leaves it (ms). */
const CLOSE_DELAY = 5000;
const DROP_SPRING = { type: "spring", stiffness: 420, damping: 32 } as const;
const DESKTOP_QUERY = "(min-width: 1024px)";

export type CirclePhase = "closed" | "opening" | "open" | "closing";
/** "opened": the drop just finished. "poked": the open circle was clicked. */
export type CircleEvent = "opened" | "poked";
type CircleListener = (event: CircleEvent) => void;

type HeroCircleState = {
  phase: CirclePhase;
  /** Increments each time the circle finishes opening. */
  openedTick: number;
  /** Increments each time the open circle itself is clicked / tapped. */
  pokedTick: number;
  /** Diameter of the open circle (px), for sizing its contents. */
  size: number;
  /** Listen for circle events; returns an unsubscribe function. */
  subscribe: (listener: CircleListener) => () => void;
};

const HeroCircleContext = createContext<HeroCircleState>({
  phase: "closed",
  openedTick: 0,
  pokedTick: 0,
  size: GEOMETRY.desktop.size,
  subscribe: () => () => {},
});

/** Open/closed state of the hero circle, for whatever sits inside it. */
export const useHeroCircle = () => useContext(HeroCircleContext);

function subscribeDesktop(cb: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * A blue circle hidden behind the hero's top edge: only the bottom of a
 * large dome peeks in. Hovering it (tapping on touch, Enter/Space on the
 * keyboard) shrinks the dome into a small circle that drops into view,
 * revealing `children` inside like a bust. It lives in the hero's flow
 * (absolute, clipped by the section), so it scrolls away with the hero.
 */
export function HeroCircle({
  children,
  delay = 0,
}: {
  children?: ReactNode;
  /** Seconds before the resting dome fades in (after the intro). */
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  // Server: null, so nothing renders until the layout is known on the
  // client (the circle is absolute, so mounting late shifts nothing).
  const desktop = useSyncExternalStore<boolean | null>(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => null
  );

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<CirclePhase>("closed");
  const [openedTick, setOpenedTick] = useState(0);
  const [pokedTick, setPokedTick] = useState(0);
  const zoneRef = useRef<HTMLButtonElement>(null);
  const lastPointer = useRef<string>("mouse");
  const listeners = useRef(new Set<CircleListener>());
  const emit = (event: CircleEvent) => listeners.current.forEach((l) => l(event));
  const subscribe = useCallback((listener: CircleListener) => {
    const set = listeners.current;
    set.add(listener);
    return () => {
      set.delete(listener);
    };
  }, []);

  const g = desktop ? GEOMETRY.desktop : GEOMETRY.mobile;
  const domeWidth = g.size * g.scale;
  // Resting y that leaves exactly `peek` px of the scaled dome visible.
  const restY = g.peek - g.top - g.size / 2 - (g.scale * g.size) / 2;

  const openRef = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const show = useCallback((next: boolean) => {
    window.clearTimeout(closeTimer.current);
    if (openRef.current === next) return;
    openRef.current = next;
    setOpen(next);
    setPhase(next ? "opening" : "closing");
  }, []);

  // Mouse leaving: linger for CLOSE_DELAY, unless it comes back.
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => show(false), CLOSE_DELAY);
  }, [show]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Touch: a tap anywhere outside the zone closes the open circle.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (!zoneRef.current?.contains(e.target as Node)) show(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, show]);

  if (desktop === null) return null;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Keyboard activation (Enter / Space) toggles.
    if (e.detail === 0) {
      show(!open);
      return;
    }
    if (!open) {
      show(true);
      return;
    }
    // Open: a click on the circle itself is a poke; on touch, a tap on
    // the zone around it closes.
    const r = zoneRef.current!.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + g.top + g.size / 2);
    if (Math.hypot(dx, dy) <= g.size / 2) {
      setPokedTick((t) => t + 1);
      emit("poked");
    }
    else if (lastPointer.current !== "mouse") show(false);
  };

  const transition = reduceMotion ? { duration: 0 } : DROP_SPRING;

  return (
    <HeroCircleContext.Provider value={{ phase, openedTick, pokedTick, size: g.size, subscribe }}>
      <div className="absolute inset-x-0 top-0 z-[2] px-6 lg:px-16 pointer-events-none">
        <div className="relative max-w-6xl mx-auto">
          <motion.button
            ref={zoneRef}
            type="button"
            aria-expanded={open}
            aria-label={open ? "Hide the mascot" : "Peek at the mascot"}
            onPointerDown={(e) => (lastPointer.current = e.pointerType)}
            onPointerEnter={(e) => e.pointerType === "mouse" && show(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
            onClick={onClick}
            onKeyDown={(e) => e.key === "Escape" && show(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay }}
            className="hero-circle absolute top-0 -translate-x-1/2 pointer-events-auto rounded-b-[var(--radius-md)] focus-visible:outline-offset-[-2px]"
            style={{
              left: desktop ? "33%" : "58%",
              width: domeWidth,
              height: open ? g.top + g.size + 12 : REST_ZONE,
            }}
          >
            {/* The blue disc: the only scaled layer */}
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 rounded-full bg-accent"
              style={{ width: g.size, height: g.size, top: g.top, marginLeft: -g.size / 2 }}
              initial={false}
              animate={open ? { y: 0, scale: 1 } : { y: restY, scale: g.scale }}
              transition={transition}
              onAnimationComplete={() => {
                if (open) {
                  setPhase("open");
                  setOpenedTick((t) => t + 1);
                  emit("opened");
                } else {
                  setPhase("closed");
                }
              }}
            />
            {/* Contents ride the same drop but are never scaled; they fade
                in as the circle opens. */}
            <motion.span
              className="absolute left-1/2 block rounded-full overflow-hidden"
              style={{ width: g.size, height: g.size, top: g.top, marginLeft: -g.size / 2 }}
              initial={false}
              animate={
                open
                  ? { y: 0, opacity: 1, transition: { y: transition, opacity: { duration: reduceMotion ? 0 : 0.22, delay: reduceMotion ? 0 : 0.06 } } }
                  : { y: restY, opacity: 0, transition: { y: transition, opacity: { duration: reduceMotion ? 0 : 0.2 } } }
              }
            >
              {children}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </HeroCircleContext.Provider>
  );
}

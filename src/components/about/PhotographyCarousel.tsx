"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { AboutImage } from "@/data/about";

// ── Tweakables ─────────────────────────────────────────────────────
/** How far a flick carries (velocity × this, in seconds). */
const MOMENTUM = 0.22;
/** Neighbours: slightly smaller and dimmer than the active photo. */
const NEIGHBOUR_SCALE = 0.92;
const NEIGHBOUR_OPACITY = 0.7;
const SETTLE = { type: "spring", stiffness: 240, damping: 34, mass: 0.9 } as const;

/**
 * Cinematic, drag-to-browse photo strip. Every slide shares one height
 * and takes its width from its own aspect ratio, so nothing is cropped.
 * Drag (mouse) or swipe (touch); on release, the velocity is projected
 * forward and the strip settles on the nearest photo — momentum without
 * free-scrolling past the ends. Click a neighbour to bring it in; arrow
 * keys work when focused. No autoplay.
 */
export function PhotographyCarousel({ photos }: { photos: AboutImage[] }) {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [targets, setTargets] = useState<number[]>([]);
  const dragged = useRef(false);
  const indexRef = useRef(0);

  // x that centres each slide in the viewport
  const measure = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const t = slideRefs.current.map((el) =>
      el ? vp.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2) : 0
    );
    setTargets(t);
    x.set(t[indexRef.current] ?? 0);
  }, [x]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(photos.length - 1, i));
      indexRef.current = next;
      setIndex(next);
      if (targets[next] !== undefined) {
        animate(x, targets[next], reduce ? { duration: 0 } : SETTLE);
      }
    },
    [photos.length, targets, x, reduce]
  );

  const nearest = (pos: number) =>
    targets.reduce((best, t, i) => (Math.abs(t - pos) < Math.abs(targets[best] - pos) ? i : best), 0);

  const n = photos.length;
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photography"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
        }}
      >
        <motion.ul
          className="flex w-max items-center gap-5 sm:gap-8 touch-pan-y"
          style={{ x }}
          drag={targets.length ? "x" : false}
          dragConstraints={{ left: targets[n - 1] ?? 0, right: targets[0] ?? 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => { dragged.current = true; }}
          onDragEnd={(_, info) => {
            goTo(nearest(x.get() + info.velocity.x * MOMENTUM));
            // Let the click that ends a drag be ignored
            window.setTimeout(() => { dragged.current = false; }, 0);
          }}
        >
          {photos.map((p, i) => {
            const active = i === index;
            return (
              <motion.li
                key={p.src}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="photo-slide relative shrink-0 overflow-hidden rounded-[4px] bg-surface"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
                aria-roledescription="slide"
                aria-label={`Photo ${i + 1} of ${n}`}
                aria-current={active ? "true" : undefined}
                initial={false}
                animate={{ scale: active ? 1 : NEIGHBOUR_SCALE, opacity: active ? 1 : NEIGHBOUR_OPACITY }}
                transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { if (!dragged.current && !active) goTo(i); }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 480px, 80vw"
                  // Slides sit off to the side inside a clipped strip, where
                  // native lazy-loading won't fetch them. Load the ones near
                  // the active photo eagerly so they're ready before they
                  // slide in.
                  loading={Math.abs(i - index) <= 2 ? "eager" : "lazy"}
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* Counter + small controls */}
      <div className="px-6 lg:px-16">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="font-pixel text-[9px] leading-none text-muted" aria-live="polite">
            <span className="text-foreground">{pad(index + 1)}</span>
            <span className="mx-2 text-border">/</span>
            {pad(n)}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous photo"
              className="p-2 text-muted transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === n - 1}
              aria-label="Next photo"
              className="p-2 text-muted transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { sunset } from "@/data/about";

// ── Tweakables ─────────────────────────────────────────────────────
/** Size of one reveal block, in CSS px (kept clearly visible). */
const BLOCK = 22;
/** Radius of influence around the pointer, in CSS px. */
const RADIUS = 96;
/** Per-frame approach toward "revealed" (fast: blocks snap in). */
const REVEAL_RATE = 0.28;
/** Per-frame approach back to pixel-art (slow: a smooth restore). */
const RESTORE_RATE = 0.045;
/** Opacity steps per block, for a stepped, digital feel. */
const STEPS = 5;

/**
 * The 8-bit portrait by default; moving over it reveals the original
 * photograph underneath through discrete blocks.
 *
 * Layers (same box, same aspect, both object-fit: cover):
 *   1. the pixel-art image — plain <Image>, server-rendered and visible
 *      without JS
 *   2. a canvas that paints the photograph back in, block by block
 *
 * Each block has a reveal value that eases toward a target set by the
 * pointer. A fixed per-block threshold jitter makes the edge break up
 * into pixels rather than forming a circle, and blocks restore on their
 * own slight delay. The loop only runs while something is changing.
 */
export function SunsetReveal({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0, cols = 0, rows = 0;
    let value = new Float32Array(0);
    let jitter = new Float32Array(0);
    let photoCache: HTMLCanvasElement | null = null;
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const photo = new window.Image();
    photo.decoding = "async";
    photo.src = encodeURI(sunset.photo.src);

    // Draw the photograph once, cover-fitted to the box, at device scale.
    const buildCache = () => {
      if (!photo.complete || !photo.naturalWidth || !w) return;
      const c = document.createElement("canvas");
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const cc = c.getContext("2d");
      if (!cc) return;
      const scale = Math.max(c.width / photo.naturalWidth, c.height / photo.naturalHeight);
      const dw = photo.naturalWidth * scale;
      const dh = photo.naturalHeight * scale;
      cc.drawImage(photo, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
      photoCache = c;
    };

    const resize = () => {
      const r = box.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / BLOCK);
      rows = Math.ceil(h / BLOCK);
      value = new Float32Array(cols * rows);
      jitter = new Float32Array(cols * rows).map(() => Math.random());
      buildCache();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const target = (cx: number, cy: number, i: number) => {
      if (!pointer) return 0;
      const d = Math.hypot(cx - pointer.x, cy - pointer.y);
      // Nearer blocks reveal first; the jitter breaks the edge into pixels
      const t = 1 - d / RADIUS + (jitter[i] - 0.5) * 0.7;
      return t > 0.15 ? 1 : 0;
    };

    const frame = () => {
      raf = 0;
      if (!photoCache) return;
      let active = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bs = BLOCK * dpr;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const goal = target(col * BLOCK + BLOCK / 2, row * BLOCK + BLOCK / 2, i);
          let v = value[i];
          if (reduce) v = goal;
          else if (goal > v) v = Math.min(goal, v + (goal - v) * REVEAL_RATE + 0.02);
          // Restore: each block waits on its own jitter, then eases out
          else if (goal < v) v = Math.max(0, v - (v * RESTORE_RATE + 0.004) * (0.6 + jitter[i]));
          value[i] = v;
          if (v > 0.001) {
            active = active || v !== goal;
            const a = Math.ceil(v * STEPS) / STEPS; // stepped opacity
            ctx.globalAlpha = a;
            const x = col * bs, y = row * bs;
            ctx.drawImage(photoCache, x, y, bs, bs, x, y, bs, bs);
          }
        }
      }
      ctx.globalAlpha = 1;
      if (active || pointer) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const local = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      pointer = local(e);
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    photo.onload = () => {
      buildCache();
      kick();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(box);

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerdown", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointercancel", onLeave);
    // Touch: a lift ends the reveal (it then restores gradually)
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };
    box.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerdown", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointercancel", onLeave);
      box.removeEventListener("pointerup", onUp);
      photo.onload = null;
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden rounded-[6px] border border-border bg-surface touch-pan-y select-none ${className}`}
      style={{ aspectRatio: `${sunset.pixel.width} / ${sunset.pixel.height}` }}
    >
      <Image
        src={sunset.pixel.src}
        alt={`${sunset.pixel.alt}. Move over it to reveal the original photograph.`}
        fill
        sizes="(min-width: 1024px) 520px, calc(100vw - 48px)"
        className="object-cover pointer-events-none"
        draggable={false}
        priority={false}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full pointer-events-none" />
    </div>
  );
}

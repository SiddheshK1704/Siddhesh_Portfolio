"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Featured-projects folder, following React Bits Folder behavior
 * (reactbits.dev/components/folder):
 *
 *   hover  → the folder lifts, its front flaps part, papers peek inside
 *            (pure CSS, see "Hover (closed)" in globals.css)
 *   click  → the project cards pop out and fan above the folder
 *   click again (or outside / Escape) → they tuck back in
 *
 * Open cards drift slightly toward the pointer (React Bits' magnetic
 * offset) and navigate to their project page on click.
 *
 * Sized natively (not via transform: scale) so the cards stay crisp.
 * Geometry — fan positions, the mobile 2×2 grid, stagger — lives in
 * globals.css as custom properties per breakpoint.
 */

/** Magnetic pull of an open card toward the pointer (React Bits: 0.15). */
const MAGNET = 0.15;

export type FolderProject = Pick<Project, "slug" | "title" | "tagline"> & {
  category: string;
};

export function ProjectFolder({ projects }: { projects: FolderProject[] }) {
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const papersId = useId();

  // While open: click/tap outside or Escape tucks the cards back in
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!stageRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const magnet = (el: HTMLElement, x: number, y: number) => {
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={stageRef}
      className="work-stage"
      data-open={open}
      onBlur={(e) => {
        // Keyboard: close once focus leaves the folder and its cards
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <div className="work-stage__light" aria-hidden="true" />

      <div className="folder">
        <div className="folder__back" aria-hidden="true" />

        <ul id={papersId} className="folder__papers" aria-label="Featured projects">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="paper"
              data-i={i}
              style={{ "--i": i } as React.CSSProperties}
              onMouseMove={(e) => {
                if (!open) return;
                // Offset from the card's centre; the small pull means the
                // rotated bounding box is an accurate enough reference.
                const r = e.currentTarget.getBoundingClientRect();
                magnet(
                  e.currentTarget,
                  (e.clientX - (r.left + r.width / 2)) * MAGNET,
                  (e.clientY - (r.top + r.height / 2)) * MAGNET
                );
              }}
              onMouseLeave={(e) => magnet(e.currentTarget, 0, 0)}
            >
              <Link
                href={`/work/${p.slug}`}
                className="paper__link"
                tabIndex={open ? 0 : -1}
                aria-hidden={!open}
              >
                <span className="paper__meta">
                  <span className="text-accent">0{i + 1}</span>
                  <span>{p.category}</span>
                </span>
                <span className="paper__title">{p.title}</span>
                <span className="paper__tagline">{p.tagline}</span>
                <span className="paper__cta">
                  View project <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="folder__flap folder__flap--a" aria-hidden="true" />
        <div className="folder__flap folder__flap--b" aria-hidden="true">
          <span className="folder__label">
            <span>Selected work</span>
            <span>0{projects.length}</span>
          </span>
        </div>

        {/* The folder body is the toggle, for mouse, touch and keyboard */}
        <button
          type="button"
          className="folder__hit"
          aria-expanded={open}
          aria-controls={papersId}
          aria-label={open ? "Close project folder" : "Open project folder"}
          onClick={() => setOpen((v) => !v)}
        />
      </div>

      <div className="work-stage__shadow" aria-hidden="true" />

      {/* Hint follows the folder's state and the visitor's input type */}
      <p className="work-hint mt-3 text-center font-pixel text-[8px] leading-relaxed text-muted/80" aria-live="polite">
        {open ? (
          <>
            <span className="work-hint--hover">Pick a project, or click the folder to close</span>
            <span className="work-hint--tap">Pick a project, or tap the folder to close</span>
          </>
        ) : (
          <>
            <span className="work-hint--hover">Click the folder to open it</span>
            <span className="work-hint--tap">Tap the folder to open it</span>
          </>
        )}
      </p>
    </div>
  );
}

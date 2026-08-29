"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { projects } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";
import { ProjectProgressIndicator } from "./ProjectProgressIndicator";

// Scroll distance per transition between projects, in pixels.
// Total virtual scroll for the section = SCROLL_PER_SEGMENT × (projects - 1).
const SCROLL_PER_SEGMENT = 350;

export function ProjectDepthStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  // Track which panel was last active so we can toggle pointer-events
  // via direct DOM mutation (not React state) — same reasoning as the
  // progress indicator: this fires on every scroll tick.
  const lastActiveRef = useRef(0);

  // Use Motion's useReducedMotion hook to safely detect OS reduced motion
  // without manual effect-based state mutations.
  const shouldReduceMotion = useReducedMotion();
  const useSimpleLayout = !!shouldReduceMotion;

  useGSAP(
    () => {
      if (useSimpleLayout) return;

      gsap.registerPlugin(ScrollTrigger);

      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length < 2) return;

      const segments = panels.length - 1; // number of transitions between projects

      // Set initial pointer-events: only the first panel is interactive
      panels.forEach((panel, i) => {
        panel.style.pointerEvents = i === 0 ? "auto" : "none";
      });

      gsap.set(panels[0], { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
      gsap.set(panels.slice(1), { opacity: 0, scale: 0.94, y: 60 });

      // KEY ARCHITECTURE DECISION: We use the OUTER wrapper div as the
      // ScrollTrigger trigger, NOT the sticky viewport. The wrapper has
      // an explicit height (segments × SCROLL_PER_SEGMENT + 100vh) that
      // provides real scroll distance. The inner viewport sticks to the
      // top via CSS `position: sticky`, so it stays visible while the
      // wrapper scrolls past. ScrollTrigger's `pin` is NOT used —
      // GSAP's pin-spacer mechanism conflicts with Lenis's smooth
      // scroll, producing a spacer with incorrect height. CSS sticky
      // is the standard pattern for Lenis + scroll-driven animations.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          // No `pin: true` — CSS sticky handles the pinning.
          onUpdate: (self) => {
            // Which project should the indicator show right now?
            // self.progress is 0-1 across the WHOLE scroll range;
            // multiplying by segments and rounding gives the nearest
            // project index.
            const idx = Math.min(
              panels.length - 1,
              Math.round(self.progress * segments)
            );
            if (progressRef.current) {
              progressRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
            // Toggle pointer-events via direct DOM mutation — no
            // React re-render, no useGSAP re-initialization.
            if (idx !== lastActiveRef.current) {
              panels[lastActiveRef.current].style.pointerEvents = "none";
              panels[idx].style.pointerEvents = "auto";
              lastActiveRef.current = idx;
            }
          },
        },
      });

      // One pair of tweens per transition: the current project
      // recedes (scales down, dims, drifts back and slightly up)
      // while the next one arrives (scales/fades/moves up into
      // place) — both starting at the SAME timeline position `i`,
      // so they happen together, not one after the other.
      panels.forEach((panel, i) => {
        if (i === segments) return; // the last panel has no "next" to hand off to
        tl.to(
          panel,
          { opacity: 0, scale: 0.9, y: -50, filter: "blur(6px)", duration: 0.8 },
          i
        ).to(
          panels[i + 1],
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          i
        );
      });
    },
    { scope: wrapperRef, dependencies: [useSimpleLayout] }
  );

  if (useSimpleLayout) {
    return (
      <section id="work-stack" className="flex flex-col gap-24 px-6 lg:px-16 py-24">
        {projects.map((project, i) => (
          <ProjectPanel key={project.slug} project={project} index={i} />
        ))}
      </section>
    );
  }

  const segments = projects.length - 1;

  return (
    // Outer wrapper: its height creates the real scroll distance.
    // The 100vh accounts for the sticky viewport's own height.
    <div
      ref={wrapperRef}
      id="work-stack"
      style={{ height: `${segments * SCROLL_PER_SEGMENT + 100}vh` }}
    >
      {/* Inner sticky viewport: stays pinned at the top of the
          browser while the wrapper scrolls past. This replaces
          GSAP's `pin: true` mechanism. */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-background"
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="absolute inset-0 flex items-center px-6 lg:px-16"
          >
            <ProjectPanel project={project} index={i} />
          </div>
        ))}

        <ProjectProgressIndicator ref={progressRef} total={projects.length} />
      </div>
    </div>
  );
}

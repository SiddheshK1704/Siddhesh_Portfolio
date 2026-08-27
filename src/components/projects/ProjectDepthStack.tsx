"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";
import { ProjectProgressIndicator } from "./ProjectProgressIndicator";

export function ProjectDepthStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Always false on both server and first client render — the
  // pinned/stacked layout is the default markup. The real
  // reduced-motion check only runs after mount, in the effect
  // below, so the very first render is always identical regardless
  // of environment (the lesson from the intro sequence's hydration
  // fix, applied here proactively).
  //
  // This ISN'T just cosmetic for this component the way it was for
  // the car: the animated layout stacks all 4 projects exactly on
  // top of each other and reveals them via scroll-linked animation.
  // Simply "turning off the animation" for reduced-motion users
  // would leave 3 of the 4 projects permanently invisible — that's
  // broken content, not an accessible fallback. So reduced-motion
  // users get a genuinely different layout: a plain vertical stack,
  // everything visible, normal scrolling, no pin.
  const [useSimpleLayout, setUseSimpleLayout] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) setUseSimpleLayout(true);
  }, []);

  useGSAP(
    () => {
      if (useSimpleLayout) return;

      gsap.registerPlugin(ScrollTrigger);

      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length < 2) return;

      const segments = panels.length - 1; // number of transitions between projects

      gsap.set(panels[0], { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" });
      gsap.set(panels.slice(1), { opacity: 0, scale: 0.94, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${segments * 1000}`, // scroll distance per transition
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // Which project should the indicator show right now?
            // self.progress is 0-1 across the WHOLE pin; multiplying
            // by segments and rounding gives the nearest project index.
            const idx = Math.min(
              panels.length - 1,
              Math.round(self.progress * segments)
            );
            if (progressRef.current) {
              progressRef.current.textContent = String(idx + 1).padStart(2, "0");
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
          { opacity: 0.25, scale: 0.9, y: -50, filter: "blur(2px)", duration: 0.8 },
          i
        ).to(
          panels[i + 1],
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          i
        );
      });
    },
    { scope: sectionRef, dependencies: [useSimpleLayout] }
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

  return (
    <section
      ref={sectionRef}
      id="work-stack"
      className="relative h-screen overflow-hidden bg-background"
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
    </section>
  );
}

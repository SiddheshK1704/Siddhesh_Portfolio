"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CarSVG } from "./CarSVG";

export function DriveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const speedValueRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // useGSAP is @gsap/react's purpose-built replacement for
  // useEffect when working with GSAP: it automatically reverts
  // (cleans up) every animation and ScrollTrigger created inside it
  // when the component unmounts, which is easy to get wrong by hand.
  // `scope: sectionRef` means any plain CSS selector used inside
  // (like ".js-wheel") only matches elements INSIDE this section —
  // no risk of accidentally animating a similarly-classed element
  // elsewhere on the page.
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // gsap.matchMedia() is GSAP's own recommended tool for
      // conditional, accessibility-aware animation. Unlike our
      // earlier approach (branching to a completely different React
      // tree based on prefers-reduced-motion), this keeps ONE DOM
      // structure always — the condition only decides which GSAP
      // instructions run against it. Same markup on server and
      // client always, so there's no hydration mismatch to cause.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1400", // pixels of scroll this animation plays across
            scrub: 1, // ties timeline progress directly to scroll position
            pin: true, // pins the section in place for that scroll distance;
            // ScrollTrigger automatically inserts the extra space
            // needed, no manual tall wrapper div required.
          },
        });

        tl.to(carRef.current, { xPercent: 140, ease: "none" }, 0)
          .to(".js-wheel", { rotate: 900, ease: "none", transformOrigin: "center" }, 0)
          .to([".js-headlight-glow", ".js-headlight-core", ".js-underglow"], { opacity: 1, duration: 0.08 }, 0.02)
          .to(trailRef.current, { opacity: 1, width: 260, duration: 0.15 }, 0.1)
          .to(trailRef.current, { opacity: 0, duration: 0.1 }, 0.85)
          .to(sectionRef.current, { opacity: 0, duration: 0.1 }, 0.9);

        // A separate, purely numeric tween drives the speed readout.
        // onUpdate writes straight to the DOM (textContent) instead
        // of React state, since this fires on every scroll tick —
        // going through React's render cycle for a single number
        // that many times a second would be wasteful.
        const speedProxy = { value: 0 };
        gsap.to(speedProxy, {
          value: 210,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1400",
            scrub: 1,
          },
          onUpdate: () => {
            if (speedValueRef.current) {
              speedValueRef.current.textContent = String(Math.round(speedProxy.value));
            }
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // No pin, no scroll distance, no motion — just show the
        // scene in a settled, fully-lit static state.
        gsap.set(carRef.current, { xPercent: 60 });
        gsap.set([".js-headlight-glow", ".js-headlight-core", ".js-underglow"], { opacity: 1 });
        if (speedValueRef.current) speedValueRef.current.textContent = "—";
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function handleHoverStart() {
    setIsHovered(true);
    gsap.to(carRef.current, { scale: 1.06, duration: 0.3, ease: "power2.out" });
    gsap.to(".js-headlight-glow", { attr: { r: 15 }, duration: 0.3 });
  }

  function handleHoverEnd() {
    setIsHovered(false);
    gsap.to(carRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(".js-headlight-glow", { attr: { r: 10 }, duration: 0.3 });
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col justify-center gap-14 px-6 lg:px-16 bg-background"
    >
      {/* Faint blueprint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Corner brackets — the blueprint/viewfinder framing device */}
      {(["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"] as const).map(
        (pos) => (
          <div key={pos} aria-hidden className={`absolute ${pos} w-6 h-6 border-accent/40 pointer-events-none`} />
        )
      )}

      <div className="relative flex flex-col gap-3">
        <p className="text-eyebrow">Signature Detail</p>
        <h2 className="text-h1 max-w-lg">Built to move.</h2>
      </div>

      <div className="relative h-px bg-border" />

      <div
        className="relative h-36"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <div
          ref={trailRef}
          aria-hidden
          className="absolute bottom-10 left-0 h-1.5 rounded-full bg-accent/50 blur-md opacity-0"
        />

        <div ref={carRef} className="absolute bottom-0 left-0">
          <CarSVG />
        </div>

        <p
          className="absolute -top-6 left-0 text-eyebrow text-accent whitespace-nowrap transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          TAKE A RIDE →
        </p>
      </div>

      {/* Telemetry readout — decorative, tied to scroll, not a real
          spec claim about anything */}
      <div className="relative flex items-baseline gap-2 font-mono text-small text-muted">
        <span>SPEED</span>
        <span ref={speedValueRef} className="text-accent text-h2 font-semibold tabular-nums">
          0
        </span>
        <span>KM/H</span>
      </div>
    </section>
  );
}

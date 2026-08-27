"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CursorGlow } from "@/components/ui/CursorGlow";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Tracks scroll progress across exactly ONE hero-height of
  // scrolling: 0 when the hero's top hits the viewport top (i.e.
  // the visitor has just started scrolling), 1 when the hero's
  // bottom hits the viewport top (i.e. it has fully scrolled past).
  // No pinning here — Hero stays normal-height, and Selected Work
  // (right after it in the DOM) naturally scrolls up into view at
  // the same time Hero is fading/shrinking above it. That overlap
  // in timing is what reads as "cinematic handoff" rather than a
  // hard cut from one section to the next.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // The heading moves/scales MORE than the rest of the content —
  // different rates for different elements is what creates the
  // "typography compresses, spacing changes" layered feel the brief
  // asks for, instead of everything moving as one flat block.
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // The whole hero fades out well before the scroll distance ends,
  // so it's already gone by the time Selected Work has fully
  // arrived — no moment where both look "half-there" and messy.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // A thin accent line grows in partway through the scroll — the
  // "subtle blue accent/line appears" cue from the brief, signaling
  // the handoff is happening.
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "100%"]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-6 lg:px-16 pt-32 pb-16"
    >
      <CursorGlow />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full"
      >
        {/* Text column — scroll-driven transform wraps the
            one-time entrance (Reveal) animations underneath it.
            These are two separate concerns on two separate motion
            elements: the outer one reacts continuously to scroll
            position; the inner Reveal components each play their
            fade-up entrance exactly once, on first appearance. */}
        <motion.div
          style={{ y: headingY, scale: headingScale }}
          className="relative flex flex-col gap-6 lg:w-3/5 origin-left"
        >
          <Reveal>
            <p className="text-eyebrow">AI/ML &amp; Software Engineering</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-display">
              SIDDHESH
              <br />
              KHANKHOJE
            </h1>
          </Reveal>

          <motion.div style={{ width: lineWidth }} className="h-[2px] bg-accent max-w-[120px]" />

          <motion.div style={{ y: contentY }} className="flex flex-col gap-6">
            <Reveal delay={0.2}>
              <p className="text-body max-w-lg text-muted">
                Building intelligent systems and software experiences — from RAG
                pipelines to full-stack products. Currently studying AI/ML at SRM
                University, Chennai.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#work"
                  className="inline-block border border-accent bg-accent px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] transition-all hover:bg-accent-dim hover:scale-[1.03]"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="inline-block border border-border px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] transition-all hover:border-accent hover:scale-[1.03]"
                >
                  Get in Touch
                </a>
              </div>
            </Reveal>
          </motion.div>
        </motion.div>

        {/* Photo column */}
        <motion.div style={{ y: photoY }} className="relative lg:w-2/5 w-full flex justify-center lg:justify-end">
          <Reveal delay={0.15} className="w-full max-w-sm">
            <div className="relative w-full max-w-sm aspect-[3/4] border border-border rounded-[var(--radius-md)] overflow-hidden">
              <Image
                src="/images/sid.jpg"
                alt="Sid Khankhoje standing on a beach at sunset, looking toward the horizon"
                fill
                priority
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
            </div>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const QUALITIES = ["Precision", "Instinct", "Consistency", "Pressure"];

export function AboutMotorsports() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll Expand transforms:
  // 1. Initial State: Small centered rectangle containing "MY IDOL?"
  // 2. Expansion: Rectangle expands from ~240px x 76px to 100% x 100%
  const rectWidth = useTransform(scrollYProgress, [0.1, 0.55], ["260px", "100%"]);
  const rectHeight = useTransform(scrollYProgress, [0.1, 0.55], ["80px", "100%"]);
  const rectRadius = useTransform(scrollYProgress, [0.1, 0.55], ["8px", "0px"]);
  const rectBorder = useTransform(scrollYProgress, [0.1, 0.5], ["rgba(51, 85, 255, 0.5)", "rgba(51, 85, 255, 0)"]);

  // Label "MY IDOL?" fades out as the expansion gets underway
  const idolLabelOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Image parallax and scale inside the expanding frame
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6], [1.2, 1]);

  // Existing information reveals naturally after the visual expansion
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.55, 0.8], [30, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="relative overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/max-verstappen.jpg"
            alt="Max Verstappen"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
        </div>

        <div className="relative z-10 px-6 lg:px-16 py-24 max-w-6xl mx-auto flex flex-col gap-12 w-full">
          <p className="text-eyebrow">My Idol?</p>
          <h3 className="text-h1">Max Verstappen.</h3>
          <div className="h-[2px] w-16 bg-accent" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="flex flex-col gap-2">
              {QUALITIES.map((q) => (
                <span key={q} className="text-h2 text-muted">
                  {q}.
                </span>
              ))}
            </div>
            <p className="text-body text-muted max-w-md leading-relaxed lg:pt-2">
              There&apos;s something about watching someone operate at that
              level — where every input is deliberate, every correction
              happens before the problem is even visible. It&apos;s the kind
              of precision and composure I find myself thinking about,
              whether I&apos;m debugging a system or building something new.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative h-[180vh]">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Expanding Rectangle Container */}
        <motion.div
          style={{
            width: rectWidth,
            height: rectHeight,
            borderRadius: rectRadius,
            borderColor: rectBorder,
          }}
          className="relative overflow-hidden border shadow-2xl flex items-center justify-center bg-surface"
        >
          {/* Max Verstappen background photo inside the expanding container */}
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/images/max-verstappen.jpg"
              alt="Max Verstappen"
              fill
              sizes="100vw"
              priority
              className="object-cover object-top"
            />
            {/* Dark atmosphere overlay */}
            <div className="absolute inset-0 bg-background/80" />
            <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
          </motion.div>

          {/* Initial Small Rectangle Label: "MY IDOL?" */}
          <motion.div
            style={{ opacity: idolLabelOpacity }}
            className="relative z-20 flex items-center justify-center px-4 py-2 pointer-events-none"
          >
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-foreground uppercase">
              MY IDOL?
            </span>
          </motion.div>

          {/* Content revealed after visual transition */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
            }}
            className="absolute inset-0 z-30 px-6 lg:px-16 py-16 sm:py-24 flex items-center pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
              <p className="text-eyebrow">My Idol?</p>
              <h3 className="text-h1">Max Verstappen.</h3>
              <div className="h-[2px] w-16 bg-accent" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                <div className="flex flex-col gap-2">
                  {QUALITIES.map((q) => (
                    <span key={q} className="text-h2 text-muted">
                      {q}.
                    </span>
                  ))}
                </div>

                <p className="text-body text-muted max-w-md leading-relaxed lg:pt-2">
                  There&apos;s something about watching someone operate at that
                  level — where every input is deliberate, every correction
                  happens before the problem is even visible. It&apos;s the kind
                  of precision and composure I find myself thinking about,
                  whether I&apos;m debugging a system or building something new.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

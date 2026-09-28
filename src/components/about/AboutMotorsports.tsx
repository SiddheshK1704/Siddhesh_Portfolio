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

  // Subtle parallax on the background image as the user scrolls through
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  // Content fades in gently at the beginning of the scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);

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
    <div ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky viewport frame — stays pinned while scrolling through the 200vh parent */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Background image with subtle parallax */}
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

        {/* Max Verstappen content — always visible, gentle fade-in */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="relative z-10 h-full px-6 lg:px-16 flex items-center"
        >
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
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

      </div>
    </div>
  );
}


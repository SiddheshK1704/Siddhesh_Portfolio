"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CONTACT_DATA } from "@/data/contact";
import MagnetLines from "@/components/reactbits/MagnetLines";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact — the final typographic CTA of the portfolio.
 *
 * DESIGN:
 *   A faint blue light sits behind the headline (.contact-atmos). The
 *   headline rises line by line out of its own mask; the MagnetLines
 *   field stays beside it. The channels are large editorial rows with a
 *   quiet accent wash on hover (.contact-row in globals.css). Content is
 *   unchanged — this is presentation only.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** One headline line, revealed by sliding up out of a clipping mask */
// The trigger is the whole heading (`show`), not each line: a line parked
// below its own clipping mask never counts as "in view" by itself.
function MaskLine({ children, i, show, reduce }: { children: React.ReactNode; i: number; show: boolean; reduce: boolean | null }) {
  return (
    // Padding + negative margin give the comma and descenders room inside
    // the mask without changing the line spacing.
    <span className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: show ? 0 : "105%" }}
        transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.08 + i * 0.09, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Contact() {
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 });

  const directChannels = [
    {
      ...CONTACT_DATA.email,
      subtitle: "siddheshkhankhoje@gmail.com",
    },
    {
      ...CONTACT_DATA.linkedin,
      subtitle: "in/siddhesh-khankhoje",
    },
    {
      ...CONTACT_DATA.instagram,
      subtitle: "@siddheshk_17",
    },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-between overflow-x-clip px-6 lg:px-16 pt-24 sm:pt-32 pb-28 sm:pb-36 border-t border-border"
      aria-labelledby="contact-heading"
    >
      <div aria-hidden="true" className="contact-atmos" />

      <div className="relative max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-24">

        {/* ── Section Eyebrow ───────────────────────────────── */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-6 bg-accent" aria-hidden="true" />
            <p className="font-pixel text-[9px] sm:text-[10px] leading-none uppercase text-muted">CONTACT</p>
          </div>
        </Reveal>

        {/* ── Main Typography CTA + Open MagnetLines ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-12">

          <div className="relative w-full lg:w-3/5 flex items-center select-none">
            <h2
              ref={headingRef}
              id="contact-heading"
              className="text-display max-w-3xl leading-[0.92] tracking-[-0.035em] uppercase"
            >
              <MaskLine i={0} show={headingInView} reduce={reduce}>IF YOU MADE IT</MaskLine>
              <MaskLine i={1} show={headingInView} reduce={reduce}>THIS FAR,</MaskLine>
              <MaskLine i={2} show={headingInView} reduce={reduce}>
                <span className="text-muted">WE SHOULD </span>
                <span className="text-accent">PROBABLY TALK.</span>
              </MaskLine>
            </h2>
          </div>

          {/* Open, unboxed MagnetLines decorative interaction */}
          <Reveal delay={0.3} className="w-full lg:w-72">
            <div className="h-44 sm:h-52 flex items-center justify-center pointer-events-auto">
              <MagnetLines
                rows={6}
                columns={9}
                containerSize="100%"
                lineColor="#3355ff"
                lineWidth="2px"
                lineHeight="16px"
                baseAngle={-20}
                className="w-full h-full"
              />
            </div>
          </Reveal>

        </div>

        {/* ── Reach Out Channels (Email, LinkedIn & Instagram) ── */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="font-pixel text-[9px] sm:text-[10px] leading-none uppercase text-muted">GET IN TOUCH</p>
          </Reveal>

          <nav aria-label="Direct contact channels">
            <ul className="border-t border-border">
              {directChannels.map((item, i) => (
                <li key={item.label} className="border-b border-border">
                  <Reveal delay={0.06 * i}>
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      {...(item.type === "external"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="contact-row group flex items-center justify-between gap-6 py-7 sm:py-9 pr-1 sm:pr-3"
                    >
                      {/* Label + handle: stacked on phones, one line from md */}
                      <div className="flex min-w-0 flex-1 flex-col gap-1.5 md:flex-row md:items-center md:justify-between md:gap-6">
                        <span className="contact-row-label min-w-0 truncate font-sans font-semibold tracking-[-0.03em] leading-none text-[clamp(1.9rem,4.6vw,3.75rem)]">
                          {item.label}
                        </span>{" "}
                        <span className="min-w-0 truncate text-small text-muted font-mono transition-colors duration-300 group-hover:text-foreground">
                          {item.subtitle}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-white"
                      >
                        <ArrowUpRight
                          size={20}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        />
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </nav>
        </div>

      </div>
    </section>
  );
}

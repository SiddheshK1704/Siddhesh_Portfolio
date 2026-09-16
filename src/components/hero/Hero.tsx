"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { CONTACT_DATA } from "@/data/contact";

import Waves from "@/components/reactbits/Waves";
import PixelCard from "@/components/reactbits/PixelCard";
import SpecularButton from "@/components/reactbits/SpecularButton";
import MagnetLines from "@/components/reactbits/MagnetLines";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Tracks scroll progress across exactly ONE hero-height of
  // scrolling: 0 when the hero's top hits the viewport top (i.e.
  // the visitor has just started scrolling), 1 when the hero's
  // bottom hits the viewport top (i.e. it has fully scrolled past).
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "100%"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-6 lg:px-16 pt-32 pb-16"
    >
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full"
      >
        {/* Text column */}
        <motion.div
          style={{ y: headingY, scale: headingScale }}
          className="relative flex flex-col gap-6 lg:w-3/5 origin-left"
        >
          <Reveal>
            <p className="text-eyebrow">AI/ML &amp; Software Engineering</p>
          </Reveal>

          {/* Name in a distinct rectangular badge containing Waves running subtly behind the text */}
          <Reveal delay={0.1}>
            <div className="relative inline-block w-full max-w-2xl rounded-[var(--radius-md)] border border-border/80 bg-surface/40 backdrop-blur-md p-6 sm:p-8 overflow-hidden group shadow-2xl transition-all duration-300 hover:border-accent/50">
              {/* Waves running subtly behind */}
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-300 group-hover:opacity-75">
                <Waves
                  lineColor="rgba(51, 85, 255, 0.35)"
                  waveSpeedX={0.012}
                  waveSpeedY={0.006}
                  waveAmpX={28}
                  waveAmpY={16}
                  xGap={12}
                  yGap={28}
                />
              </div>

              {/* MagnetLines framing accent in the top-right corner */}
              <div
                aria-hidden="true"
                className="absolute top-3 right-3 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300 hidden sm:block"
              >
                <MagnetLines
                  rows={3}
                  columns={5}
                  containerSize="54px"
                  lineColor="#3355ff"
                  lineWidth="1.5px"
                  lineHeight="8px"
                  baseAngle={-20}
                />
              </div>

              <h1 className="relative z-10 text-display select-none tracking-tight">
                SIDDHESH
                <br />
                KHANKHOJE
              </h1>
            </div>
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
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <SpecularButton
                  size="sm"
                  radius={8}
                  baseColor="#3355ff"
                  lineColor="#ffffff"
                  tint="#3355ff"
                  tintOpacity={0.25}
                  intensity={1.2}
                  textColor="#ffffff"
                  className="!px-6 !py-3 !text-small !font-medium"
                  onClick={() => scrollToSection("work")}
                >
                  View Work
                </SpecularButton>
                <SpecularButton
                  size="sm"
                  radius={8}
                  baseColor="#27272a"
                  lineColor="#6b8cff"
                  tint="#18181b"
                  tintOpacity={0.4}
                  intensity={0.9}
                  textColor="#f5f5f5"
                  className="!px-6 !py-3 !text-small !font-medium"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in Touch
                </SpecularButton>
              </div>
            </Reveal>
          </motion.div>
        </motion.div>

        {/* Photo column */}
        <motion.div style={{ y: photoY }} className="relative lg:w-2/5 w-full flex justify-center lg:justify-end">
          <Reveal delay={0.15} className="w-full max-w-sm flex flex-col items-center gap-3">
            <div className="group/photo relative w-full max-w-sm cursor-pointer">
              {/* Backing geometric accent frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-0 border border-accent/20 rounded-[var(--radius-md)] bg-accent/5 transition-all duration-300 ease-out pointer-events-none group-hover/photo:border-accent group-hover/photo:translate-x-3 group-hover/photo:translate-y-3 group-hover/photo:bg-accent/10"
              />

              {/* Foreground Photo Frame wrapped in PixelCard */}
              <PixelCard
                colors="#3355ff,#6b8cff,#000000"
                gap={6}
                speed={25}
                className="relative z-10 w-full aspect-[3/4] border border-border rounded-[var(--radius-md)] overflow-hidden bg-background transition-all duration-300 ease-out group-hover/photo:-translate-x-1 group-hover/photo:-translate-y-1 group-hover/photo:border-accent/70 group-hover/photo:shadow-[0_0_24px_rgba(51,85,255,0.18)]"
              >
                <Image
                  src="/images/sid.jpg"
                  alt="Sid Khankhoje standing on a beach at sunset, looking toward the horizon"
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover object-[50%_30%] transition-transform duration-500 ease-out group-hover/photo:scale-[1.02] pointer-events-none"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-multiply pointer-events-none z-10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none z-10" />
              </PixelCard>
            </div>

            {/* Social icons under photo */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <a
                href={CONTACT_DATA.github.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CONTACT_DATA.github.ariaLabel}
                className="p-2.5 text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5 rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                <GithubIcon size={22} />
              </a>
              <a
                href={CONTACT_DATA.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CONTACT_DATA.instagram.ariaLabel}
                className="p-2.5 text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5 rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href={CONTACT_DATA.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={CONTACT_DATA.linkedin.ariaLabel}
                className="p-2.5 text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5 rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-accent"
              >
                <LinkedinIcon size={22} />
              </a>
            </div>
          </Reveal>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { CONTACT_DATA } from "@/data/contact";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax cursor tracking for the cartoon (max 4-6px subtle translation)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cartoonX = useSpring(mouseX, springConfig);
  const cartoonY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Map offset to max 5px range
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 5;
    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll tracking across the hero for the Siddhesh -> SID. transition
  const { scrollY } = useScroll();
  const identityY = useTransform(scrollY, [0, 260], [0, -45]);
  const identityScale = useTransform(scrollY, [0, 260], [1, 0.94]);
  const identityOpacity = useTransform(scrollY, [180, 270], [1, 0.25]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center px-6 lg:px-16 pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ── LEFT COLUMN: Editorial Typography & Actions ── */}
        <div className="lg:col-span-7 flex flex-col gap-8 order-1">
          
          <div className="flex flex-col gap-4">
            {/* Playful Pixel Eyebrow: Press Start 2P */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-pixel text-xs sm:text-[13px] text-muted/90 tracking-wide select-none"
            >
              Hi there,
            </motion.p>

            {/* Dominant Visual Statement: Geist */}
            <motion.div
              style={{
                y: identityY,
                scale: identityScale,
                opacity: identityOpacity,
              }}
              className="origin-left"
            >
              <h1 className="text-display font-sans tracking-tight text-foreground select-none">
                I am{" "}
                <span className="relative inline-block text-foreground font-bold">
                  Siddhesh
                  <span className="text-accent">.</span>
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Description: Geist, small, restrained, supporting */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-body text-muted leading-relaxed max-w-lg font-sans font-normal"
          >
            Building intelligent systems and software experiences — from RAG
            pipelines to full-stack products.
          </motion.p>

          {/* Buttons: Clean, sharp, intentional, premium */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              type="button"
              onClick={() => scrollToSection("work")}
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-sm)] bg-foreground text-background font-sans font-medium text-small tracking-tight transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(255,255,255,0.18)] active:translate-y-0 cursor-pointer"
            >
              View work
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-sm)] border border-border bg-surface/40 text-foreground font-sans font-medium text-small tracking-tight transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:bg-surface/80 active:translate-y-0 cursor-pointer"
            >
              Get in touch
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Character Cartoon & Social Links ── */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-2 lg:pl-6">
          
          {/* Cartoon Character: sitting directly against dark hero background */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: cartoonX, y: cartoonY }}
            className="relative w-full max-w-[340px] sm:max-w-[390px] lg:max-w-[430px] aspect-[460/542] flex items-center justify-center select-none"
          >
            <Image
              src="/images/memoji_style_cartoon-removebg-preview.png"
              alt="Cartoon illustration of Siddhesh"
              fill
              priority
              sizes="(min-width: 1024px) 430px, (min-width: 640px) 390px, 320px"
              className="object-contain pointer-events-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Social Links beneath the cartoon */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Social profiles"
            className="flex items-center gap-6 pt-5"
          >
            <a
              href={CONTACT_DATA.github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CONTACT_DATA.github.ariaLabel}
              className="group flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-accent"
            >
              <GithubIcon size={16} className="text-muted group-hover:text-accent transition-colors" />
              <span>GitHub</span>
            </a>

            <span className="text-border text-xs select-none">/</span>

            <a
              href={CONTACT_DATA.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CONTACT_DATA.instagram.ariaLabel}
              className="group flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-accent"
            >
              <InstagramIcon size={16} className="text-muted group-hover:text-accent transition-colors" />
              <span>Instagram</span>
            </a>

            <span className="text-border text-xs select-none">/</span>

            <a
              href={CONTACT_DATA.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CONTACT_DATA.linkedin.ariaLabel}
              className="group flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-accent"
            >
              <LinkedinIcon size={16} className="text-muted group-hover:text-accent transition-colors" />
              <span>LinkedIn</span>
            </a>
          </motion.nav>
        </div>

      </div>
    </section>
  );
}

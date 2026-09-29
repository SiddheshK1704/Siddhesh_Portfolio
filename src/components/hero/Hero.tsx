"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useLenis } from "lenis/react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import SpecularButton from "@/components/reactbits/SpecularButton";
import {
  INTRO_DONE_EVENT,
  INTRO_DURATION,
  shouldPlayIntro,
} from "@/components/intro/introGate";
import LightRays from "@/components/reactbits/LightRays";
import { CONTACT_DATA } from "@/data/contact";
import { useTheme } from "@/components/theme/useTheme";
import { LightSwitch } from "./LightSwitch";
import {
  identityEnd,
  DOCK_AT,
  HANDOFF_START,
  NAV_BRAND_ID,
  clamp01,
  ramp,
} from "./identity";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  { ...CONTACT_DATA.github, name: "GitHub", Icon: GithubIcon },
  { ...CONTACT_DATA.instagram, name: "Instagram", Icon: InstagramIcon },
  { ...CONTACT_DATA.linkedin, name: "LinkedIn", Icon: LinkedinIcon },
];

// The specular edge is drawn in WebGL, so it needs literal hex colors per
// theme (fill and text colors use CSS variables instead).
const BUTTON_EDGES = {
  dark: { primaryBase: "#c8ccd6", secondaryBase: "#3b404d", line: "#dfe5f5" },
  light: { primaryBase: "#2a2c33", secondaryBase: "#c9c6be", line: "#7483b4" },
} as const;

const noopSubscribe = () => () => {};

type Geometry = {
  /** scrollY at which the word lands on the navbar brand */
  end: number;
  /** horizontal offset from hero word to navbar brand */
  dx: number;
  /** navbar font-size / hero font-size */
  k: number;
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const theme = useTheme();
  const btn = BUTTON_EDGES[theme];
  // Mount the rays only on the client and only in dark mode, so nothing
  // runs in light mode and the server markup never contains them.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const showRays = hydrated && theme === "dark";

  // Delay the cartoon's entrance until the intro overlay has cleared,
  // otherwise it plays unseen underneath it.
  const [entranceDelay] = useState(() =>
    shouldPlayIntro() ? INTRO_DURATION : 0.15
  );

  // ── Hero → navbar identity hand-off ──────────────────────────────
  // "Siddhesh" rides the page up while shrinking toward the navbar's
  // "SID." — its vertical centre reaches the brand's centre exactly at
  // `end`, where the two crossfade. Scroll-scrubbed, so it is one
  // continuous, reversible movement.
  const wordRef = useRef<HTMLSpanElement>(null);
  const sidRef = useRef<HTMLSpanElement>(null);
  // A motion value (not state) so re-measuring updates the scroll-linked
  // transforms without re-rendering.
  const geo = useMotionValue<Geometry>({ end: 360, dx: 0, k: 0.1 });

  useEffect(() => {
    const word = wordRef.current;
    const sid = sidRef.current;
    if (!word || !sid) return;

    const measure = () => {
      const nav = document.getElementById(NAV_BRAND_ID);
      if (!nav) return;

      // Measure the word untransformed, then restore synchronously.
      const prev = word.style.transform;
      word.style.transform = "none";
      const w = sid.getBoundingClientRect();
      const box = word.getBoundingClientRect();
      word.style.transform = prev;

      const n = nav.getBoundingClientRect();
      const heroFs = parseFloat(getComputedStyle(sid).fontSize);
      const navFs = parseFloat(getComputedStyle(nav).fontSize);

      const wordCenterDoc = w.top + window.scrollY + w.height / 2;
      const navCenter = n.top + n.height / 2;

      // Scale around the left edge of "Sid" at its optical centre line.
      word.style.transformOrigin = `0px ${w.top - box.top + w.height / 2}px`;

      const end = Math.max(120, wordCenterDoc - navCenter);
      geo.set({ end, dx: n.left - w.left, k: navFs / heroFs });
      identityEnd.set(end);
    };

    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(word);
    window.addEventListener("resize", measure);
    // The hero is slightly scaled while the intro plays; measure again
    // once it has settled.
    window.addEventListener(INTRO_DONE_EVENT, measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener(INTRO_DONE_EVENT, measure);
      identityEnd.set(0);
    };
  }, [geo]);

  // Every value below derives directly from scrollY + geometry (no
  // derived-of-derived chains), so they can never lag a scroll jump.
  const { scrollY } = useScroll();
  const progress = () => clamp01(scrollY.get() / geo.get().end);
  // Travel completes at DOCK_AT; the word then holds on the brand while
  // the two crossfade in place.
  const travel = () => clamp01(progress() / DOCK_AT);

  const wordX = useTransform(() =>
    reduceMotion ? 0 : travel() * geo.get().dx
  );
  // Rise slightly faster than the page so the word arrives at the brand
  // early, then counter the scroll so it stays docked there.
  const wordY = useTransform(() => {
    if (reduceMotion) return 0;
    const { end } = geo.get();
    const s = Math.min(scrollY.get(), end);
    return s < DOCK_AT * end ? -s * (1 / DOCK_AT - 1) : s - end;
  });
  // Exponential interpolation reads as an even shrink rather than a
  // fast collapse followed by a crawl.
  const wordScale = useTransform(() =>
    reduceMotion ? 1 : Math.pow(geo.get().k, travel())
  );
  const tailOpacity = useTransform(() => 1 - ramp(progress(), 0.08, 0.45));
  const sidOpacity = useTransform(() => 1 - ramp(progress(), HANDOFF_START));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, {
        offset: -96,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center px-6 lg:px-16 pt-28 pb-20 overflow-hidden"
    >
      <div className="hero-emerge relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-end">
        {/* ── Typography & actions ── */}
        <div className="lg:col-span-8 flex flex-col">
          <h1 className="flex flex-col text-foreground select-none">
            {/* The greeting fades with "dhesh." so only "Sid" travels on
                to the navbar */}
            <motion.span
              style={{ opacity: tailOpacity }}
              className="font-pixel text-pixel-lead text-muted mb-4 sm:mb-6"
            >
              Hi There,
            </motion.span>{" "}
            <span className="flex items-baseline whitespace-nowrap">
              <motion.span
                style={{ opacity: tailOpacity }}
                className="font-pixel text-pixel-lead text-muted mr-[0.8em] shrink-0"
              >
                I am
              </motion.span>{" "}
              <motion.span
                ref={wordRef}
                style={{ x: wordX, y: wordY, scale: wordScale }}
                className="inline-block font-sans text-wordmark whitespace-nowrap will-change-transform"
              >
                <motion.span ref={sidRef} style={{ opacity: sidOpacity }}>
                  Sid
                </motion.span>
                <motion.span style={{ opacity: tailOpacity }}>
                  dhesh<span className="text-accent dark:text-accent/70">.</span>
                </motion.span>
              </motion.span>
            </span>
          </h1>

          <p className="mt-8 sm:mt-10 text-body text-muted leading-relaxed max-w-md font-sans">
            Building intelligent systems and software experiences — from RAG
            pipelines to full-stack products.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <SpecularButton
              size="sm"
              radius={4}
              tint="var(--color-foreground)"
              tintOpacity={1}
              textColor="var(--color-background)"
              baseColor={btn.primaryBase}
              lineColor={btn.line}
              intensity={0.9}
              proximity={150}
              shineSize={12}
              shineFade={36}
              className="font-sans tracking-tight"
              onClick={() => scrollToSection("work")}
            >
              View work
            </SpecularButton>

            <SpecularButton
              size="sm"
              radius={4}
              tint="var(--color-foreground)"
              tintOpacity={0.03}
              blur={6}
              textColor="var(--color-foreground)"
              baseColor={btn.secondaryBase}
              lineColor={btn.line}
              intensity={0.85}
              proximity={150}
              shineSize={12}
              shineFade={36}
              className="font-sans tracking-tight"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </SpecularButton>
          </div>
        </div>

        {/* ── Cartoon & social links ── */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
          <div className="relative flex flex-col items-center">
            {/* Dark theme only: a soft spotlight falling onto the cartoon */}
            {showRays && (
              <LightRays
                raysColor="#c4d2ff"
                raysSpeed={0.35}
                lightSpread={0.55}
                rayLength={1.6}
                fadeDistance={0.9}
                saturation={0.65}
                noiseAmount={0.06}
                distortion={0.04}
                className="hero-rays absolute left-1/2 -translate-x-1/2 z-0 -top-[120px] w-[420px] h-[440px] [--rays-opacity:0.55] lg:-top-[210px] lg:w-[600px] lg:h-[640px] lg:[--rays-opacity:0.8]"
              />
            )}

            {/* A tiny physical detail, set apart from the cartoon */}
            <LightSwitch className="absolute -top-10 -right-12 sm:-right-16 lg:-top-12 lg:-right-20 z-10" />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: entranceDelay, ease: EASE }
              }
              className="relative z-[1] w-[230px] sm:w-[270px] lg:w-[320px] aspect-[1840/2168] select-none"
            >
              <Image
                src="/images/memoji_style_cartoon-removebg-preview.png"
                alt="Cartoon illustration of Siddhesh"
                fill
                priority
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 270px, 230px"
                className="object-contain pointer-events-none drop-shadow-[0_18px_28px_var(--cartoon-shadow)]"
              />
            </motion.div>

            <nav aria-label="Social profiles" className="relative z-[1] mt-4 flex items-center gap-1">
              {SOCIALS.map(({ href, ariaLabel, name, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  title={name}
                  className="p-2.5 rounded-[var(--radius-sm)] text-muted transition-colors duration-200 hover:text-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

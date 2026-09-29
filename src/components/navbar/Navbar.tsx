"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import {
  identityEnd,
  HANDOFF_START,
  NAV_SURFACE_START,
  NAV_BRAND_ID,
  clamp01,
  ramp,
} from "@/components/hero/identity";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Fallback for pages without a hero: fade in over this scroll range.
const FALLBACK_START = 200;
const FALLBACK_RANGE = 80;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // The navbar is absent over the initial hero. On the home page its
  // surface is scrubbed by the same scroll progress that shrinks the hero
  // wordmark, so both read as a single movement.
  const surface = useTransform(() => {
    const s = scrollY.get();
    const end = identityEnd.get();
    return end > 0
      ? ramp(s / end, NAV_SURFACE_START)
      : clamp01((s - FALLBACK_START) / FALLBACK_RANGE);
  });

  // The brand only appears at the moment the hero word lands on it.
  const brandOpacity = useTransform(() => {
    const s = scrollY.get();
    const end = identityEnd.get();
    return end > 0
      ? ramp(s / end, HANDOFF_START)
      : clamp01((s - FALLBACK_START) / FALLBACK_RANGE);
  });

  const surfaceY = useTransform(surface, [0, 1], [-6, 0]);

  useMotionValueEvent(surface, "change", (v) => {
    const next = v > 0.05;
    if (next !== isVisible) {
      setIsVisible(next);
      if (!next) setIsOpen(false);
    }
  });

  return (
    <header
      data-lenis-prevent
      // Hidden navbar must not be reachable by keyboard or pointer.
      inert={!isVisible}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-3.5 px-4 pointer-events-none"
    >
      <nav
        className="relative w-full max-w-4xl pointer-events-auto"
        aria-label="Primary navigation"
      >
        {/* Glass surface is a separate layer so it can fade in without
            moving the brand, whose position the hero measures. */}
        <motion.div
          aria-hidden
          style={{ opacity: surface, y: surfaceY }}
          className={cn(
            "absolute inset-0 rounded-[var(--radius-md)]",
            "bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-150",
            "border border-[color:var(--glass-border)]",
            "shadow-[var(--glass-shadow)]"
          )}
        />

        <div className="relative flex items-center justify-between px-5 py-2.5">
          {/* Brand identity: the landing point of the hero's "Siddhesh" */}
          <motion.a
            href="#top"
            style={{ opacity: brandOpacity }}
            className="group flex items-baseline font-sans font-semibold text-[15px] leading-none tracking-tight text-foreground transition-colors hover:text-muted"
          >
            <span id={NAV_BRAND_ID}>SID</span>
            <span className="text-accent">.</span>
          </motion.a>

          <motion.div
            style={{ opacity: surface }}
            className="flex items-center"
          >
            {/* Desktop navigation links */}
            <ul className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-medium tracking-wide text-muted hover:text-foreground transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground/60 hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="md:hidden text-muted hover:text-foreground p-1 transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile drawer with restrained glass surface */}
      {isOpen && isVisible && (
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden absolute top-16 w-[calc(100%-2rem)] max-w-4xl pointer-events-auto",
            "bg-[var(--glass-bg-strong)] backdrop-blur-2xl border border-[color:var(--glass-border)] rounded-[var(--radius-md)] shadow-[var(--glass-shadow)]",
            "flex flex-col p-5 gap-4"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground hover:text-muted transition-colors py-1 border-b border-foreground/5 last:border-none"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

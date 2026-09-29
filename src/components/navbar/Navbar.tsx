"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // The navbar is completely hidden over the initial hero.
  // It only floats in once the user scrolls past the hero (scrollY > 240px).
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 240) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) {
        setIsVisible(false);
        setIsOpen(false);
      }
    }
  });

  return (
    <motion.header
      data-lenis-prevent
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-3.5 px-4 pointer-events-none"
      initial={{ y: -60, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -60,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "w-full max-w-4xl flex items-center justify-between pointer-events-auto",
          "px-5 py-2.5 rounded-[var(--radius-md)] relative",
          // Restrained glassmorphism: dark translucent, subtle border, subtle shadow, zero bright hue line
          "bg-[#090b12]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        )}
        aria-label="Primary navigation"
      >
        {/* Brand identity: The natural continuation of the hero's "Siddhesh" */}
        <a
          href="#top"
          className="group flex items-baseline gap-0.5 font-sans font-bold text-sm tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-accent"
        >
          <span>SID</span>
          <span className="text-accent group-hover:text-foreground transition-colors">.</span>
        </a>

        {/* Desktop navigation links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium tracking-wide text-muted hover:text-foreground transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-200"
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
      </nav>

      {/* Mobile drawer with restrained glass surface */}
      {isOpen && isVisible && (
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden absolute top-16 w-[calc(100%-2rem)] max-w-4xl pointer-events-auto",
            "bg-[#090b12]/95 backdrop-blur-2xl border border-white/[0.08] rounded-[var(--radius-md)] shadow-2xl",
            "flex flex-col p-5 gap-4 animate-in fade-in slide-in-from-top-2 duration-150"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground hover:text-accent transition-colors py-1 border-b border-white/[0.04] last:border-none"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}

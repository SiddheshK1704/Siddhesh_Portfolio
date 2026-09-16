"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Section anchors on the homepage.
const NAV_LINKS = [
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      data-lenis-prevent
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-auto"
    >
      <nav
        className={cn(
          "w-full max-w-5xl flex items-center justify-between",
          "px-6 py-3.5 rounded-[var(--radius-md)] relative overflow-hidden",
          // React Bits Glass Surface: multi-layered refraction, blur, and border shine
          "bg-background/45 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
          "after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-accent/40 after:to-transparent"
        )}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="text-small font-bold tracking-tight font-sans text-foreground hover:text-accent transition-colors"
        >
          SID.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 text-eyebrow tracking-widest text-muted hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="md:hidden text-foreground p-1 hover:text-accent transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu panel with Glass Surface */}
      {isOpen && (
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden absolute top-20 w-[calc(100%-2rem)] max-w-5xl",
            "bg-background/85 backdrop-blur-2xl border border-white/10 rounded-[var(--radius-md)] shadow-2xl",
            "flex flex-col p-6 gap-5 animate-in fade-in slide-in-from-top-2 duration-200"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-h2 font-medium hover:text-accent transition-colors"
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

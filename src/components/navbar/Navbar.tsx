"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Section anchors on the homepage. Each link scrolls to an
// id="..." element we'll add as we build Hero, Projects, About,
// Lab and Contact in later phases. Kept here (not in data/)
// because this is structural navigation, not content data.
const NAV_LINKS = [
  { href: "#work", label: "WORK" },
  { href: "#about", label: "ABOUT" },
  { href: "#lab", label: "LAB" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar() {
  // State that lives only in the browser: is the mobile menu open?
  // useState returns [currentValue, functionToUpdateIt].
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      data-lenis-prevent
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className={cn(
          "w-full max-w-5xl flex items-center justify-between",
          "px-5 py-3 rounded-[var(--radius-md)]",
          // Glassmorphism: semi-transparent background + blur.
          // Used ONLY here, per the design brief — not site-wide.
          "bg-background/60 backdrop-blur-md border border-border"
        )}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="text-small font-semibold tracking-tight hover:text-accent transition-colors"
        >
          SID.
        </a>

        {/* Desktop links: hidden below the md breakpoint, shown above it */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-eyebrow hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu trigger: only visible below md breakpoint */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu panel: only rendered in the DOM when open.
          Conditional rendering with && — if isOpen is false, the
          expression short-circuits and nothing renders. */}
      {isOpen && (
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden absolute top-20 w-[calc(100%-2rem)] max-w-5xl",
            "bg-background/90 backdrop-blur-md border border-border rounded-[var(--radius-md)]",
            "flex flex-col p-5 gap-4"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-h2 hover:text-accent transition-colors"
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

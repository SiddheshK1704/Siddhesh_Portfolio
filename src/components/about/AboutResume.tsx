import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

// AboutResume — the resume CTA that closes the About section.
//
// SERVER COMPONENT — a link and some text, no interactivity needed.
//
// DESIGN APPROACH:
//   "Anyway," in muted h2 size works as a conversational bridge —
//   it signals we're wrapping up without being formal. Then the
//   heading and CTA button below.
//
//   The button uses the same ghost-border style as the Hero's
//   "Get in Touch" and the project GitHub buttons — consistent
//   interaction language across the site.
//
// RESUME FILE:
//   The href points to /resume.pdf. This file does NOT currently
//   exist in /public. It's a clearly marked placeholder — the user
//   needs to:
//   1. Place their resume PDF at: public/resume.pdf
//   2. The link will work automatically (Next.js serves /public
//      files at the root URL)
//
//   The component will work correctly once the file is added.
//   No code changes needed.

export function AboutResume() {
  return (
    <div className="px-6 lg:px-16 pt-24 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* ── Conversational bridge ────────────────────────── */}
        <Reveal>
          <p className="text-h2 text-muted">Anyway,</p>
        </Reveal>

        {/* ── Heading ──────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <h3 className="text-h1 max-w-2xl">
            if you&apos;re here for the formal version —
          </h3>
        </Reveal>

        {/* ── CTA button ───────────────────────────────────── 
            Ghost-border button matching the site's existing button
            language. Opens in a new tab since it's a PDF download.
            
            TODO: Replace /resume.pdf with actual resume file.
            Place the file at: public/resume.pdf */}
        <Reveal delay={0.2}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] transition-all hover:border-accent hover:text-accent w-fit"
          >
            View my resume
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

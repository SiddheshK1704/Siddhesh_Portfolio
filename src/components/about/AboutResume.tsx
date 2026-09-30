import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

// AboutResume — the resume CTA that closes the About section.
//
// SERVER COMPONENT — links and some text, no JS needed.
//
// DESIGN:
//   Left: "Anyway," as a muted conversational bridge, the heading, and a
//   solid CTA (same shape as the Hero's primary button).
//   Right: the resume presented as a physical document — two stacked
//   sheets on a faint spotlight, drawn with abstract "text" lines (no
//   words; it's decoration). Hovering/focusing either link straightens
//   and lifts the sheet (CSS :has, see .resume-* in globals.css).
//   The sheet is a second, mouse-only link to the same file: hidden from
//   screen readers and the tab order so the CTA stays the single stop.

const RESUME_URL =
  "https://drive.google.com/file/d/1qfuO4wm9FBQ-H2w3hfAi_WoNR1yYJ_9b/view?usp=sharing";

/** Abstract section: accent rule + a few lines of varying length */
function SheetBlock({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-1.75">
      <span className="resume-rule block h-0.75 bg-accent/80" />
      {lines.map((w, i) => (
        <span key={i} className="block h-1 rounded-full bg-muted/25" style={{ width: w }} />
      ))}
    </div>
  );
}

export function AboutResume() {
  return (
    <div className="px-6 lg:px-16 pt-20 sm:pt-28 pb-28 sm:pb-36">
      <div className="resume-stage max-w-6xl mx-auto border-t border-border/60 pt-16 sm:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        {/* ── Copy + CTA ───────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <Reveal>
            <p className="text-h2 text-muted">Anyway,</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-h1 max-w-2xl">
              if you&apos;re here for the formal version —
            </h3>
          </Reveal>

          <Reveal delay={0.2}>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex w-fit items-center gap-3 rounded-[4px] bg-foreground px-6 py-3 text-small font-medium tracking-tight text-background transition-colors duration-300 hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white"
            >
              View my resume
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </Reveal>
        </div>

        {/* ── The document ─────────────────────────────────── */}
        <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="resume-doc relative mx-auto block w-fit lg:mr-0"
          >
            <span className="resume-spot" />
            <span className="resume-sheet resume-sheet--back" />
            <span className="resume-sheet resume-sheet--front flex flex-col gap-6">
              {/* Header: name + role bars, pixel mark */}
              <span className="flex items-start justify-between gap-4">
                <span className="flex flex-1 flex-col gap-2">
                  <span className="block h-2.25 w-[58%] rounded-full bg-foreground/80" />
                  <span className="block h-1.25 w-[36%] rounded-full bg-muted/40" />
                </span>
                <span className="resume-pixels grid grid-cols-3 gap-0.5">
                  {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((on, i) => (
                    <span key={i} className={`block size-1 ${on ? "bg-accent" : "bg-transparent"}`} />
                  ))}
                </span>
              </span>
              <span className="block h-px w-full bg-border" />
              <SheetBlock lines={["92%", "78%", "64%"]} />
              <SheetBlock lines={["86%", "94%", "52%"]} />
              <SheetBlock lines={["74%", "60%"]} />
            </span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}

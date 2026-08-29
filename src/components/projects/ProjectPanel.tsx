import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectPanelProps = {
  project: Project;
  index: number;
};

// Accent gradients — one per project so each card has a unique
// chromatic identity even before real screenshots are added.
const CARD_ACCENTS = [
  { from: "#3355ff", to: "#6b8cff" }, // blue
  { from: "#8b5cf6", to: "#c084fc" }, // violet
  { from: "#10b981", to: "#34d399" }, // emerald
  { from: "#f59e0b", to: "#fbbf24" }, // amber
];

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const number = String(index + 1).padStart(2, "0");
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* ── Metadata column ────────────────────────────────── */}
      <div className="flex flex-col gap-5 order-2 lg:order-1">
        {/* Project number */}
        <p
          className="text-eyebrow font-semibold tracking-widest"
          style={{ color: accent.from, fontFamily: 'var(--font-oswald), sans-serif' }}
        >
          {number}
        </p>

        {/* Title + arrow link — arrow sits further out & at 45° */}
        <div className="flex items-center gap-6">
          <h3 className="text-h1">{project.title}</h3>
          <Link
            href={`/work/${project.slug}`}
            className="group relative ml-2 flex items-center justify-center w-10 h-10 rounded-full border border-border transition-all duration-300 hover:border-accent hover:scale-110"
            aria-label={`View ${project.title} details`}
          >
            <ArrowUpRight
              size={18}
              className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Summary */}
        <p className="text-body text-muted max-w-md leading-relaxed">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-small border border-border rounded-[var(--radius-sm)] px-3 py-1.5 text-muted transition-colors duration-200 hover:text-foreground hover:border-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 pt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border px-5 py-2.5 text-small font-medium rounded-[var(--radius-sm)] transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <Code2 size={16} />
            GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-small font-medium rounded-[var(--radius-sm)] transition-all duration-300 hover:bg-accent-dim"
            >
              Live
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      {/* ── Visual placeholder column ─────────────────────── */}
      {/* A richly styled geometric placeholder — will be swapped for
          real screenshots later. Each card has its own accent color
          gradient, a subtle grid pattern, and layered depth effects. */}
      <div
        className="order-1 lg:order-2 relative aspect-[4/3] rounded-[var(--radius-md)] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accent.from}08, ${accent.to}04, var(--color-background))`,
          border: `1px solid ${accent.from}20`,
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(${accent.from}40 1px, transparent 1px),
              linear-gradient(90deg, ${accent.from}40 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large watermark number */}
        <span
          aria-hidden
          className="absolute -right-4 -bottom-6 font-semibold select-none leading-none pointer-events-none"
          style={{
            fontSize: "clamp(8rem, 14vw, 14rem)",
            color: `${accent.from}08`,
          }}
        >
          {number}
        </span>

        {/* Floating accent dot — adds visual interest */}
        <div
          className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            boxShadow: `0 0 12px ${accent.from}60`,
          }}
        />

        {/* Corner accent line — a subtle L-shaped detail */}
        <div
          className="absolute top-5 left-5 w-8 h-8"
          style={{
            borderLeft: `2px solid ${accent.from}30`,
            borderTop: `2px solid ${accent.from}30`,
          }}
        />

        {/* Project tagline floating inside the visual */}
        <div className="absolute bottom-6 left-6 right-6">
          <p
            className="text-small tracking-wide"
            style={{ color: `${accent.from}80`, fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            {project.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

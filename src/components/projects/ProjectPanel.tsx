import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectPanelProps = {
  project: Project;
  index: number;
};

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Metadata */}
      <div className="flex flex-col gap-5 order-2 lg:order-1">
        <p className="text-eyebrow text-accent">{number}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-h1">{project.title}</h3>
          <Link
            href={`/work/${project.slug}`}
            className="text-accent hover:text-foreground transition-colors"
            aria-label={`View ${project.title} details`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
        <p className="text-body text-muted max-w-md">{project.summary}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-small border border-border rounded-[var(--radius-sm)] px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border px-5 py-2.5 text-small font-medium rounded-[var(--radius-sm)] hover:border-accent transition-colors"
          >
            <Code2 size={16} />
            GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-small font-medium rounded-[var(--radius-sm)] hover:bg-accent-dim transition-colors"
            >
              Live
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Abstract visual placeholder — a real screenshot goes here
          once available. Deliberately not faking a product screenshot
          in the meantime; this is an honest geometric placeholder
          using the project's own number and tags. */}
      <div className="order-1 lg:order-2 relative aspect-[4/3] border border-border rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center">
        <span
          aria-hidden
          className="absolute text-[10rem] font-semibold text-border select-none leading-none"
        >
          {number}
        </span>

      </div>
    </div>
  );
}

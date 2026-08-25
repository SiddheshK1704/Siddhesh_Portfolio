import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "compact";
};

export function ProjectCard({ project, variant = "compact" }: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative block border border-border rounded-[var(--radius-md)] p-6 md:p-8",
        "hover:border-accent transition-colors",
        isFeatured && "md:col-span-2"
      )}
    >
      <div
        className={cn("flex flex-col gap-3 pr-8", isFeatured && "md:max-w-xl")}
      >
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-eyebrow border border-border rounded-[var(--radius-sm)] px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            "font-semibold tracking-tight",
            isFeatured ? "text-h1" : "text-h2"
          )}
        >
          {project.title}
        </h3>

        <p className="text-body text-muted">{project.tagline}</p>

        {isFeatured && (
          <p className="text-body text-muted mt-2">{project.summary}</p>
        )}
      </div>

      {/* Same treatment on every card, regardless of variant: a
          minimal arrow, invisible until hover. Consistent affordance
          without repeating a text label on all four cards. */}
      <ArrowUpRight
        size={18}
        className={cn(
          "absolute top-6 right-6 md:top-8 md:right-8 text-muted",
          "opacity-0 group-hover:opacity-100 group-hover:text-accent",
          "transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
        )}
      />
    </Link>
  );
}

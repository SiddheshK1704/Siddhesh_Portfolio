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
        "group block border border-border rounded-[var(--radius-md)] p-6 md:p-8",
        "hover:border-accent transition-colors",
        isFeatured && "md:col-span-2"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          isFeatured && "md:flex-row md:items-start md:justify-between md:gap-12"
        )}
      >
        <div className={cn("flex flex-col gap-3", isFeatured && "md:max-w-md")}>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-eyebrow border border-border rounded-[var(--radius-sm)] px-2 py-1">
                {tag}
              </span>
            ))}
          </div>

          <h3 className={cn("font-semibold tracking-tight", isFeatured ? "text-h1" : "text-h2")}>
            {project.title}
          </h3>

          <p className="text-body text-muted">{project.tagline}</p>

          {isFeatured && (
            <p className="text-body text-muted mt-2">{project.summary}</p>
          )}
        </div>

        <div className="flex items-center gap-2 text-small font-medium shrink-0">
          View case study
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}

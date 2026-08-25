import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Tells Next.js, at build time, every valid value of [slug] —
// so it can pre-render /work/lawtalk, /work/launch-control, etc.
// as static HTML instead of building them on-demand per visitor.
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Per-page <title>/description, generated from real project data
// instead of one generic title for every case study.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Sid Khankhoje`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  // params is a Promise in the App Router (since Next.js 15) because
  // route params can depend on async work — must be awaited even
  // though in our case the value is already known synchronously.
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // If someone visits /work/something-that-does-not-exist, render
  // Next.js's built-in 404 page instead of crashing.
  if (!project) {
    notFound();
  }

  return (
    <main className="px-6 lg:px-16 pt-32 pb-24 max-w-3xl mx-auto flex flex-col gap-12">
      <Link
        href="/#work"
        className="flex items-center gap-2 text-small text-muted hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back to work
      </Link>

      <header className="flex flex-col gap-4">
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
        <h1 className="text-h1">{project.title}</h1>
        <p className="text-body text-muted max-w-xl">{project.tagline}</p>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border px-5 py-2.5 text-small font-medium rounded-[var(--radius-sm)] hover:border-accent transition-colors"
          >
            <Code2 size={16} />
            View code
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
      </header>

      <section className="flex flex-col gap-3">
        <p className="text-eyebrow">Problem</p>
        <p className="text-body">{project.problem}</p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-eyebrow">Approach</p>
        <p className="text-body">{project.approach}</p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-eyebrow">Architecture</p>
        <p className="text-body">{project.architecture}</p>
      </section>

      <section className="flex flex-col gap-3">
        <p className="text-eyebrow">Outcome</p>
        <p className="text-body">{project.outcome}</p>
      </section>

      <section className="flex flex-col gap-3 pt-4 border-t border-border">
        <p className="text-eyebrow">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-small border border-border rounded-[var(--radius-sm)] px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}

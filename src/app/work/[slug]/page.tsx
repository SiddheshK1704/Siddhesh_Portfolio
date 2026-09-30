import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, getProjectBySlug, type Project } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { GithubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { LightSwitch } from "@/components/hero/LightSwitch";
import { Screenshot, Section, SectionLabel, Workflow } from "@/components/case-study/parts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every case study as static HTML at build time.
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sid Khankhoje`,
    description: project.summary,
  };
}

/** GitHub + (optional) Live Demo. `size` only changes padding. */
function ProjectLinks({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const pad = size === "lg" ? "px-6 py-3.5" : "px-5 py-3";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 ${pad} rounded-[4px] bg-foreground text-background text-sm font-medium transition-opacity hover:opacity-85`}
      >
        <GithubIcon size={16} />
        View on GitHub
      </a>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 ${pad} rounded-[4px] border border-border text-foreground text-sm font-medium transition-colors hover:border-foreground/40`}
        >
          Live Demo
          <ArrowUpRight size={16} />
        </a>
      )}
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const cs = caseStudies[slug];
  if (!project || !cs) notFound();

  const [lead, ...overviewRest] = cs.overview;
  // This project's position in the Work folder (LawTalk 01 … Slipstream 04)
  const projectNumber = String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0");
  const [primary, ...supporting] = cs.gallery;

  return (
    <main className="relative px-6 lg:px-16 pt-24 sm:pt-28 pb-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* ── Top bar: back + the site's light switch ── */}
        <div className="flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-pixel text-[9px] leading-none uppercase text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </Link>
          <LightSwitch className="relative" />
        </div>

        {/* ── 01 / PROJECT ── */}
        <header className="pt-16 sm:pt-24 pb-14 sm:pb-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <SectionLabel n={projectNumber}>Project</SectionLabel>
              <span className="font-pixel text-[9px] sm:text-[10px] leading-none uppercase text-muted/70">
                {cs.category}
              </span>
            </div>
            <h1 className="text-work font-sans text-foreground mt-6 sm:mt-8">{project.title}</h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
              <p className="lg:col-span-7 text-xl sm:text-2xl leading-snug tracking-tight text-foreground/90 max-w-2xl">
                {project.summary}
              </p>
              <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
                <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Tech stack">
                  {cs.heroTech.map((t) => (
                    <li key={t} className="text-xs text-muted rounded-[3px] border border-border px-2.5 py-1.5">
                      {t}
                    </li>
                  ))}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-14 sm:mt-16">
            {cs.heroFrame === "popup" ? (
              // A small UI (e.g. an extension popup) shown at native size on a
              // quiet stage, rather than stretched into a wide frame.
              <div className="relative overflow-hidden rounded-[8px] border border-border bg-surface/30 px-6 py-14 sm:py-20 flex justify-center">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_50%_45%,rgba(var(--color-accent-rgb),0.12),transparent_70%)]" />
                <div className="relative w-full max-w-[517px] overflow-hidden rounded-[6px] border border-border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
                  <Image
                    src={cs.heroShot.src}
                    alt={cs.heroShot.alt}
                    width={cs.heroShot.width}
                    height={cs.heroShot.height}
                    sizes="(min-width: 640px) 517px, calc(100vw - 96px)"
                    priority
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            ) : (
              <Screenshot shot={cs.heroShot} sizes="(min-width: 1280px) 1152px, calc(100vw - 48px)" priority />
            )}
          </Reveal>
        </header>

        {/* ── 02 / OVERVIEW ── */}
        <Section n="02" label="Overview">
          <p className="text-h2 font-sans font-medium text-foreground">{lead}</p>
          {overviewRest.map((p) => (
            <p key={p} className="mt-6 text-body text-muted leading-relaxed max-w-2xl">
              {p}
            </p>
          ))}
        </Section>

        {/* ── 03 / THE PROBLEM ── */}
        <Section n="03" label="The problem">
          <p className="border-l-2 border-accent pl-6 text-xl sm:text-2xl leading-snug tracking-tight text-foreground/90 max-w-3xl">
            {cs.problem}
          </p>
        </Section>

        {/* ── 04 / HOW IT WORKS ── */}
        <Section n="04" label="How it works" wide>
          <h2 className="text-h1 font-sans text-foreground max-w-3xl">{cs.workflow.heading}</h2>
          <Workflow steps={cs.workflow.steps} />
          {cs.workflow.note && <p className="text-sm text-muted">{cs.workflow.note}</p>}
        </Section>

        {/* ── 05 / TECHNOLOGY ── */}
        <Section n="05" label="Technology">
          <dl className="flex flex-col divide-y divide-border/60 border-y border-border/60">
            {cs.techGroups.map((g) => (
              <div key={g.label} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-3 sm:gap-6 py-5">
                <dt className="font-pixel text-[8px] leading-none uppercase text-muted pt-2">{g.label}</dt>
                <dd className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="text-sm text-foreground rounded-[3px] border border-border bg-surface/30 px-3 py-1.5">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── 06 / KEY FEATURES ── */}
        <Section n="06" label="Key features">
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
            {cs.features.map((f, i) => (
              <li key={f.title} className="flex flex-col gap-3">
                <span className="font-pixel text-[9px] leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.detail}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── SCREENSHOTS: large primary + supporting, captions beside ── */}
        {primary && (
          <section className="border-t border-border/60 py-16 sm:py-24" aria-label="Screenshots">
            <Reveal>
              <SectionLabel>Screenshots</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <Screenshot shot={primary} sizes="(min-width: 1280px) 1152px, calc(100vw - 48px)" />
            </Reveal>
            {supporting.map((s, i) => (
              <Reveal key={s.src} delay={0.06} className="mt-12 sm:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                  <div className={`lg:col-span-8 ${i % 2 === 0 ? "lg:col-start-5" : ""}`}>
                    <Screenshot shot={s} sizes="(min-width: 1024px) 760px, calc(100vw - 48px)" hideCaption />
                  </div>
                  {s.caption && (
                    <p className={`lg:col-span-4 text-sm text-muted leading-relaxed ${i % 2 === 0 ? "lg:row-start-1 lg:col-start-1" : ""}`}>
                      {s.caption}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </section>
        )}

        {/* ── 07 / WHAT I LEARNED ── */}
        <Section n="07" label="What I learned">
          <ol className="flex flex-col divide-y divide-border/60 border-y border-border/60">
            {cs.learned.map((l, i) => (
              <li key={l.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-7">
                <span className="font-pixel text-[9px] leading-none text-accent pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{l.title}</h3>
                  <p className="text-body text-muted leading-relaxed max-w-2xl">{l.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── FINAL ── */}
        <section className="border-t border-border/60 pt-20 sm:pt-28">
          <Reveal>
            <div className="flex flex-col gap-10">
              <h2 className="text-h1 font-sans text-foreground max-w-2xl">
                {project.demoUrl ? "Try it, or read the code." : "Read the code."}
              </h2>
              <ProjectLinks project={project} size="lg" />
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 w-fit font-pixel text-[10px] leading-none uppercase text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to work
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}

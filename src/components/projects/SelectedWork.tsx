"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoLoop } from "@/components/reactbits/LogoLoop";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiTensorflow,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiCplusplus,
  SiC,
  SiVercel,
  SiFlask,
  SiOpencv,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

// Authentic developer tech stack — strictly NO Stripe, NO company marketing logos.
const TECH_STACK = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Flask", Icon: SiFlask, color: "#ffffff" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "Java", Icon: FaJava, color: "#ED8B00" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
];

const techLogos = TECH_STACK.map(({ name, Icon, color }) => ({
  node: (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border border-border/70 bg-surface/30 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-surface/80">
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
      <span className="text-xs font-mono text-muted hover:text-foreground font-medium whitespace-nowrap">
        {name}
      </span>
    </div>
  ),
  ariaLabel: name,
}));

// Technical architectural focus descriptors for each project
const PROJECT_FOCUS: Record<string, { category: string; badge: string; highlight: string }> = {
  lawtalk: {
    category: "AI / RAG Pipeline",
    badge: "Vector Search",
    highlight: "FAISS index + Groq inference for zero-hallucination legal retrieval",
  },
  quicksign: {
    category: "Computer Vision",
    badge: "Object Detection",
    highlight: "Custom-trained YOLOv8 model streaming real-time ASL alphabet predictions",
  },
  xplainify: {
    category: "Developer Tool",
    badge: "Chrome Extension MV3",
    highlight: "Direct browser-to-Gemini REST calls with client-side key storage",
  },
  slipstream: {
    category: "Control Systems",
    badge: "Physics Simulation",
    highlight: "Closed-loop PID slip regulator vs open-loop clutch benchmark at 20kHz",
  },
};

export function SelectedWork() {
  return (
    <section id="work" className="px-6 lg:px-16 pt-16 pb-28 flex flex-col gap-24">
      {/* ── Technology Logo Loop marquee ── */}
      <Reveal>
        <div className="w-full overflow-hidden py-3 border-y border-border/50 bg-surface/10 backdrop-blur-sm">
          <LogoLoop
            logos={techLogos}
            speed={24}
            gap={20}
            logoHeight={32}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
          />
        </div>
      </Reveal>

      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 bg-accent" aria-hidden="true" />
              <p className="text-eyebrow text-muted">01 / SELECTED WORK</p>
            </div>
            <h2 className="text-h1 font-sans tracking-tight text-foreground">
              What I&apos;ve Built.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-body text-muted max-w-sm font-sans leading-relaxed">
            Engineered systems solving practical problems — from RAG pipelines to
            real-time computer vision.
          </p>
        </Reveal>
      </div>

      {/* ── Editorial Project Showcase ── */}
      <div className="max-w-6xl mx-auto w-full flex flex-col divide-y divide-border/60">
        {projects.map((project, idx) => {
          const focus = PROJECT_FOCUS[project.slug] || {
            category: "Software Engineering",
            badge: "Full-Stack",
            highlight: project.tagline,
          };

          return (
            <div
              key={project.slug}
              className="group py-12 lg:py-16 first:pt-4 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Project Index Number & Category */}
                <div className="lg:col-span-2 flex lg:flex-col items-baseline justify-between lg:justify-start gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-accent tracking-wider">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
                    {focus.category}
                  </span>
                </div>

                {/* Project Title, Summary & Details */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="group/title inline-flex items-center gap-3 w-fit"
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold tracking-tight text-foreground group-hover/title:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="text-muted group-hover/title:text-accent group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all duration-200"
                    />
                  </Link>

                  <p className="text-sm font-medium text-foreground/80 font-sans">
                    {project.tagline}
                  </p>

                  <p className="text-body text-muted font-sans leading-relaxed max-w-xl">
                    {project.summary}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-[var(--radius-sm)] border border-border/80 bg-surface/30 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Highlight Card & Direct Actions */}
                <div className="lg:col-span-4 flex flex-col gap-5 lg:pl-6">
                  <div className="p-5 rounded-[var(--radius-md)] border border-border/60 bg-surface/30 backdrop-blur-sm flex flex-col gap-3 group-hover:border-accent/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-semibold">
                        {focus.badge}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                    </div>
                    <p className="text-xs font-mono text-muted leading-relaxed">
                      {focus.highlight}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-1">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-foreground hover:text-accent transition-colors"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight size={14} />
                    </Link>

                    <span className="text-border text-xs">/</span>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>Source</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

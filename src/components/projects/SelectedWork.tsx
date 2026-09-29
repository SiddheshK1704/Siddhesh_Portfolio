"use client";

import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoLoop } from "@/components/reactbits/LogoLoop";
import { projects } from "@/data/projects";
import { ProjectFolder, type FolderProject } from "./ProjectFolder";

import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiFlask,
  SiFastapi,
  SiOpencv,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

// Exactly the skills-section stack, in its grouping order:
// languages → frontend → backend / ML / databases → tools / platforms.
const TECH_STACK = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "Java", Icon: FaJava, color: "#ED8B00" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "var(--color-foreground)" },
  { name: "Flask", Icon: SiFlask, color: "var(--color-foreground)" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "var(--color-foreground)" },
  { name: "Vercel", Icon: SiVercel, color: "var(--color-foreground)" },
  { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
];

// Restrained: monochrome by default, brand color only on hover
const techLogos = TECH_STACK.map(({ name, Icon, color }) => ({
  node: (
    <span
      className="group inline-flex items-center gap-2 px-2.5 py-1 text-muted transition-colors duration-200 hover:text-foreground"
      style={{ "--brand": color } as CSSProperties}
    >
      <Icon className="w-3.5 h-3.5 shrink-0 transition-colors duration-200 group-hover:text-[var(--brand)]" />
      <span className="font-pixel text-[8px] leading-none whitespace-nowrap">{name}</span>
    </span>
  ),
  ariaLabel: name,
}));

// Short category for each project card (existing project descriptors)
const CATEGORY: Record<string, string> = {
  lawtalk: "AI / RAG",
  quicksign: "Computer Vision",
  xplainify: "Developer Tool",
  slipstream: "Frontend",
};

const folderProjects: FolderProject[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  tagline: p.tagline,
  category: CATEGORY[p.slug] ?? "Software",
}));

export function SelectedWork() {
  return (
    <section id="work" className="relative px-6 lg:px-16 pt-28 pb-32 overflow-x-clip">
      <div className="max-w-6xl mx-auto w-full flex flex-col">
        {/* ── Heading ── */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-work font-sans text-foreground">WORK</h2>
            <p className="text-body text-muted font-sans md:text-right md:pb-3 max-w-xs">
              Things I&apos;ve built and shipped.
            </p>
          </div>
        </Reveal>

        {/* ── Technical context: compact, secondary ── */}
        <Reveal delay={0.08} className="mt-12 sm:mt-14">
          <div className="border-y border-border/60 py-2.5" aria-label="Technologies I work with">
            <LogoLoop
              logos={techLogos}
              speed={22}
              gap={8}
              logoHeight={22}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="var(--color-background)"
            />
          </div>
        </Reveal>

        {/* ── The centerpiece: one physical folder ── */}
        <Reveal delay={0.12} className="mt-4 sm:mt-6">
          <ProjectFolder projects={folderProjects} />
        </Reveal>
      </div>
    </section>
  );
}

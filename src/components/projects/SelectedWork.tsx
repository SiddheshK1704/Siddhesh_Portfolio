"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LogoLoop } from "@/components/reactbits/LogoLoop";
import Folder from "@/components/reactbits/Folder";
import { TechIcon } from "@/components/ui/TechIcons";
import { projects } from "@/data/projects";

// Required tech stack for LogoLoop — strictly NO Stripe.
const TECH_STACK = [
  { id: "python", name: "Python" },
  { id: "javascript", name: "JavaScript" },
  { id: "c++", name: "C++" },
  { id: "c", name: "C" },
  { id: "java", name: "Java" },
  { id: "html5", name: "HTML5" },
  { id: "css3", name: "CSS3" },
  { id: "tailwind css", name: "Tailwind CSS" },
  { id: "react", name: "React" },
  { id: "next.js", name: "Next.js" },
  { id: "flask", name: "Flask" },
  { id: "fastapi", name: "FastAPI" },
  { id: "opencv", name: "OpenCV" },
  { id: "mysql", name: "MySQL" },
  { id: "supabase", name: "Supabase" },
  { id: "git", name: "Git" },
  { id: "github", name: "GitHub" },
  { id: "vercel", name: "Vercel" },
  { id: "vs code", name: "VS Code" },
];

const techLogos = TECH_STACK.map((tech) => ({
  node: (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[var(--radius-sm)] border border-border/60 bg-surface/40 backdrop-blur-sm transition-all duration-200 hover:border-accent/60 hover:bg-surface/80">
      <TechIcon name={tech.id} className="w-4 h-4 flex-shrink-0" />
      <span className="text-xs font-mono text-foreground/90 font-medium whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  ),
  ariaLabel: tech.name,
}));

export function SelectedWork() {
  const folderItems = projects.map((project, idx) => (
    <Link
      key={project.slug}
      href={`/work/${project.slug}`}
      className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between text-left group/card no-underline select-none bg-gradient-to-b from-surface/95 to-surface border border-white/10 rounded-[10px] hover:border-accent/80 transition-all shadow-xl"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-accent font-semibold tracking-wider">
            0{idx + 1}
          </span>
          <ArrowUpRight
            size={13}
            className="text-muted group-hover/card:text-accent group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all"
          />
        </div>
        <h4 className="font-bold text-xs text-white group-hover/card:text-accent transition-colors line-clamp-1">
          {project.title}
        </h4>
        <p className="text-[9px] text-muted line-clamp-2 leading-tight">
          {project.tagline}
        </p>
      </div>
      <div className="pt-1 border-t border-white/10 flex items-center justify-between mt-1">
        <span className="text-[8px] font-mono text-muted uppercase truncate max-w-[60px]">
          {project.tags[0]}
        </span>
        <span className="text-[9px] font-mono text-accent font-semibold flex items-center gap-0.5">
          VIEW →
        </span>
      </div>
    </Link>
  ));

  return (
    <section id="work" className="px-6 lg:px-16 pt-20 pb-20 flex flex-col gap-16">
      {/* Technology Logo Loop marquee with real SVG logos */}
      <Reveal>
        <div className="w-full overflow-hidden py-3 border-y border-border/40 bg-surface/10 backdrop-blur-sm">
          <LogoLoop
            logos={techLogos}
            speed={24}
            gap={20}
            logoHeight={34}
            pauseOnHover={true}
            scaleOnHover={false}
            fadeOut={true}
          />
        </div>
      </Reveal>

      {/* Section Header */}
      <Reveal delay={0.1}>
        <div className="text-center flex flex-col items-center gap-3 max-w-xl mx-auto">
          <p className="text-eyebrow">Work</p>
          <h2 className="text-h1">What I&apos;ve Built</h2>
        </div>
      </Reveal>

      {/* Centered Large Folder component */}
      <Reveal delay={0.15}>
        <div className="flex flex-col items-center justify-center pt-8 pb-10">
          <div className="relative pb-6">
            <Folder
              color="#3355ff"
              size={1.6}
              items={folderItems}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5 pt-6">
            <span className="font-sans text-sm sm:text-base font-bold tracking-[0.25em] text-foreground uppercase">
              WORK
            </span>
            <span className="text-xs font-mono text-muted">
              Hover to open · Click to explore 4 projects
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LogoLoop } from "@/components/reactbits/LogoLoop";
import Folder from "@/components/reactbits/Folder";
import { projects } from "@/data/projects";

// Required tech stack for LogoLoop — strictly NO Stripe.
const TECH_STACK = [
  "Python",
  "JavaScript",
  "C++",
  "C",
  "Java",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "React",
  "Next.js",
  "Flask",
  "FastAPI",
  "OpenCV",
  "MySQL",
  "Supabase",
  "Git",
  "GitHub",
  "Vercel",
  "VS Code",
];

const techLogos = TECH_STACK.map((tech) => ({
  node: (
    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/70 bg-surface/60 text-xs font-mono text-muted whitespace-nowrap backdrop-blur-sm transition-all duration-200 hover:text-white hover:border-accent/80 hover:bg-accent/10">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      {tech}
    </span>
  ),
  ariaLabel: tech,
}));

export function SelectedWork() {
  const folderItems = projects.map((project, idx) => (
    <Link
      key={project.slug}
      href={`/work/${project.slug}`}
      className="w-full h-full p-2.5 flex flex-col justify-between text-left group/card no-underline select-none bg-gradient-to-b from-surface/80 to-surface border border-white/10 rounded-[10px] hover:border-accent/60 transition-colors"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-accent font-semibold tracking-wider">
            0{idx + 1}
          </span>
          <span className="text-[8px] font-mono text-muted uppercase">
            {project.tags[0]}
          </span>
        </div>
        <h4 className="font-bold text-xs text-white group-hover/card:text-accent transition-colors line-clamp-1 mt-1">
          {project.title}
        </h4>
        <p className="text-[9px] text-muted line-clamp-2 mt-0.5 leading-tight">
          {project.tagline}
        </p>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-white/10 mt-1">
        <span className="text-[8px] font-mono text-muted/80">EXPLORE</span>
        <span className="text-[10px] text-accent font-bold group-hover/card:translate-x-0.5 transition-transform">
          →
        </span>
      </div>
    </Link>
  ));

  return (
    <section id="work" className="px-6 lg:px-16 pt-24 pb-8 flex flex-col gap-10">
      {/* React Bits LogoLoop marquee */}
      <Reveal>
        <div className="w-full overflow-hidden py-4 border-y border-border/40 bg-surface/10 backdrop-blur-sm">
          <LogoLoop
            logos={techLogos}
            speed={28}
            gap={20}
            logoHeight={32}
            pauseOnHover={true}
            scaleOnHover={false}
            fadeOut={true}
          />
        </div>
      </Reveal>

      {/* Header with Interactive Folder */}
      <Reveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow">Work</p>
            <h2 className="text-h1">What I&apos;ve Built</h2>
          </div>

          {/* Interactive React Bits Folder component */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="relative pt-6 pb-2 px-8">
              <Folder
                color="#3355ff"
                size={1.1}
                items={folderItems}
              />
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                WORK
              </span>
              <span className="text-[11px] text-muted tracking-tight">
                Hover to preview · Click to expand 4 projects
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

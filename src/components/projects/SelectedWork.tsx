import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWork() {
  return (
    <section id="work" className="px-6 lg:px-16 py-24 flex flex-col gap-10">
      <Reveal>
        <div className="flex flex-col gap-3">
          <p className="text-eyebrow">What I&apos;ve Built</p>
          <h2 className="text-h1 leading-[0.95]">
            SELECTED
            <br />
            WORK
          </h2>
        </div>
      </Reveal>

      {/* 2-column grid: featured projects span both columns
          (md:col-span-2, set inside ProjectCard), compact ones
          take a single column — this is what creates the varied
          rhythm instead of a uniform grid of identical boxes. */}
      {/* TEMPORARY: this grid is fully replaced by ProjectDepthStack
          in Phase D. Keeping it functional in the meantime (all
          cards "compact" now that `featured` is gone) so the site
          stays buildable between phases. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} variant="compact" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

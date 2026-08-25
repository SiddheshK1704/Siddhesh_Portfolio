import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function SelectedWork() {
  return (
    <section id="work" className="px-6 lg:px-16 py-24 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-eyebrow">Selected Work</p>
        <h2 className="text-h1">Real systems, not tutorials.</h2>
      </div>

      {/* 2-column grid: featured projects span both columns
          (md:col-span-2, set inside ProjectCard), compact ones
          take a single column — this is what creates the varied
          rhythm instead of a uniform grid of identical boxes. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant={project.featured ? "featured" : "compact"}
          />
        ))}
      </div>
    </section>
  );
}

import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { ProjectDepthStack } from "@/components/projects/ProjectDepthStack";
import { About } from "@/components/about/About";

// v2 page skeleton — section order matches the spec:
//   Hero -> cinematic transition (built into Hero, Phase C)
//   -> Selected Work heading -> Project Depth Stack (Phase D)
//   -> About (Phase E)
//   -> Contact (Phase F)
//   -> Footer (Phase G)
//
// The intro sequence (Phase B) is NOT rendered here — it's a
// full-screen overlay mounted once in layout.tsx, ahead of the page
// content, not a section within the page flow.
export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SelectedWork />
      <ProjectDepthStack />

      <About />

      <section id="contact" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">CONTACT (placeholder — Phase F)</h2>
      </section>

      {/* Footer (placeholder — Phase G) */}
    </main>
  );
}

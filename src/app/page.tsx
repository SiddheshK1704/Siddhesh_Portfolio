import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { DriveSection } from "@/components/drive/DriveSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SelectedWork />

      <section id="about" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">ABOUT (placeholder — Phase 8)</h2>
      </section>

      <DriveSection />

      <section id="contact" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">CONTACT (placeholder — Phase 11)</h2>
      </section>
    </main>
  );
}

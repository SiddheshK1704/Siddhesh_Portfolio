import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />

      <section id="work" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">WORK (placeholder — Phase 6)</h2>
      </section>

      <section id="about" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">ABOUT (placeholder — Phase 8)</h2>
      </section>

      <section id="lab" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">LAB (placeholder — Phase 9)</h2>
      </section>

      <section id="contact" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">CONTACT (placeholder — Phase 11)</h2>
      </section>
    </main>
  );
}

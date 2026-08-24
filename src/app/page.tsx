export default function Home() {
  return (
    <main id="top" className="flex flex-col">
      <section className="min-h-screen flex flex-col justify-center gap-6 px-8">
        <p className="text-eyebrow">Phase 4 — Navbar Preview</p>
        <h1 className="text-display">
          SID<br />
          KHANKHOJE
        </h1>
        <p className="text-body max-w-xl text-muted">
          Scroll down or use the nav above to jump between placeholder
          sections. Real content replaces these in later phases.
        </p>
      </section>

      <section id="work" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">WORK (placeholder)</h2>
      </section>

      <section id="about" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">ABOUT (placeholder)</h2>
      </section>

      <section id="lab" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">LAB (placeholder)</h2>
      </section>

      <section id="contact" className="min-h-screen flex items-center px-8">
        <h2 className="text-h1">CONTACT (placeholder)</h2>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center gap-6 px-8">
      <p className="text-eyebrow">Phase 3 — Design Tokens Preview</p>
      <h1 className="text-display">
        SID<br />
        KHANKHOJE
      </h1>
      <p className="text-body max-w-xl text-muted">
        This paragraph uses the muted color token and body text scale, to
        confirm the fluid clamp() sizing and color system are wired up
        correctly before we build real sections.
      </p>
      <button className="w-fit border border-border bg-accent text-foreground px-6 py-3 text-small rounded-[var(--radius-sm)] hover:bg-accent-dim transition-colors">
        Sharp geometric button
      </button>
    </main>
  );
}

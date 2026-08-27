import { Reveal } from "@/components/ui/Reveal";

// Just the heading moment now — the actual project presentation
// lives in ProjectDepthStack. Kept as its own normal-flow section
// (not pinned) so it scrolls past normally before the depth stack
// takes over.
export function SelectedWork() {
  return (
    <section id="work" className="px-6 lg:px-16 py-24 flex flex-col gap-3">
      <Reveal>
        <div className="flex flex-col gap-3">
          <p className="text-eyebrow">Work</p>
          <h2 className="text-h1">What I&apos;ve Built</h2>
        </div>
      </Reveal>
    </section>
  );
}

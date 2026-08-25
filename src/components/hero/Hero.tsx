import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CursorGlow } from "@/components/ui/CursorGlow";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-6 lg:px-16 pt-32 pb-16"
    >
      {/* Subtle glow that follows the cursor around the hero,
          replacing the earlier static blurred circle. */}
      <CursorGlow />

      {/* Text column */}
      <div className="relative flex flex-col gap-6 lg:w-3/5">
        <Reveal>
          <p className="text-eyebrow">AI/ML &amp; Software Engineering</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-display">
            SIDDHESH
            <br />
            KHANKHOJE
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body max-w-lg text-muted">
            Building intelligent systems and software experiences — from RAG
            pipelines to full-stack products. Currently studying AI/ML at SRM
            University, Chennai.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#work"
              className="inline-block border border-accent bg-accent px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] transition-all hover:bg-accent-dim hover:scale-[1.03]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-block border border-border px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] transition-all hover:border-accent hover:scale-[1.03]"
            >
              Get in Touch
            </a>
          </div>
        </Reveal>
      </div>

      {/* Photo column */}
      <Reveal delay={0.15} className="relative lg:w-2/5 w-full flex justify-center lg:justify-end">
        <div className="relative w-full max-w-sm aspect-[3/4] border border-border rounded-[var(--radius-md)] overflow-hidden">
          <Image
            src="/images/sid.jpg"
            alt="Sid Khankhoje standing on a beach at sunset, looking toward the horizon"
            fill
            priority
            sizes="(min-width: 1024px) 384px, 90vw"
            className="object-cover object-[50%_30%]"
          />
          {/* Subtle blue-tinted overlay ties the photo into the
              black/white/blue system without hiding the real photo. */}
          <div className="absolute inset-0 bg-accent/10 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-border pointer-events-none" />
        </div>
      </Reveal>
    </section>
  );
}

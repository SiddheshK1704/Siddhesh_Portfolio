import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { Shot, Step } from "@/data/caseStudies";

/** Pixel section label, e.g. "02 / OVERVIEW". The one place Press Start
 *  2P appears in a case study besides small meta. */
export function SectionLabel({ n, children }: { n?: string; children: string }) {
  return (
    <p className="font-pixel text-[9px] sm:text-[10px] leading-none uppercase text-muted">
      {n && <span className="text-accent">{n}</span>}
      {n && <span className="mx-2 text-border">/</span>}
      {children}
    </p>
  );
}

/**
 * Editorial section: label in a narrow left column, content on the right
 * (stacked on mobile). `wide` puts the label above full-width content.
 */
export function Section({
  n,
  label,
  wide,
  children,
}: {
  n?: string;
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60 py-16 sm:py-24">
      <Reveal>
        {wide ? (
          <div className="flex flex-col gap-10">
            <SectionLabel n={n}>{label}</SectionLabel>
            {children}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
            <div className="lg:col-span-4 lg:pt-2">
              <SectionLabel n={n}>{label}</SectionLabel>
            </div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        )}
      </Reveal>
    </section>
  );
}

/** A screenshot at its true aspect ratio, in a quiet frame. */
export function Screenshot({
  shot,
  sizes,
  priority,
  hideCaption,
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  hideCaption?: boolean;
}) {
  const img = (
    <div className="overflow-hidden rounded-[6px] border border-border bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className="block w-full h-auto"
      />
    </div>
  );
  if (!shot.caption || hideCaption) return <figure>{img}</figure>;
  return (
    <figure className="flex flex-col gap-3">
      {img}
      <figcaption className="text-sm text-muted leading-relaxed max-w-xl">{shot.caption}</figcaption>
    </figure>
  );
}

/**
 * The real request/data flow as numbered steps: a horizontal sequence on
 * large screens, a vertical rail on small ones.
 */
export function Workflow({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid grid-cols-1 lg:grid-flow-col lg:auto-cols-fr gap-0 lg:gap-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative flex gap-5 lg:flex-col lg:gap-0 pb-8 lg:pb-0 last:pb-0"
        >
          {/* Marker + connector */}
          <div className="relative flex flex-col items-center lg:flex-row lg:items-center lg:mb-5 shrink-0">
            <span className="font-pixel text-[9px] leading-none text-accent grid place-items-center w-8 h-8 rounded-[4px] border border-border bg-surface/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <>
                <span aria-hidden="true" className="w-px flex-1 bg-border lg:hidden mt-2" />
                <span aria-hidden="true" className="hidden lg:block h-px flex-1 bg-border ml-3" />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 pr-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.detail}</p>
            {s.tech && (
              <p className="mt-1 text-xs text-foreground/70">
                <span className="inline-block rounded-[3px] border border-border px-2 py-1">{s.tech}</span>
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

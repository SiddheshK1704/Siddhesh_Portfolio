import { forwardRef } from "react";

type ProjectProgressIndicatorProps = {
  total: number;
};

/**
 * forwardRef here specifically so the PARENT (ProjectDepthStack) can
 * get a direct DOM reference to the number span and mutate its
 * textContent from inside a GSAP scroll callback — same performance
 * reasoning as the old speed readout: this updates on every scroll
 * tick, so it bypasses React state/re-renders entirely.
 */
export const ProjectProgressIndicator = forwardRef<
  HTMLSpanElement,
  ProjectProgressIndicatorProps
>(function ProjectProgressIndicator({ total }, ref) {
  return (
    <div className="absolute bottom-8 right-6 lg:right-16 z-10 flex items-baseline gap-2 font-mono text-small text-muted pointer-events-none">
      <span ref={ref} className="text-foreground text-h2 font-semibold tabular-nums">
        01
      </span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
});

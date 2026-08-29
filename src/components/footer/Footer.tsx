/**
 * Footer — quiet ending featuring an oversized background "SID." typographic watermark.
 * 
 * SERVER COMPONENT — 3-layer architecture:
 *   Layer 1: Background container (relative overflow-hidden)
 *   Layer 2: Giant translucent "SID." watermark (z-0, bottom-right anchored, partially cropped)
 *   Layer 3: Foreground information (z-10, crisp readable text layered on top)
 */
export function Footer() {
  return (
    <footer className="relative w-full border-t border-border px-6 lg:px-16 pt-24 pb-16 overflow-hidden">
      
      {/* ── Layer 2: Giant Background Typographic Watermark ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2vw] bottom-[-22%] sm:bottom-[-28%] z-0 select-none opacity-[0.07] text-foreground font-bold tracking-tighter leading-none"
      >
        <span className="text-[clamp(9rem,28vw,26rem)] block font-sans">
          SID.
        </span>
      </div>

      {/* ── Layer 3: Foreground Footer Information ──────────── */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
        
        {/* Left: Brand & Tagline */}
        <div className="flex flex-col gap-1">
          <a
            href="#top"
            className="text-small font-semibold tracking-tight hover:text-accent transition-colors w-fit"
          >
            SID.
          </a>
          <p className="text-eyebrow text-muted">
            CHENNAI, INDIA — {new Date().getFullYear()}
          </p>
        </div>

        {/* Right: Copyright & Technical Note (Visually sits on top of the giant SID.) */}
        <div className="flex flex-col sm:items-end gap-1 text-eyebrow">
          <p className="text-foreground/90 font-medium">
            © {new Date().getFullYear()} SIDDHESH KHANKHOJE
          </p>
          <p className="text-muted">
            BUILT WITH NEXT.JS, TAILWIND &amp; MOTION
          </p>
        </div>

      </div>
    </footer>
  );
}

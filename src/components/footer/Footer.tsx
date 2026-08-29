/**
 * Footer — quiet, minimalist ending to the portfolio.
 * 
 * SERVER COMPONENT — pure static markup.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-border px-6 lg:px-16 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
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

        {/* Copyright & Technical note */}
        <div className="flex flex-col sm:items-end gap-1 text-eyebrow text-muted">
          <p>© {new Date().getFullYear()} SIDDHESH KHANKHOJE</p>
          <p>BUILT WITH NEXT.JS, TAILWIND &amp; MOTION</p>
        </div>

      </div>
    </footer>
  );
}


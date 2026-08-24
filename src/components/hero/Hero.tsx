import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="min-h-screen flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-6 lg:px-16 pt-32 pb-16"
    >
      {/* Text column */}
      <div className="flex flex-col gap-6 lg:w-3/5">
        <p className="text-eyebrow">AI/ML &amp; Software Engineering</p>

        <h1 className="text-display">
          SID
          <br />
          KHANKHOJE
        </h1>

        <p className="text-body max-w-lg text-muted">
          Building intelligent systems and software experiences — from RAG
          pipelines to full-stack products. Currently studying AI/ML at SRM
          University, Chennai.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="#work"
            className="border border-accent bg-accent px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] hover:bg-accent-dim transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="border border-border px-6 py-3 text-small font-medium rounded-[var(--radius-sm)] hover:border-accent transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Photo column */}
      <div className="lg:w-2/5 w-full flex justify-center lg:justify-end">
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
      </div>
    </section>
  );
}

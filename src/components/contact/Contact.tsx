"use client";

import { ArrowUpRight } from "lucide-react";
import { CONTACT_DATA } from "@/data/contact";
import MagnetLines from "@/components/reactbits/MagnetLines";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact — the final typographic CTA of the portfolio.
 * Features clean normal typography and an open decorative MagnetLines field.
 */
export function Contact() {

  const directChannels = [
    {
      ...CONTACT_DATA.email,
      subtitle: "siddheshkhankhoje@gmail.com",
    },
    {
      ...CONTACT_DATA.linkedin,
      subtitle: "in/siddhesh-khankhoje",
    },
    {
      ...CONTACT_DATA.instagram,
      subtitle: "@siddheshk_17",
    },
  ];

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-between px-6 lg:px-16 pt-24 pb-28 border-t border-border"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-14 md:gap-18">
        
        {/* ── Section Eyebrow ───────────────────────────────── */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 bg-accent" aria-hidden="true" />
            <p className="text-eyebrow">CONTACT</p>
          </div>
        </Reveal>

        {/* ── Main Typography CTA + Open MagnetLines ── */}
        <Reveal delay={0.1}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
            
            {/* Typography CTA: Clean normal text */}
            <div className="relative w-full lg:w-3/5 flex items-center select-none">
              <h2
                id="contact-heading"
                className="text-display max-w-3xl leading-[0.95] tracking-tight uppercase"
              >
                IF YOU MADE IT <br />
                THIS FAR, <br />
                <span className="text-muted">WE SHOULD </span>
                <span className="text-accent">PROBABLY TALK.</span>
              </h2>
            </div>

            {/* Open, unboxed MagnetLines decorative interaction */}
            <div className="w-full lg:w-72 h-44 sm:h-52 flex items-center justify-center pointer-events-auto">
              <MagnetLines
                rows={6}
                columns={9}
                containerSize="100%"
                lineColor="#3355ff"
                lineWidth="2px"
                lineHeight="16px"
                baseAngle={-20}
                className="w-full h-full"
              />
            </div>

          </div>
        </Reveal>

        {/* ── Reach Out Channels (Email, LinkedIn & Instagram) ── */}
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-6 pt-2">
            <p className="text-eyebrow text-muted">GET IN TOUCH</p>

            <nav aria-label="Direct contact channels">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {directChannels.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      {...(item.type === "external"
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center justify-between p-5 md:p-6 lg:p-7 border border-border rounded-[var(--radius-sm)] bg-surface/40 hover:border-accent hover:bg-surface/80 transition-all duration-200"
                    >
                      <div className="flex flex-col gap-1 min-w-0 pr-2">
                        <span className="text-h2 font-medium tracking-tight group-hover:text-accent transition-colors truncate">
                          {item.label}
                        </span>
                        <span className="text-small text-muted font-mono truncate">
                          {item.subtitle}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="text-muted shrink-0 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

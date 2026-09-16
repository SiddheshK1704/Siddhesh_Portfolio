"use client";

import { ArrowUpRight } from "lucide-react";
import { CONTACT_DATA } from "@/data/contact";
import WarpText from "@/components/reactbits/WarpText";
import MagnetLines from "@/components/reactbits/MagnetLines";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Contact — the final typographic CTA of the portfolio.
 * Enhanced with React Bits WarpText shader canvas and MagnetLines interactive widget.
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
      className="relative flex flex-col justify-between px-6 lg:px-16 pt-28 pb-28 border-t border-border"
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

        {/* ── Main Typography CTA with WarpText + MagnetLines Widget ── */}
        <Reveal delay={0.1}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* WarpText Interactive Shader Canvas */}
            <div className="relative w-full lg:w-3/4 h-[240px] sm:h-[300px] md:h-[360px] rounded-[var(--radius-md)] border border-border/70 bg-surface/30 backdrop-blur-md overflow-hidden group shadow-2xl p-4 flex items-center justify-center">
              <h2 id="contact-heading" className="sr-only">
                IF YOU MADE IT THIS FAR, WE SHOULD PROBABLY TALK.
              </h2>
              <div className="w-full h-full">
                <WarpText
                  text={"IF YOU MADE IT\nTHIS FAR,\nWE SHOULD\nPROBABLY TALK."}
                  color="#f5f5f5"
                  warpStrength={1.2}
                  warpScale={1.1}
                  speed={0.7}
                  pointerInfluence={1.2}
                  pointerStrength={1.4}
                  refraction={0.08}
                  ripple={true}
                  fontSize={40}
                  fontWeight={800}
                  className="w-full h-full cursor-pointer"
                />
              </div>
            </div>

            {/* Interactive MagnetLines Square Widget */}
            <div className="flex flex-col items-center gap-3 w-full lg:w-1/4">
              <div className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] rounded-[var(--radius-md)] border border-border/80 bg-surface/30 backdrop-blur-md p-3 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-300 hover:border-accent/50 group">
                <MagnetLines
                  rows={7}
                  columns={7}
                  containerSize="180px"
                  lineColor="#3355ff"
                  lineWidth="2px"
                  lineHeight="14px"
                  baseAngle={-20}
                />
              </div>
              <span className="font-mono text-[11px] text-muted tracking-tight text-center">
                Interactive Grid · Follows Cursor
              </span>
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

import { Reveal } from "@/components/ui/Reveal";

// AboutHumor — the subtle personal humor beat.
//
// SERVER COMPONENT — static content only.
//
// DESIGN APPROACH:
//   A compact monospace checklist that reads like a system log or
//   configuration file. The first six items are genuine interests
//   (confirming what was introduced earlier). The last item is
//   the humor — a self-aware observation that lands because the
//   format is deadpan and the preceding items set up the rhythm.
//
//   Visual treatment:
//   - Monospace font for the list (matches the eyebrow/code aesthetic)
//   - Muted text for the regular items, foreground for the punchline
//   - Accent-colored checkmarks
//   - Hairline borders between rows
//   - A visual gap (pt-4) before the last item to create a beat
//
//   The humor works because:
//   1. The format is dry (checklist, not joke setup)
//   2. The content is self-aware (overthinking is relatable)
//   3. It doesn't announce itself ("I have a sense of humor")
//   4. It appears after the genuine/personal sections, so the
//      reader already knows this person — and the humor confirms it

const CHECKLIST = [
  { label: "F1", isLast: false },
  { label: "Football", isLast: false },
  { label: "Chess", isLast: false },
  { label: "Books", isLast: false },
  { label: "Driving", isLast: false },
  { label: "Good conversations", isLast: false },
  {
    label: "Overthinking things that didn\u2019t need to be overthought",
    isLast: true,
  },
];

export function AboutHumor() {
  return (
    <div className="px-6 lg:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="max-w-md">

            {/* ── Eyebrow ────────────────────────────────────── */}
            <p className="text-eyebrow mb-8">Things I like</p>

            {/* ── Checklist ──────────────────────────────────── 
                Each row is a flex container: label left, checkmark
                right. The font-mono class gives it a terminal/config
                aesthetic. The last item gets extra top padding and
                foreground color — the visual "beat" before the
                punchline. */}
            <div className="border-t border-border">
              {CHECKLIST.map((item) => (
                <div
                  key={item.label}
                  className={`
                    flex items-baseline justify-between py-3 border-b border-border
                    font-mono text-small
                    ${item.isLast ? "pt-6 mt-1" : ""}
                  `}
                >
                  <span
                    className={
                      item.isLast ? "text-foreground" : "text-muted"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="text-accent ml-8 shrink-0">✓</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

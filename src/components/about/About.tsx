import { AboutIntro } from "./AboutIntro";
import { AboutInterests } from "./AboutInterests";
import { AboutMotorsports } from "./AboutMotorsports";
import { AboutPeople } from "./AboutPeople";
import { AboutHumor } from "./AboutHumor";
import { AboutResume } from "./AboutResume";

// The outermost About container. This is a SERVER COMPONENT — no
// "use client" directive — because it does nothing interactive.
// It just composes children in order. That means Next.js sends zero
// JavaScript for this specific file; only the client-component
// children (like <Reveal> inside each sub-section) ship JS.
//
// id="about" lives here so the Navbar's #about link scrolls to the
// correct position — same pattern as id="work" on SelectedWork.
//
// NARRATIVE ORDER:
//   1. AboutIntro     — "I build things, ask questions..." (professional identity)
//   2. AboutInterests — "When I'm not building things..." (personal interests)
//   3. AboutMotorsports — Motorsports / Max Verstappen (deep dive)
//   4. AboutPeople    — People / Conversations (social personality)
//   5. AboutHumor     — Subtle self-aware humor beat
//   6. AboutResume    — Resume CTA (formal close)
export function About() {
  return (
    <section id="about" className="flex flex-col">
      <AboutIntro />
      <AboutInterests />
      <AboutMotorsports />
      <AboutPeople />
      <AboutHumor />
      <AboutResume />
    </section>
  );
}

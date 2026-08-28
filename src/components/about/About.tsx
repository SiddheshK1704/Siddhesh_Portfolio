import { AboutIntro } from "./AboutIntro";

// The outermost About container. This is a SERVER COMPONENT — no
// "use client" directive — because it does nothing interactive.
// It just composes children in order. That means Next.js sends zero
// JavaScript for this specific file; only the client-component
// children (like <Reveal> inside AboutIntro) ship JS.
//
// id="about" lives here so the Navbar's #about link scrolls to the
// correct position — same pattern as id="work" on SelectedWork.
export function About() {
  return (
    <section id="about" className="flex flex-col">
      <AboutIntro />
      {/* Phase 4: <AboutInterests /> */}
      {/* Phase 5: <AboutMotorsports /> */}
      {/* Phase 6: <AboutPeople /> */}
      {/* Phase 7: <AboutHumor /> */}
      {/* Phase 8: <AboutResume /> */}
    </section>
  );
}

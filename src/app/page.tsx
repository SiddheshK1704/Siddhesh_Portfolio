import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { BottomBlur } from "@/components/ui/BottomBlur";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <SelectedWork />

      <About />

      <Contact />

      <Footer />
      <BottomBlur />
    </main>
  );
}


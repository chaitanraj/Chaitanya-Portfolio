import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PipesBackground from "@/components/PipesBackground";
import TechStack3 from "@/components/TechStack3";
import Margin from "@/components/Margin";
import FloatingDock from "@/components/FloatingDock";

export default function Home() {
  return (
    <main id="home" className="relative">
      <FloatingDock />
      <Hero />
      <About />
      <Margin/>
      <TechStack3/>
      <Margin/>
      <Projects />
      <Margin/>
      <Experience />
      <Margin/>
      <Education />
      <Margin/>
      <Contact />
      <Margin/>
      <Footer />
    </main>
  );
}

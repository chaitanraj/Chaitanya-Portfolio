import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Margin from "@/components/Margin";

const TechStack3 = dynamic(() => import("@/components/TechStack3"));
const Projects = dynamic(() => import("@/components/Projects"));
const Experience = dynamic(() => import("@/components/Experience"));
const Education = dynamic(() => import("@/components/Education"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <About />
      <Margin />
      <TechStack3 />
      <Margin />
      <Projects />
      <Margin />
      <Experience />
      <Margin />
      <Education />
      <Margin />
      <Contact />
      <Margin />
      <Footer />
    </main>
  );
}

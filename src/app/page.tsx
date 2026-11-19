import { SiteNavbar } from "@/components/site/SiteNavbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/Projects";
import { Leadership } from "@/components/site/Leadership";
import { Skills } from "@/components/site/Skills";
import { Interests } from "@/components/site/Interests";
import { NextUp } from "@/components/site/NextUp";
import { Footer } from "@/components/site/Footer";

// The whole site is this one page. Reorder sections here.
export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Leadership />
        <Skills />
        <Interests />
        <NextUp />
      </main>
      <Footer />
    </>
  );
}

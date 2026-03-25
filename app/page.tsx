import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { getAbout, getExperience, getProjects, getSkills } from "@/lib/data";

export default async function Home() {
  const [about, experience, projects, skills] = await Promise.all([
    getAbout(),
    getExperience(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <About data={about} />
      <Experience data={experience} />
      <Projects data={projects} />
      <Skills data={skills} />
      <Contact data={about} />
      <Footer />
    </main>
  );
}

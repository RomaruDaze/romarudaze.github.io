import { useEffect } from "react";
import Home from "./home/home";
import About from "./about/about";
import Skills from "./skills/skills";
import Experience from "./experience/experience";
import Projects from "./projects/projects";
import Contact from "./contact/contact";

function Body() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Home />
      <div className="home-sections">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default Body;

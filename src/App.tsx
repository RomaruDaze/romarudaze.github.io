import Header from "./components/header/header";
import About from "./components/about/about";
import ProjectGrid from "./components/projects/project-grid";
import Timeline from "./components/experience/timeline";
import Footer from "./components/footer/footer";
import SectionHeading from "./components/section-heading/section-heading";

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <section id="projects" className="section">
          <SectionHeading command="ls projects/" />
          <ProjectGrid />
        </section>
        <section id="experience" className="section">
          <SectionHeading command="cat resume.log" />
          <Timeline />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

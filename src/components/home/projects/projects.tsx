import { useEffect, useRef, useState } from "react";
import "./projects.css";
import TDL from "../../../assets/images/pictures/tdl-banner.png";
import SeleniumType from "../../../assets/images/pictures/seltype-banner.png";
import DokoTabe from "../../../assets/images/pictures/dokotabe-banner.png";
import APReader from "../../../assets/images/pictures/apreader-banner.png";
import { Link } from "react-router-dom";

const PREVIEW_PROJECTS = [
  { name: "SeleniumType", img: SeleniumType, tags: ["Python", "Selenium"] },
  { name: "TDL", img: TDL, tags: ["Flutter", "Dart"] },
  { name: "DokoTabe", img: DokoTabe, tags: ["React", "Firebase"] },
  { name: "APReader", img: APReader, tags: ["Python"] },
];

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`projects-home ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="projects-home-inner">
        <div className="projects-home-header">
          <span className="section-label">Projects</span>
          <Link to="/projects" className="projects-home-viewall">View all →</Link>
        </div>
        <div className="projects-home-grid">
          {PREVIEW_PROJECTS.map((project) => (
            <Link to="/projects" key={project.name} className="projects-home-card">
              <img src={project.img} alt={project.name} className="projects-home-img" />
              <div className="projects-home-card-body">
                <span className="projects-home-name">{project.name}</span>
                <div className="projects-home-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="skill-tag skill-tag--neutral">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;

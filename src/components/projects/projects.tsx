import { useEffect, useState } from "react";
import axios from "axios";
import "./projects.css";
import { getLanguageColor } from "../../assets/colors/langcolor";
import SeleniumType from "../../assets/images/pictures/seltype-banner.png";
import TDL from "../../assets/images/pictures/tdl-banner.png";
import DokoTabe from "../../assets/images/pictures/dokotabe-banner.png";
import APReader from "../../assets/images/pictures/apreader-banner.png";
import LanguageBar from "./LanguageBar";

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface Project {
  name: string;
  repo: string;
  img: string;
  description: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    name: "SeleniumType",
    repo: "SeleniumType",
    img: SeleniumType,
    description: "Automates logging into Monkeytype and simulates typing using Selenium.",
    githubUrl: "https://github.com/RomaruDaze/SeleniumType",
  },
  {
    name: "TDL",
    repo: "TDL",
    img: TDL,
    description: "Simple and intuitive Todo List app built with Flutter.",
    githubUrl: "https://github.com/RomaruDaze/TDL",
  },
  {
    name: "DokoTabe",
    repo: "Hackathon-DokoTabe",
    img: DokoTabe,
    description: "Displays nearby restaurants on a map with filtering by distance and category.",
    githubUrl: "https://github.com/RomaruDaze/Hackathon-DokoTabe",
  },
  {
    name: "APReader",
    repo: "APReader",
    img: APReader,
    description: "Executes commands on an Access Point and logs output to a .txt file.",
    githubUrl: "https://github.com/RomaruDaze/APReader",
  },
];

function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [languages, setLanguages] = useState<Record<string, Language[]>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    PROJECTS.forEach(({ repo }) => {
      axios
        .get<Record<string, number>>(`https://api.github.com/repos/RomaruDaze/${repo}/languages`)
        .then((res) => {
          const total = Object.values(res.data).reduce((a, b) => a + b, 0);
          const langData = Object.entries(res.data).map(([name, bytes]) => ({
            name,
            percentage: (bytes / total) * 100,
            color: getLanguageColor(name),
          }));
          setLanguages((prev) => ({ ...prev, [repo]: langData }));
        })
        .catch(() => {});
    });
  }, []);

  return (
    <div className="projects-page">
      <div className={`projects-page-header ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0 }}>
        <h1 className="projects-page-title">My Projects</h1>
        <p className="projects-page-subtitle">Things I've built</p>
      </div>
      <div className="projects-page-grid">
        {PROJECTS.map((project, index) => (
          <div
            key={project.repo}
            className={`project-card ${isVisible ? "rise-up" : ""}`}
            style={{
              opacity: isVisible ? undefined : 0,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <img src={project.img} alt={project.name} className="project-card-img" />
            <div className="project-card-body">
              <h2 className="project-card-name">{project.name}</h2>
              <p className="project-card-desc">{project.description}</p>
              <LanguageBar languages={languages[project.repo] ?? []} />
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

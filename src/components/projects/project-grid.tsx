import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./project-card";
import "./project-grid.css";

function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>
      {selectedProject !== null && (
        <p className="section__heading">
          <span className="section__heading-prompt">$</span> selected: {selectedProject.title}
          {" "}(modal wired in next task)
        </p>
      )}
    </>
  );
}

export default ProjectGrid;

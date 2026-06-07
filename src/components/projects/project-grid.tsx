import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
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
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}

export default ProjectGrid;

import { useEffect } from "react";
import type { Project } from "../../data/projects";
import "./project-modal.css";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="project-modal__backdrop" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-modal__header">
          <span className="project-modal__prompt">$ cat {project.id}.md</span>
          <button type="button" className="project-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <h3 id="project-modal-title" className="project-modal__title">{project.title}</h3>
        <p className="project-modal__description">{project.description}</p>
        <ul className="project-modal__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-modal__tag">{tag}</li>
          ))}
        </ul>
        <div className="project-modal__links">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="project-modal__link">
              View live →
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer" className="project-modal__link">
              View repo →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

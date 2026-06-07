import type { Project } from "../../data/projects";
import "./project-card.css";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button type="button" className="project-card" onClick={() => onSelect(project)}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="project-card__image"
        />
      ) : (
        <div className="project-card__image project-card__image--placeholder" aria-hidden="true">
          <span>{project.title.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <ul className="project-card__tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-card__tag">{tag}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export default ProjectCard;

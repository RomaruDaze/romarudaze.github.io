import { experience } from "../../data/experience";
import "./timeline.css";

function Timeline() {
  return (
    <ol className="timeline">
      {experience.map((entry) => (
        <li key={entry.id} className="timeline__entry">
          <div className="timeline__marker" aria-hidden="true" />
          <div className="timeline__content">
            <p className="timeline__period">{entry.period}</p>
            <h3 className="timeline__role">{entry.role}</h3>
            <p className="timeline__organization">{entry.organization}</p>
            <p className="timeline__description">{entry.description}</p>
            {entry.tags && (
              <ul className="timeline__tags">
                {entry.tags.map((tag) => (
                  <li key={tag} className="timeline__tag">{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default Timeline;

import { useEffect, useRef, useState } from "react";
import "./skills.css";

type TagVariant = "neutral" | "framework" | "cloud";

interface SkillGroup {
  label: string;
  variant: TagVariant;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    variant: "neutral",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "HTML", "CSS"],
  },
  {
    label: "Frameworks",
    variant: "framework",
    skills: ["React", "Spring Boot", "Flutter", "Vite"],
  },
  {
    label: "Cloud & Deployment",
    variant: "cloud",
    skills: ["AWS", "GCP", "Vercel", "Netlify", "Render", "Firebase"],
  },
  {
    label: "Databases & Tools",
    variant: "neutral",
    skills: ["PostgreSQL", "NoSQL", "SQLite", "SheetDB", "GAS", "Git", "IntelliJ", "Cursor", "Claude Code"],
  },
  {
    label: "Design",
    variant: "neutral",
    skills: ["Design Thinking", "HCD/UCD"],
  },
];

function Skills() {
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
      className={`skills ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="skills-inner">
        <span className="section-label">Skills</span>
        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="skill-group">
              <span className="skill-group-label">{group.label}</span>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill} className={`skill-tag skill-tag--${group.variant}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

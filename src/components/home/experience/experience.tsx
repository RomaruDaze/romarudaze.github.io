import { useEffect, useRef, useState } from "react";
import "./experience.css";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
  isCurrent?: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Rakus",
    role: "Software Engineer",
    duration: "Current",
    description: "",
    isCurrent: true,
  },
  {
    company: "Beenos.inc",
    role: "System Engineer",
    duration: "1 year",
    description: "AI integration into existing systems using Python and AWS.",
  },
  {
    company: "NEC",
    role: "Intern",
    duration: "3 months",
    description: "Developed solutions using Design Thinking methodology.",
  },
  {
    company: "Nadus Works",
    role: "Intern",
    duration: "1 month",
    description: "Built software to improve office workflow efficiency.",
  },
];

function Experience() {
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
      className={`experience ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="experience-inner">
        <span className="section-label">Experience</span>
        <div className="exp-timeline">
          {EXPERIENCES.map((item, index) => (
            <div key={item.company} className="exp-item">
              <div className="exp-track">
                <div className={`exp-dot ${item.isCurrent ? "exp-dot--current" : ""}`} />
                {index < EXPERIENCES.length - 1 && <div className="exp-line" />}
              </div>
              <div className="exp-content">
                <div className="exp-header">
                  <span className="exp-company">{item.company}</span>
                  {item.isCurrent && <span className="exp-badge">Current</span>}
                </div>
                <p className="exp-meta">
                  {item.role} · {item.duration}
                  {item.description && ` · ${item.description}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

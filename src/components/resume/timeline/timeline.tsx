import "./timeline.css";
import { useEffect, useRef } from "react";

interface TimelineEntry {
  title: string;
  subtitle: string;
  duration: string;
  detail: string;
  href?: string;
  isCurrent?: boolean;
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    title: "Rakus",
    subtitle: "Software Engineer",
    duration: "Present",
    detail: "",
    isCurrent: true,
  },
  {
    title: "Beenos.inc",
    subtitle: "System Engineer",
    duration: "1 year",
    detail: "AI integration into existing systems using Python and AWS.",
  },
  {
    title: "NEC",
    subtitle: "Intern",
    duration: "3 months",
    detail: "Solution development using Design Thinking methodology.",
  },
  {
    title: "Nadus Works",
    subtitle: "Intern",
    duration: "1 month",
    detail: "Office efficiency software development.",
  },
  {
    title: "Kaishi Professional University",
    subtitle: "Information Faculty",
    duration: "Apr 2022 → Present",
    detail: "Niigata, Japan",
    href: "https://kaishi-pu.ac.jp/",
  },
  {
    title: "Kyoshin Language Academy",
    subtitle: "Japanese Language",
    duration: "Oct 2020 → Mar 2022",
    detail: "Kyoto, Japan",
    href: "https://www.kla.ac/school/kyotochuo/",
  },
  {
    title: "SMA Sutomo 1 Medan",
    subtitle: "High School",
    duration: "Jul 2017 → Jun 2020",
    detail: "Medan, Indonesia",
    href: "https://sutomo-mdn.sch.id/sutomo1-sma",
  },
];

function Timeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rise-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-section">
      <span className="section-label">Career & Education</span>
      <div className="timeline">
        {TIMELINE_ENTRIES.map((entry, index) => (
          <div
            key={`${entry.title}-${index}`}
            className="tl-item"
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ opacity: 0 }}
          >
            <div className="tl-track">
              <div className={`tl-dot ${entry.isCurrent ? "tl-dot--current" : ""}`} />
              {index < TIMELINE_ENTRIES.length - 1 && <div className="tl-line" />}
            </div>
            <div className="tl-body">
              <div className="tl-header">
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noopener noreferrer" className="tl-title tl-title--link">
                    {entry.title}
                  </a>
                ) : (
                  <span className="tl-title">{entry.title}</span>
                )}
                {entry.isCurrent && <span className="exp-badge">Current</span>}
                <span className="tl-duration">{entry.duration}</span>
              </div>
              <p className="tl-subtitle">{entry.subtitle}</p>
              {entry.detail && <p className="tl-detail">{entry.detail}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;

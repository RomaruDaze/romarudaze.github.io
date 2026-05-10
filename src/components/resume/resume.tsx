import "./resume.css";
import Timeline from "./timeline/timeline";
import profilePicture from "../../assets/images/pictures/profile-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef, useState } from "react";

function Resume() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const socials = [
    { icon: faLinkedin, label: "LinkedIn", handle: "Roger Marvin", href: "https://linkedin.com/in/roger-marvin-78659b302/" },
    { icon: faGithub, label: "GitHub", handle: "RomaruDaze", href: "https://github.com/RomaruDaze" },
    { icon: faInstagram, label: "Instagram", handle: "@romaru._", href: "https://instagram.com/romaru._" },
    { icon: faXTwitter, label: "X", handle: "@RomaruDaze", href: "https://x.com/RomaruDaze" },
  ];

  return (
    <div className="resume-page">
      <div
        className={`resume-profile ${isVisible ? "rise-up" : ""}`}
        ref={ref}
        style={{ opacity: isVisible ? undefined : 0 }}
      >
        <img src={profilePicture} alt="Roger Marvin" className="resume-photo" />
        <div className="resume-info">
          <h1 className="resume-name">Roger Marvin</h1>
          <p className="resume-title">Software Engineer</p>
          <p className="resume-bio">
            22-year-old software engineer from <strong>Indonesia</strong>, studying abroad in{" "}
            <strong>Japan</strong>. Skilled in React, Flutter, and Python — passionate about
            Digital Transformation.
          </p>
          <div className="resume-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="resume-social-tag">
                <FontAwesomeIcon icon={s.icon} />
                <span>{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Timeline />
      <div className="resume-cta">
        <span>Want to connect?</span>
        <a href="mailto:romarudazee99@gmail.com" className="resume-cta-link">
          romarudazee99@gmail.com →
        </a>
      </div>
    </div>
  );
}

export default Resume;

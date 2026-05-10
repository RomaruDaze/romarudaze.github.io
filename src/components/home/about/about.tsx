import { useEffect, useRef, useState } from "react";
import "./about.css";
import profilePicture from "../../../assets/images/pictures/profile-picture.png";
import { Link } from "react-router-dom";

function About() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about ${isVisible ? "rise-up" : ""}`}
      ref={ref}
      style={{ opacity: isVisible ? undefined : 0 }}
    >
      <div className="about-inner">
        <img src={profilePicture} alt="Roger Marvin" className="about-photo" />
        <div className="about-content">
          <span className="section-label">About</span>
          <h2 className="about-name">Roger Marvin</h2>
          <p className="about-bio">
            22-year-old software engineer from <strong>Indonesia</strong>, studying abroad in{" "}
            <strong>Japan</strong>. Passionate about Digital Transformation and building
            solutions that make a difference.
          </p>
          <Link to="/resume" className="about-link">Full Resume →</Link>
        </div>
      </div>
    </section>
  );
}

export default About;

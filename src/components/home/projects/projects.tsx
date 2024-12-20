import { useEffect, useRef, useState } from "react";
import "./projects.css";
import TDL from "../../../assets/images/pictures/tdl-banner.png";
import SeleniumType from "../../../assets/images/pictures/seltype-banner.png";
import DokoTabe from "../../../assets/images/pictures/dokotabe-banner.png";
import { Link } from "react-router-dom";

function Projects() {
  const [isVisible, setIsVisible] = useState({
    heading: false,
    card1: false,
    card2: false,
    card3: false,
  });
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          if (rect.top < windowHeight / 1.5) {
            setIsVisible({
              heading: true,
              card1: true,
              card2: true,
              card3: true,
            });
          } else if (rect.top < windowHeight / 1.5) {
            setIsVisible((prev) => ({ ...prev, card1: true }));
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="projects-home-container" ref={projectsRef}>
      <h2
        className={`projects-home-heading ${
          isVisible.heading ? "visible" : ""
        }`}
        style={{
          opacity: isVisible.heading ? 1 : 0,
          transition: "opacity 0.5s ease",
          transitionDelay: "0.1s",
        }}
      >
        Projects
      </h2>
      <div className="projects-home-grid">
        <div
          className={`project-home-card ${isVisible.card1 ? "rise-up" : ""}`}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={SeleniumType}
                  alt="SeleniumType"
                  className="project-home-image"
                />
              </div>
              <div className="flip-card-back">
                <h3 className="title">SeleniumType</h3>
                <p>
                  This project automates the process of logging into Monkeytype
                  and simulates typing on the website using Selenium.
                </p>
                <Link to="/projects" className="button type1">
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`project-home-card ${isVisible.card2 ? "rise-up" : ""}`}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={TDL} alt="TDL" className="project-home-image" />
              </div>
              <div className="flip-card-back">
                <h3 className="title">TDL</h3>
                <p>
                  A simple and intuitive Todo List application built with
                  Flutter. This app allows users to efficiently manage their
                  tasks, helping you stay organized and productive.
                </p>
                <Link to="/projects" className="button type1">
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`project-home-card ${isVisible.card3 ? "rise-up" : ""}`}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={DokoTabe}
                  alt="DokoTabe"
                  className="project-home-image"
                />
              </div>
              <div className="flip-card-back">
                <h3 className="title">DokoTabe</h3>
                <p>
                  Dokotabe displays nearby restaurants on a map and shows the
                  menu of the selected restaurant. It also has the ability to
                  narrow down your search by distance and category, and to add
                  restaurants to your favorites.
                </p>
                <Link to="/projects" className="button type1">
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;

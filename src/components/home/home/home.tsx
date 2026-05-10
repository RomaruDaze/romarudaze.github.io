import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div
        className="hero-inner"
        style={{ opacity: 0, animation: "fadeIn 0.8s ease forwards" }}
      >
        <span className="hero-badge">Available for opportunities</span>
        <h1 className="hero-name">Roger Marvin</h1>
        <p className="hero-role">Software Engineer · Indonesia → Japan</p>
        <p
          className="hero-tagline"
          style={{
            opacity: 0,
            animation: "fadeIn 0.8s ease forwards",
            animationDelay: "0.4s",
          }}
        >
          Code. Create. Conquer.
        </p>
        <div
          className="hero-actions"
          style={{
            opacity: 0,
            animation: "fadeIn 0.8s ease forwards",
            animationDelay: "0.8s",
          }}
        >
          <Link to="/projects" className="btn btn-primary">View Projects</Link>
          <Link to="/contacts" className="btn btn-secondary">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;

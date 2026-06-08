import SectionHeading from "../section-heading/section-heading";
import "./about.css";

function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading command="whoami" />
      <div className="about__content">
        <h1 className="about__name">Roger Marvin</h1>
        <p className="about__bio">
          I'm a software engineer who likes building small, focused tools and
          learning by shipping projects end to end. This site is where I keep
          a running log of what I've built.
          <span className="cursor" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}

export default About;

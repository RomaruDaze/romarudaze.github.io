import "./contact.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <section className="contact-teaser">
      <div className="contact-teaser-inner">
        <span className="contact-teaser-text">Want to get in touch?</span>
        <Link to="/contacts" className="btn btn-primary">Contact Me</Link>
      </div>
    </section>
  );
}

export default Contact;

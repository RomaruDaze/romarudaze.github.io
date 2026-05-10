import "./contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";
import { useEffect, useRef, useState } from "react";

const SOCIAL_LINKS = [
  { icon: faEnvelope, label: "Email", handle: "romarudazee99@gmail.com", href: "mailto:romarudazee99@gmail.com" },
  { icon: faLinkedin, label: "LinkedIn", handle: "Roger Marvin", href: "https://linkedin.com/in/roger-marvin-78659b302/" },
  { icon: faGithub, label: "GitHub", handle: "RomaruDaze", href: "https://github.com/RomaruDaze" },
  { icon: faInstagram, label: "Instagram", handle: "@romaru._", href: "https://instagram.com/romaru._" },
  { icon: faXTwitter, label: "X / Twitter", handle: "@RomaruDaze", href: "https://x.com/RomaruDaze" },
];

function Contacts() {
  const [isVisible, setIsVisible] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateParams = {
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      message: messageRef.current?.value ?? "",
    };
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => alert("Message sent!"))
      .catch(() => alert("Failed to send. Please try again."));
  };

  return (
    <div className="contacts-page">
      <div className={`contacts-header ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0 }}>
        <h1 className="contacts-title">Get in Touch</h1>
        <p className="contacts-subtitle">Open to opportunities and collaborations.</p>
      </div>

      <div className={`contacts-body ${isVisible ? "rise-up" : ""}`} style={{ opacity: isVisible ? undefined : 0, animationDelay: "0.15s" }}>
        <div className="contacts-links">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <div className="contact-link-icon" aria-hidden="true">
                <FontAwesomeIcon icon={s.icon} />
              </div>
              <div className="contact-link-info">
                <span className="contact-link-label">{s.label}</span>
                <span className="contact-link-handle">{s.handle}</span>
              </div>
              <span className="contact-link-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="contacts-form-card">
          <span className="section-label">Send a Message</span>
          <form onSubmit={handleSubmit} className="contacts-form">
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              ref={nameRef}
              required
              className="form-input"
            />
            <label htmlFor="contact-email" className="form-label">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              ref={emailRef}
              required
              className="form-input"
            />
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              placeholder="What's on your mind?"
              rows={5}
              ref={messageRef}
              required
              className="form-textarea"
            />
            <button type="submit" className="btn btn-primary form-submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacts;

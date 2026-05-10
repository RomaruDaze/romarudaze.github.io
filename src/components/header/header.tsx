import { Link, useLocation } from "react-router-dom";
import "./header.css";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">RomaruDaze</Link>
        <nav className="header-nav">
          {[
            { to: "/", label: "Home" },
            { to: "/resume", label: "Resume" },
            { to: "/projects", label: "Projects" },
            { to: "/contacts", label: "Contacts" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`header-link ${pathname === to ? "header-link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

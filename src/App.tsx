import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/fonts/font-roboto.css";
import Header from "./components/header/header";
import Body from "./components/home/body";
import Resume from "./components/resume/resume";
import Projects from "./components/projects/projects";
import Contacts from "./components/contacts/contacts";
import Footer from "./components/footer/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

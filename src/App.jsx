// App.jsx
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainMenu from "./components/MainMenu";
import WarningMenu from "./components/WarningMenu";
import AboutMe from "./components/AboutMe";
import TechnologiesView from "./components/TechnologiesView";
import WorkExperienceView from "./components/WorkExperienceView";
import ProjectsView from "./components/ProjectsView";
import ResearchView from "./components/ResearchView";
import BlogView from "./components/BlogView";
import EducationView from "./components/EducationView";

function App() {
    return (
        <Routes>
            <Route path="/" element={<WarningMenu />} />
            <Route path="/main-menu" element={<MainMenu />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/technologies-view" element={<TechnologiesView />} />
            <Route path="/work-experience" element={<WorkExperienceView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/research" element={<ResearchView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/education" element={<EducationView />} />
        </Routes>
    );
}

export default App;

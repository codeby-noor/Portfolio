import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Languages from "./components/Languages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { initializeAnalytics } from "./analytics";
import { MotionConfig } from "motion/react";
import "./styles/redesign.css";

const getInitialTheme = () => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
};

const App = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch {
            // The theme remains functional when browser storage is unavailable.
        }
    }, [theme]);

    useEffect(() => {
        initializeAnalytics();
    }, []);

    const handleToggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="portfolio-app">
                <a className="skip-link" href="#main-content">Skip to content</a>
                <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
                <main id="main-content">
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Experience />
                    <Education />
                    <Languages />
                    <Contact />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    );
};

export default App;

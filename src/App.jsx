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
    const rootTheme = document.documentElement.getAttribute("data-theme");
    if (rootTheme === "dark" || rootTheme === "light") return rootTheme;

    try {
        const savedTheme = window.localStorage.getItem("portfolio-theme");
        if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    } catch {
        // The operating-system preference remains available when storage is blocked.
    }

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const App = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        const themeColor = theme === "dark" ? "#292126" : "#F5F0E8";
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
    }, [theme]);

    useEffect(() => {
        initializeAnalytics();
    }, []);

    const handleToggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        try {
            window.localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
            console.warn("Unable to save the selected color theme.", error);
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="portfolio-app">
                <a className="skip-link" href="#main-content">Skip to content</a>
                <Navbar onToggleTheme={handleToggleTheme} />
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

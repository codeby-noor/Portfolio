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
import "./styles/redesign.css";

const getInitialTheme = () => {
    try {
        return localStorage.getItem("portfolio-theme") || "light";
    } catch {
        return "light";
    }
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
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

        document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
        document.body.classList.add("motion-ready");

        return () => {
            observer.disconnect();
            document.body.classList.remove("motion-ready");
        };
    }, []);

    const handleToggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    };

    return (
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
    );
};

export default App;

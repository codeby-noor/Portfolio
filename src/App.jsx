import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LiquidBackground from "./components/LiquidBackground";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import useLenis from "./hooks/useLenis";
import useGsapReveal from "./hooks/useGsapReveal";

const App = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    // Fluid motion system: Lenis smooth scroll + GSAP choreography
    useLenis();
    useGsapReveal();

    const handleToggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <div className="portfolio-app">
            <LiquidBackground />
            <ScrollProgress />
            <CustomCursor />
            <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Education />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;

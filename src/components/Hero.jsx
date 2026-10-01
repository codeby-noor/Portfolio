import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaExternalLinkAlt, FaFileDownload } from "react-icons/fa";
import { EASE } from "../motion/motion";
import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const rise = (delay = 0, y = 22) => {
    if (prefersReducedMotion()) {
        return { initial: false };
    }
    return {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.85, ease: EASE.out, delay },
    };
};

const Hero = () => {
    const sectionRef = useRef(null);
    const innerRef = useRef(null);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (!el) return;
        if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
        } else {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Scroll transition: hero drifts out slowly as the next section enters.
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const ctx = gsap.context(() => {
            gsap.to(innerRef.current, {
                y: -48,
                opacity: 0.25,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom 30%",
                    scrub: 1.1,
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="home" className="hero-section" ref={sectionRef}>
            <div className="container hero-layout">
                <div className="hero-main" ref={innerRef}>
                    <motion.p className="hero-kicker" {...rise(0.05, 14)}>
                        <span className="hero-kicker__rule" aria-hidden="true" />
                        <span>Navsari, Gujarat, India — available for remote roles</span>
                    </motion.p>

                    <motion.h1 className="hero-name" {...rise(0.12, 30)}>
                        Mahenoor Shaikh
                    </motion.h1>

                    <motion.p className="hero-role" {...rise(0.24, 20)}>
                        Full Stack Web Developer
                    </motion.p>

                    <motion.p className="hero-statement" {...rise(0.34, 18)}>
                        I build responsive web applications across frontend, backend and
                        databases — React interfaces, Node.js APIs, and PostgreSQL data
                        with Supabase authentication and analytics.
                    </motion.p>

                    <motion.div className="hero-actions" {...rise(0.44, 16)}>
                        <a
                            href="#projects"
                            className="btn btn--primary"
                            onClick={(e) => handleScrollTo(e, "#projects")}
                        >
                            <span>View Projects</span>
                            <FaArrowRight aria-hidden="true" />
                        </a>
                        <a
                            href="#contact"
                            className="btn btn--secondary"
                            onClick={(e) => handleScrollTo(e, "#contact")}
                        >
                            <span>Contact Me</span>
                        </a>
                    </motion.div>

                    <motion.div className="hero-meta" {...rise(0.56, 12)}>
                        <span className="hero-meta__stack">React · Node.js · PostgreSQL · Supabase</span>
                        <span className="hero-meta__sep" aria-hidden="true">/</span>
                        <span className="hero-meta__links">
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download Mahenoor Shaikh Resume PDF">
                                Resume <FaFileDownload aria-hidden="true" />
                            </a>
                            <a href="https://github.com/codeby-noor" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                GitHub <FaExternalLinkAlt aria-hidden="true" />
                            </a>
                            <a href="https://www.linkedin.com/in/mahenoor-shaikh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                LinkedIn <FaExternalLinkAlt aria-hidden="true" />
                            </a>
                        </span>
                    </motion.div>
                </div>

                <motion.aside className="hero-rail" aria-hidden="true" {...rise(0.5, 12)}>
                    <span className="hero-rail__line" />
                    <span className="hero-rail__text">BCA Graduate — Full Stack Development, 2025–2026</span>
                </motion.aside>
            </div>
        </section>
    );
};

export default Hero;

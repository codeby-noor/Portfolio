import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaExternalLinkAlt, FaTimes, FaCheckCircle, FaGithub } from "react-icons/fa";
import { featuredProject } from "../data/projects";
import "../styles/featured.css";

// Case study content — only claims supported by the actual project data
const caseStudy = {
    overview:
        "Broker Streets is a modern real estate website designed to showcase properties and provide users with an easy way to explore available properties and connect with brokers. It is built with a premium, business-focused design and modern animations.",
    technology: ["React.js", "JavaScript", "Bootstrap", "CSS", "REST APIs"],
    keyFeatures: [
        "Modern real estate homepage",
        "Property listings",
        "Property cards",
        "Property details",
        "Search functionality",
        "Property filtering",
        "Location-based browsing",
        "Broker inquiry / contact section",
        "Responsive design",
        "Modern animations",
        "Mobile-friendly interface",
    ],
    contribution:
        "Designed and developed the complete frontend experience — from the property browsing interface to search, filtering, property details and the broker inquiry flow. Focused on a premium, business-focused visual language with smooth, modern animations.",
    challenges:
        "Balancing a premium, business-focused aesthetic with a clean, fast and mobile-friendly interface. Structuring property data and interactions so that browsing, filtering and inquiry flows feel natural and responsive.",
    result:
        "A polished, responsive real estate platform that presents properties clearly and connects users with brokers — demonstrating a complete product-focused frontend build.",
};

const FeaturedProject = () => {
    const [caseOpen, setCaseOpen] = useState(false);
    const sectionRef = useRef(null);
    const project = featuredProject;

    // Escape closes the case-study modal; lock body scroll while open.
    useEffect(() => {
        if (!caseOpen) return undefined;
        const handleKeyDown = (event) => event.key === "Escape" && setCaseOpen(false);
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [caseOpen]);

    return (
        <section id="featured" className="featured section" ref={sectionRef}>
            <div className="container">
                <div className="featured__header">
                    <span className="eyebrow">Featured Project</span>
                    <span className="featured__flag">★ FLAGSHIP</span>
                </div>

                <div className="featured__grid">
                    {/* Left — title + info */}
                    <div className="featured__info">
                        <motion.h2
                            className="featured__title"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            BROKER
                            <br />
                            <span className="text-gradient">STREETS</span>
                        </motion.h2>

                        <motion.div
                            className="featured__category"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            REAL ESTATE PLATFORM
                        </motion.div>

                        <motion.div
                            className="featured__location"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <FaMapMarkerAlt aria-hidden="true" />
                            {project.location}
                        </motion.div>

                        <motion.p
                            className="featured__desc"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {project.description}
                        </motion.p>

                        <motion.div
                            className="featured__features"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {project.features.slice(0, 6).map((feature) => (
                                <span className="featured__feature" key={feature}>
                                    <FaCheckCircle aria-hidden="true" />
                                    {feature}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div
                            className="featured__actions"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <button className="btn btn--primary" onClick={() => setCaseOpen(true)}>
                                VIEW CASE STUDY
                                <span className="btn__arrow" aria-hidden="true">→</span>
                            </button>
                            <a
                                href={project.liveUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--ghost"
                                onClick={(e) => {
                                    if (!project.liveUrl || project.liveUrl === "#") e.preventDefault();
                                }}
                            >
                                OPEN LIVE DEMO
                                <span className="btn__arrow" aria-hidden="true">↗</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — 3D browser presentation */}
                    <motion.div
                        className="featured__visual"
                        initial={{ opacity: 0, rotateY: -12, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformPerspective: 1200 }}
                    >
                        <div className="featured__browser">
                            <div className="featured__browser-bar">
                                <span className="featured__dot" />
                                <span className="featured__dot" />
                                <span className="featured__dot" />
                                <span className="featured__url">brokerstreets.com</span>
                            </div>
                            <div className="featured__browser-body">
                                <img
                                    src={project.image}
                                    alt="Broker Streets real estate platform preview"
                                    className="featured__shot"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.nextElementSibling.style.display = "flex";
                                    }}
                                />
                                <div className="featured__shot-fallback">
                                    <span className="featured__fallback-label">BROKER STREETS</span>
                                    <div className="featured__fallback-cards">
                                        <span className="featured__fallback-card" />
                                        <span className="featured__fallback-card" />
                                        <span className="featured__fallback-card" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subtle architectural environment */}
                        <div className="featured__arch" aria-hidden="true">
                            <span className="featured__arch-line featured__arch-line--1" />
                            <span className="featured__arch-line featured__arch-line--2" />
                            <span className="featured__arch-line featured__arch-line--3" />
                            <span className="featured__arch-pin">📍</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Case study modal */}
            <AnimatePresence>
                {caseOpen && (
                    <motion.div
                        className="case-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCaseOpen(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Broker Streets case study"
                    >
                        <motion.div
                            className="case-modal"
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.96 }}
                            transition={{ type: "spring", damping: 26, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="case-modal__header">
                                <div>
                                    <span className="case-modal__eyebrow">CASE STUDY</span>
                                    <h3 className="case-modal__title">BROKER STREETS</h3>
                                    <span className="case-modal__sub">Real Estate Platform · Navsari, Gujarat</span>
                                </div>
                                <button className="case-modal__close" onClick={() => setCaseOpen(false)} aria-label="Close case study">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="case-modal__body">
                                <div className="case-modal__section">
                                    <h4>OVERVIEW</h4>
                                    <p>{caseStudy.overview}</p>
                                </div>

                                <div className="case-modal__section">
                                    <h4>TECHNOLOGY</h4>
                                    <div className="case-modal__tech">
                                        {caseStudy.technology.map((tech) => (
                                            <span className="case-modal__tech-badge" key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="case-modal__section">
                                    <h4>KEY FEATURES</h4>
                                    <ul className="case-modal__features">
                                        {caseStudy.keyFeatures.map((feature) => (
                                            <li key={feature}>
                                                <FaCheckCircle aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="case-modal__section">
                                    <h4>UI PREVIEW</h4>
                                    <div className="case-modal__preview">
                                        <img
                                            src={project.image}
                                            alt="Broker Streets UI preview"
                                            loading="lazy"
                                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                                        />
                                    </div>
                                </div>

                                <div className="case-modal__section">
                                    <h4>MY CONTRIBUTION</h4>
                                    <p>{caseStudy.contribution}</p>
                                </div>

                                <div className="case-modal__section">
                                    <h4>CHALLENGES</h4>
                                    <p>{caseStudy.challenges}</p>
                                </div>

                                <div className="case-modal__section">
                                    <h4>RESULT</h4>
                                    <p>{caseStudy.result}</p>
                                </div>
                            </div>

                            <div className="case-modal__actions">
                                <a
                                    href={project.liveUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="case-modal__btn case-modal__btn--primary"
                                    onClick={(e) => {
                                        if (!project.liveUrl || project.liveUrl === "#") e.preventDefault();
                                    }}
                                >
                                    <FaExternalLinkAlt aria-hidden="true" /> OPEN LIVE DEMO
                                </a>
                                <a
                                    href={project.githubUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="case-modal__btn"
                                    onClick={(e) => {
                                        if (!project.githubUrl || project.githubUrl === "#") e.preventDefault();
                                    }}
                                >
                                    <FaGithub aria-hidden="true" /> VIEW CODE
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FeaturedProject;
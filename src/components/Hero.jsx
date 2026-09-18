import { FaFileDownload, FaArrowRight, FaGithub, FaLinkedinIn, FaCode, FaServer, FaDatabase, FaFolder } from "react-icons/fa";
import "../styles/hero.css";

const coreStack = [
    "React.js",
    "Node.js",
    "Express.js",
    "MySQL",
    "MongoDB",
    "REST APIs",
    "JavaScript (ES6+)",
    "Git"
];

const capabilityHighlights = [
    {
        title: "Frontend Engineering",
        icon: FaCode,
        detail: "React.js component architecture, custom hooks, responsive UI, client state management.",
        tech: "React · ES6+ · Bootstrap · CSS3"
    },
    {
        title: "Backend & REST APIs",
        icon: FaServer,
        detail: "Express.js route handling, request validation, authentication, structured error handling.",
        tech: "Node.js · Express · RESTful APIs"
    },
    {
        title: "Database Modeling",
        icon: FaDatabase,
        detail: "Normalized MySQL relational schemas with constraints; MongoDB document collections.",
        tech: "MySQL · MongoDB · phpMyAdmin"
    }
];

const Hero = () => {
    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="container hero-container">
                <div className="hero-grid">
                    {/* Left Column: Direct Recruiter Overview */}
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            <span>Full-Stack Web Developer · Navsari, Gujarat, India</span>
                        </div>

                        <h1 className="hero-title">
                            Mahenoor Shaikh
                        </h1>

                        <p className="hero-role-headline">
                            Full Stack Developer building <span className="hero-highlight">functional, database-backed</span> web applications across frontend and backend.
                        </p>

                        <p className="hero-description">
                            Bachelor of Computer Applications (BCA) graduate with hands-on full-stack development experience. Focused on modular React components, reliable Express.js REST APIs, and structured SQL/NoSQL databases.
                        </p>

                        {/* Recruiter Action Buttons */}
                        <div className="hero-actions">
                            <a
                                href="#projects"
                                className="btn btn--primary"
                                onClick={(e) => handleScrollTo(e, "#projects")}
                            >
                                <span>View Projects</span>
                                <FaArrowRight aria-hidden="true" />
                            </a>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--secondary"
                                aria-label="Download Mahenoor Shaikh Resume PDF"
                            >
                                <FaFileDownload aria-hidden="true" />
                                <span>Resume</span>
                            </a>

                            <a
                                href="#contact"
                                className="btn btn--outline"
                                onClick={(e) => handleScrollTo(e, "#contact")}
                            >
                                <span>Contact Me</span>
                            </a>
                        </div>

                        {/* Core Stack Pills */}
                        <div className="hero-tech-stack">
                            <span className="hero-tech-label">CORE TECHNOLOGIES</span>
                            <div className="hero-tech-list">
                                {coreStack.map((tech) => (
                                    <span key={tech} className="badge badge--accent">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Direct Profile Links */}
                        <div className="hero-socials">
                            <a
                                href="https://github.com/codeby-noor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-social-link"
                                aria-label="GitHub Profile"
                            >
                                <FaGithub aria-hidden="true" />
                                <span>github.com/codeby-noor</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mahenoor-shaikh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-social-link"
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedinIn aria-hidden="true" />
                                <span>linkedin.com/in/mahenoor-shaikh</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Purposeful Full-Stack Engineering Overview */}
                    <div className="hero-visual">
                        <div className="hero-capability-panel">
                            <div className="hero-panel-header">
                                <div className="hero-panel-title">
                                    <FaFolder className="hero-panel-icon" />
                                    <span>Engineering Stack & Focus</span>
                                </div>
                                <span className="hero-panel-status">Core Focus</span>
                            </div>

                            <div className="hero-capability-list">
                                {capabilityHighlights.map((cap) => (
                                    <div key={cap.title} className="hero-cap-item">
                                        <div className="hero-cap-top">
                                            <cap.icon className="hero-cap-icon" />
                                            <h3 className="hero-cap-title">{cap.title}</h3>
                                        </div>
                                        <p className="hero-cap-detail">{cap.detail}</p>
                                        <span className="hero-cap-tech">{cap.tech}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="hero-panel-footer">
                                <span className="footer-status-indicator" />
                                <span>Verified on real projects: E-Commerce, Real Estate & Real-Time Apps</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

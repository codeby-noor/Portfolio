import { useState, useEffect } from "react";
import { FaFileDownload, FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import "../styles/navbar.css";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

const Navbar = ({ theme, onToggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = ["home", "about", "skills", "projects", "education", "contact"];
            const scrollPos = window.scrollY + 140;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    return (
        <>
            <header className={`nav-header ${scrolled ? "nav-header--scrolled" : ""}`}>
                <div className="container nav-inner">
                    <a
                        href="#home"
                        className="nav-logo"
                        onClick={(e) => handleLinkClick(e, "#home")}
                        aria-label="Mahenoor Shaikh - Home"
                    >
                        <span className="nav-logo-mark">MS</span>
                        <span className="nav-logo-text">Mahenoor Shaikh</span>
                    </a>

                    <nav className="nav-menu" aria-label="Main Navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${activeSection === link.href.slice(1) ? "nav-link--active" : ""}`}
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="nav-actions">
                        <div className="nav-status" title="Open to full-time remote and hybrid opportunities">
                            <span className="nav-status-dot" aria-hidden="true" />
                            <span className="nav-status-text">Available for Work</span>
                        </div>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--secondary btn--sm nav-resume-btn"
                            aria-label="Download Mahenoor Shaikh Resume"
                        >
                            <FaFileDownload aria-hidden="true" />
                            <span>Resume</span>
                        </a>

                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                        <button
                            className="nav-mobile-toggle"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div
                className={`nav-mobile-drawer ${mobileOpen ? "nav-mobile-drawer--open" : ""}`}
                aria-hidden={!mobileOpen}
            >
                <div className="nav-mobile-backdrop" onClick={() => setMobileOpen(false)} />
                <div className="nav-mobile-content">
                    <div className="nav-mobile-header">
                        <div className="nav-logo">
                            <span className="nav-logo-mark">MS</span>
                            <span className="nav-logo-text">Mahenoor Shaikh</span>
                        </div>
                        <button
                            className="nav-mobile-close"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="nav-mobile-status">
                        <span className="nav-status-dot" aria-hidden="true" />
                        <span>Available for full-time roles & contracts</span>
                    </div>

                    <nav className="nav-mobile-links" aria-label="Mobile Navigation">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`nav-mobile-link ${activeSection === link.href.slice(1) ? "nav-mobile-link--active" : ""}`}
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="nav-mobile-actions">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary btn--full"
                            onClick={() => setMobileOpen(false)}
                        >
                            <FaFileDownload aria-hidden="true" />
                            <span>Download Full Resume</span>
                        </a>
                        <a
                            href="#contact"
                            className="btn btn--secondary btn--full"
                            onClick={(e) => handleLinkClick(e, "#contact")}
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

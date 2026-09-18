import { FaGithub, FaLinkedinIn, FaFileDownload, FaArrowUp } from "react-icons/fa";
import "../styles/footer.css";

const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="footer-logo-mark">MS</span>
                            <span className="footer-logo-name">Mahenoor Shaikh</span>
                        </div>
                        <p className="footer-bio">
                            Full Stack Web Developer building functional, responsive, and maintainable applications. Open to remote and international opportunities.
                        </p>
                    </div>

                    <div className="footer-nav">
                        <span className="footer-heading">Navigation</span>
                        <div className="footer-links-list">
                            {footerLinks.map((link) => (
                                <a key={link.href} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-connect">
                        <span className="footer-heading">Connect</span>
                        <div className="footer-social-links">
                            <a
                                href="https://github.com/codeby-noor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-btn"
                                aria-label="GitHub Profile"
                            >
                                <FaGithub aria-hidden="true" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mahenoor-shaikh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-btn"
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedinIn aria-hidden="true" />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-btn"
                                aria-label="Download Resume"
                            >
                                <FaFileDownload aria-hidden="true" />
                                <span>Resume</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">
                        © 2026 Mahenoor Shaikh. Built with React & modern web standards.
                    </p>
                    <button
                        className="footer-back-to-top"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <FaArrowUp aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
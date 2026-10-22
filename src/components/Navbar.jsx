import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaFileDownload } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Languages", href: "#languages" },
    { label: "Contact", href: "#contact" },
];

const Navbar = ({ onToggleTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const menuToggleRef = useRef(null);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape" && menuOpen) {
                setMenuOpen(false);
                menuToggleRef.current?.focus();
            }
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    useEffect(() => {
        if (!("IntersectionObserver" in window)) return undefined;
        const observer = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
            if (visibleSections.length) setActiveSection(visibleSections[0].target.id);
        }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

        navLinks.forEach(({ href }) => {
            const section = document.querySelector(href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <a className="site-brand" href="#home" onClick={closeMenu}>
                    <span>Mahenoor Shaikh</span>
                </a>

                <button
                    ref={menuToggleRef}
                    className="menu-toggle"
                    type="button"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                </button>

                <nav
                    id="site-navigation"
                    className={`site-navigation${menuOpen ? " site-navigation--open" : ""}`}
                    aria-label="Main navigation"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            className={activeSection === link.href.slice(1) ? "site-navigation__link--active" : ""}
                            href={link.href}
                            aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="site-header__actions">
                    <ThemeToggle onToggle={onToggleTheme} />
                    <a className="button button--small button--outline resume-link" href="/resume.pdf" download>
                        <FaFileDownload aria-hidden="true" />
                        Resume
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

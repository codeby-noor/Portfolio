import { useRef } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaCheckCircle, FaArrowRight, FaCode } from "react-icons/fa";
import { EASE } from "../motion/motion";

/**
 * ProjectCard — premium interactive showcase.
 * - Subtle 3D tilt on pointer (max ~6deg), content lifts independently
 * - Image parallax + glare follows pointer, border light responds
 * - Restrained: springs, no aggressive motion. Disabled on touch / reduced-motion.
 */
const ProjectCard = ({ project, index, onOpenModal }) => {
    const cardRef = useRef(null);
    const visualRef = useRef(null);
    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
    const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";

    const handleMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
        el.style.setProperty("--glare-x", `${((px + 0.5) * 100).toFixed(1)}%`);
        el.style.setProperty("--glare-y", `${((py + 0.5) * 100).toFixed(1)}%`);
        if (visualRef.current) {
            visualRef.current.style.transform = `translate3d(${(px * 10).toFixed(1)}px, ${(py * 10).toFixed(1)}px, 0) scale(1.04)`;
        }
    };

    const handleLeave = () => {
        const el = cardRef.current;
        if (!el) return;
        el.style.transform = "";
        if (visualRef.current) visualRef.current.style.transform = "";
    };

    return (
        <motion.article
            ref={cardRef}
            className="project-card tilt-card"
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE.out, delay: (index % 2) * 0.1 }}
        >
            <div className="tilt-glare" aria-hidden="true" />

            {/* Visual — abstract liquid cover (no external asset needed) */}
            <div className="project-visual" aria-hidden="true">
                <div
                    ref={visualRef}
                    className="project-visual__inner"
                    style={{ "--proj-accent": project.accent || "#6366f1" }}
                >
                    <span className="project-visual__orb" />
                    <span className="project-visual__grid" />
                    <span className="project-visual__monogram">{project.title.slice(0, 2).toUpperCase()}</span>
                </div>
                {project.image ? (
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="project-visual__img" />
                ) : null}
            </div>

            {/* Top Meta */}
            <div className="project-card-meta">
                <div className="project-card-num-cat">
                    <span className="project-card-index">0{index + 1}</span>
                    <span className="badge badge--accent">{project.category}</span>
                </div>
                <div className="project-card-status">
                    {project.role && <span className="project-role-badge">{project.role}</span>}
                    {project.access && <span className="project-access-badge">{project.access}</span>}
                </div>
            </div>

            {/* Title & Tagline */}
            <div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-tagline">{project.tagline}</p>
            </div>

            {/* What I Built (Engineering Scope) */}
            <div className="project-card-block">
                <span className="project-card-label">ENGINEERING SCOPE</span>
                <p className="project-card-text">{project.whatIBuilt || project.summary}</p>
            </div>

            {/* Key Capabilities */}
            {project.keyFeatures.length > 0 && <div className="project-card-block">
                <span className="project-card-label">KEY CAPABILITIES</span>
                <ul className="project-card-features">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="project-card-feature-item">
                            <FaCheckCircle className="feature-check" aria-hidden="true" />
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>}

            {/* Technologies */}
            {project.technologies.length > 0 && <div className="project-card-block">
                <span className="project-card-label">TECHNOLOGIES</span>
                <div className="project-card-tech-list">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="badge">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>}

            {/* Actions */}
            <div className="project-card-actions">
                <button
                    className="btn btn--primary btn--sm"
                    onClick={() => onOpenModal(project)}
                    aria-label={`View Case Study for ${project.title}`}
                >
                    <FaCode aria-hidden="true" />
                    <span>View Case Study</span>
                    <FaArrowRight aria-hidden="true" />
                </button>

                {hasLiveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary btn--sm"
                        aria-label={`Open Live Demo for ${project.title}`}
                    >
                        <FaExternalLinkAlt aria-hidden="true" />
                        <span>{project.liveLabel || "View Live Project"}</span>
                    </a>
                )}

                {!hasLiveUrl && project.privateLabel && (
                    <span className="project-private-label">{project.privateLabel}</span>
                )}

                {hasGithubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline btn--sm"
                        aria-label={`View Source Code on GitHub for ${project.title}`}
                    >
                        <FaGithub aria-hidden="true" />
                        <span>GitHub</span>
                    </a>
                )}
            </div>
        </motion.article>
    );
};

export default ProjectCard;

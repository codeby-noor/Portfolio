import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { EASE } from "../motion/motion";

/**
 * ProjectCard — editorial project entry.
 * Numbered, typographic, hairline-ruled. Real work first:
 * title, scope, technology metadata, links. No decoration.
 */
const ProjectCard = ({ project, index, onOpenModal }) => {
    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
    const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";
    const num = String(index + 1).padStart(2, "0");

    return (
        <motion.article
            className="project-entry"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: EASE.out, delay: (index % 2) * 0.08 }}
        >
            <div className="project-entry__top">
                <span className="project-index">{num}</span>
                <span className="badge">{project.category}</span>
                {project.featured && <span className="badge badge--accent">Featured</span>}
                <span className="project-entry__standing">
                    {project.role}{project.access ? ` — ${project.access}` : ""}
                </span>
            </div>

            <h3 className="project-entry__title">{project.title}</h3>
            <p className="project-entry__tagline">{project.tagline}</p>
            <p className="project-entry__scope">{project.whatIBuilt || project.summary}</p>

            {project.keyFeatures.length > 0 && (
                <ul className="project-entry__points">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                    ))}
                </ul>
            )}

            {project.technologies.length > 0 && (
                <p className="project-entry__stack">{project.technologies.join("  ·  ")}</p>
            )}

            <div className="project-entry__actions">
                <button
                    className="btn btn--primary btn--sm"
                    onClick={() => onOpenModal(project)}
                    aria-label={`View Case Study for ${project.title}`}
                >
                    <span>View Case Study</span>
                    <FaArrowRight aria-hidden="true" />
                </button>
                {hasLiveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-entry__link"
                        aria-label={`Open Live Demo for ${project.title}`}
                    >
                        <span>{project.liveLabel || "View Live Project"}</span>
                        <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                )}
                {!hasLiveUrl && project.privateLabel && (
                    <span className="project-entry__private">{project.privateLabel}</span>
                )}
                {hasGithubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-entry__link"
                        aria-label={`View Source Code on GitHub for ${project.title}`}
                    >
                        <span>GitHub</span>
                        <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                )}
            </div>
        </motion.article>
    );
};

export default ProjectCard;

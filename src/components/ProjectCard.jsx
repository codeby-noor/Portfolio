import { FaExternalLinkAlt, FaGithub, FaCheckCircle, FaArrowRight, FaCode } from "react-icons/fa";

const ProjectCard = ({ project, index, onOpenModal }) => {
    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
    const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";

    return (
        <article className="project-card">
            {/* Top Meta */}
            <div className="project-card-meta">
                <div className="project-card-num-cat">
                    <span className="project-card-index">0{index + 1}</span>
                    <span className="badge badge--accent">{project.category}</span>
                </div>
                {project.role && (
                    <span className="project-role-badge">{project.role}</span>
                )}
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
            <div className="project-card-block">
                <span className="project-card-label">KEY CAPABILITIES</span>
                <ul className="project-card-features">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="project-card-feature-item">
                            <FaCheckCircle className="feature-check" aria-hidden="true" />
                            <span>{feat}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Technologies */}
            <div className="project-card-block">
                <span className="project-card-label">TECHNOLOGIES</span>
                <div className="project-card-tech-list">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="badge">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="project-card-actions">
                <button
                    className="btn btn--primary btn--sm"
                    onClick={() => onOpenModal(project)}
                    aria-label={`View Case Study & Architecture for ${project.title}`}
                >
                    <FaCode aria-hidden="true" />
                    <span>Case Study & Architecture</span>
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
                        <span>Live Demo</span>
                    </a>
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
        </article>
    );
};

export default ProjectCard;

import { useEffect } from "react";
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaServer, FaCode, FaCogs, FaProjectDiagram, FaExclamationTriangle } from "react-icons/fa";
import "../styles/projectModal.css";

const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        if (!project) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [project, onClose]);

    if (!project) return null;

    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
    const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";

    return (
        <div
            className="project-modal-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="project-modal-container"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
            >
                {/* Modal Header */}
                <div className="project-modal-header">
                    <div>
                        <div className="project-modal-kicker">
                            <span className="badge badge--accent">{project.category}</span>
                            {project.role && <span className="modal-role">{project.role}</span>}
                        </div>
                        <h2 id="modal-project-title" className="project-modal-title">
                            {project.title}
                        </h2>
                        <p className="project-modal-tagline">{project.tagline}</p>
                    </div>

                    <button
                        className="project-modal-close"
                        onClick={onClose}
                        aria-label="Close Case Study Modal"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="project-modal-body">
                    {/* 1. Overview */}
                    <div className="modal-section">
                        <h3 className="modal-section-title">
                            <FaCode className="modal-sec-icon" aria-hidden="true" />
                            <span>1. Overview & Problem Addressed</span>
                        </h3>
                        <p className="modal-section-text">{project.overview || project.summary}</p>
                    </div>

                    {/* 2. My Role */}
                    <div className="modal-section">
                        <h3 className="modal-section-title">
                            <FaServer className="modal-sec-icon" aria-hidden="true" />
                            <span>2. My Role & Personal Implementation</span>
                        </h3>
                        <p className="modal-section-text">{project.myRole || project.whatIBuilt}</p>
                    </div>

                    {/* 3. Key Features */}
                    <div className="modal-section">
                        <h3 className="modal-section-title">
                            <FaCheckCircle className="modal-sec-icon" aria-hidden="true" />
                            <span>3. Key Features Implemented</span>
                        </h3>
                        <ul className="modal-features-list">
                            {project.keyFeatures.map((feat, idx) => (
                                <li key={idx} className="modal-feature-item">
                                    <FaCheckCircle className="modal-check" aria-hidden="true" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Technical Implementation & Decisions */}
                    <div className="modal-section">
                        <h3 className="modal-section-title">
                            <FaCogs className="modal-sec-icon" aria-hidden="true" />
                            <span>4. Technical Implementation & Engineering Decisions</span>
                        </h3>
                        <p className="modal-section-text">{project.technicalImplementation}</p>
                        
                        {project.engineeringDecisions && (
                            <div className="modal-decisions-grid">
                                {project.engineeringDecisions.map((dec, idx) => (
                                    <div key={idx} className="modal-decision-card">
                                        <strong className="decision-title">{dec.decision}</strong>
                                        <p className="decision-rationale">{dec.rationale}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 5. Data & API Flow */}
                    {project.dataFlow && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <FaProjectDiagram className="modal-sec-icon" aria-hidden="true" />
                                <span>5. Data Flow Architecture</span>
                            </h3>
                            <div className="modal-flow-timeline">
                                {project.dataFlow.map((step, idx) => (
                                    <div key={idx} className="modal-flow-step">
                                        <span className="flow-step-num">{step.step}</span>
                                        <p className="flow-step-desc">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. Engineering Challenge & Solution */}
                    {project.challenge && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <FaExclamationTriangle className="modal-sec-icon" aria-hidden="true" />
                                <span>6. Engineering Challenge & Solution</span>
                            </h3>
                            <div className="modal-challenge-card">
                                <div className="challenge-item">
                                    <strong>Challenge:</strong>
                                    <p>{project.challenge}</p>
                                </div>
                                <div className="challenge-item solution">
                                    <strong>Solution:</strong>
                                    <p>{project.solution}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 7. Result */}
                    {project.result && (
                        <div className="modal-section">
                            <h3 className="modal-section-title">
                                <FaCheckCircle className="modal-sec-icon" aria-hidden="true" />
                                <span>7. Outcome & Functionality Achieved</span>
                            </h3>
                            <p className="modal-section-text">{project.result}</p>
                        </div>
                    )}

                    {/* 8. Tech Stack */}
                    <div className="modal-section">
                        <h3 className="modal-section-title">
                            <span>Technologies Used</span>
                        </h3>
                        <div className="modal-tech-list">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="badge badge--accent">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="project-modal-footer">
                    <div className="modal-actions-left">
                        {hasLiveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--primary"
                            >
                                <FaExternalLinkAlt aria-hidden="true" />
                                <span>Open Live Demo</span>
                            </a>
                        )}
                        {hasGithubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn--secondary"
                            >
                                <FaGithub aria-hidden="true" />
                                <span>View GitHub Source</span>
                            </a>
                        )}
                    </div>
                    <button className="btn btn--outline" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;

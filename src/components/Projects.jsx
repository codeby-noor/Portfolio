import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "../styles/projects.css";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleOpenModal = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-eyebrow">
                        <span className="section-eyebrow-dot" />
                        <span>Proof of Work</span>
                    </div>
                    <h2 className="section-title">
                        Featured engineering projects.
                    </h2>
                    <p className="section-description">
                        Real-world full-stack applications showcasing frontend modularity, REST API architecture, database modeling, and product functionality.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={handleCloseModal}
            />
        </section>
    );
};

export default Projects;
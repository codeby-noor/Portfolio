import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { SplitWords } from "./Reveal";
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
            <div className="container container--narrow">
                <div className="section-header" data-reveal="rise">
                    <div className="section-eyebrow">
                        <span className="section-index">03</span>
                        <span>Proof of Work</span>
                    </div>
                    <h2 className="section-title">
                        <SplitWords text="Selected engineering projects." />
                    </h2>
                    <p className="section-description">
                        Full-stack applications covering frontend modularity, REST API architecture, database modeling, and product functionality.
                    </p>
                </div>

                <div className="projects-list">
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

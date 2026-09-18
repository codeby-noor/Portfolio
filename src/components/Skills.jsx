import { skillCategories } from "../data/skills";
import { FaFolder } from "react-icons/fa";
import "../styles/skills.css";

const Skills = () => {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-eyebrow">
                        <span className="section-eyebrow-dot" />
                        <span>Technical Capabilities & Application</span>
                    </div>
                    <h2 className="section-title">
                        Technologies applied in real applications.
                    </h2>
                    <p className="section-description">
                        Every technology listed below is backed by practical implementation across full-stack applications in this portfolio.
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category) => (
                        <div key={category.id} className="skill-category-card">
                            <div className="skill-category-header">
                                <div className="skill-category-icon-wrap">
                                    <category.icon className="skill-category-icon" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="skill-category-title">{category.title}</h3>
                                    <p className="skill-category-desc">{category.description}</p>
                                </div>
                            </div>

                            <div className="skill-items-list">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="skill-item-card">
                                        <div className="skill-item-top">
                                            <div className="skill-item-brand">
                                                <skill.icon
                                                    className="skill-item-icon"
                                                    style={{ color: skill.color || "inherit" }}
                                                    aria-hidden="true"
                                                />
                                                <span className="skill-item-name">{skill.name}</span>
                                            </div>
                                            {skill.appliedIn && (
                                                <span className="skill-item-applied">
                                                    <FaFolder className="applied-folder-icon" aria-hidden="true" />
                                                    {skill.appliedIn}
                                                </span>
                                            )}
                                        </div>
                                        {skill.context && (
                                            <p className="skill-item-context">{skill.context}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

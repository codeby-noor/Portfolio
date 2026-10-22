import { useRef, useState } from "react";
import { skillCategories } from "../data/skills";

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabListRef = useRef(null);
    const activeCategory = skillCategories[activeIndex];

    const handleTabKeyDown = (event) => {
        const tabs = [...tabListRef.current.querySelectorAll('[role="tab"]')];
        const currentIndex = tabs.indexOf(event.target);
        let nextIndex;

        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === undefined) return;

        event.preventDefault();
        setActiveIndex(nextIndex);
        tabs[nextIndex].focus();
    };

    return (
        <section id="skills" className="section-block" aria-labelledby="skills-title">
            <div className="content-wrap">
                <div className="section-heading section-heading--row" data-reveal="rise">
                    <div>
                        <p className="eyebrow">03 — Skills</p>
                        <h2 id="skills-title">Technical toolkit</h2>
                    </div>
                    <p className="section-intro">A practical stack for building and connecting web applications.</p>
                </div>
                <div className="skills-explorer" data-reveal="rise">
                    <div
                        className="skill-tabs"
                        role="tablist"
                        aria-label="Technical skill categories"
                        aria-orientation="horizontal"
                        ref={tabListRef}
                        onKeyDown={handleTabKeyDown}
                    >
                        {skillCategories.map((category, index) => (
                            <button
                                className={`skill-tab${index === activeIndex ? " skill-tab--active" : ""}`}
                                id={`skill-tab-${index}`}
                                type="button"
                                role="tab"
                                aria-selected={index === activeIndex}
                                aria-controls="skill-panel"
                                tabIndex={index === activeIndex ? 0 : -1}
                                key={category.title}
                                onClick={() => setActiveIndex(index)}
                            >
                                <span>{category.title}</span>
                                <span className="skill-tab__count">{String(category.skills.length).padStart(2, "0")}</span>
                            </button>
                        ))}
                    </div>
                    <div
                        className="skill-panel"
                        id="skill-panel"
                        role="tabpanel"
                        aria-labelledby={`skill-tab-${activeIndex}`}
                        tabIndex="0"
                    >
                        <p className="skill-panel__eyebrow">{activeCategory.title}</p>
                        <ul className="skill-panel__list">
                            {activeCategory.skills.map((skill) => <li key={skill}>{skill}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

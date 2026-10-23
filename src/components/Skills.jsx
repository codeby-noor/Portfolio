import { useRef, useState } from "react";
import { skillCategories } from "../data/skills";
import Reveal from "./Reveal";

const Skills = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSkill, setActiveSkill] = useState(skillCategories[0].skills[3]);
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
        setActiveSkill(skillCategories[nextIndex].skills[0]);
        tabs[nextIndex].focus();
    };

    return (
        <section id="skills" className="section-block" aria-labelledby="skills-title">
            <Reveal className="content-wrap" y={0}>
                <div className="section-heading section-heading--row">
                    <div>
                        <p className="eyebrow">03 — Skills</p>
                        <h2 id="skills-title">Technical toolkit</h2>
                    </div>
                    <p className="section-intro">A practical stack for building and connecting web applications.</p>
                </div>
                <div className="skills-explorer">
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
                                onClick={() => {
                                    setActiveIndex(index);
                                    setActiveSkill(category.skills[0]);
                                }}
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
                        <div className="skill-network">
                            <div className="skill-focus" aria-live="polite">
                                <span className="skill-focus__index">{String(activeCategory.skills.indexOf(activeSkill) + 1).padStart(2, "0")} / {String(activeCategory.skills.length).padStart(2, "0")}</span>
                                <p className="skill-panel__eyebrow">{activeCategory.title} / Selected node</p>
                                <h3 key={activeSkill} className={`skill-focus__title${activeSkill.length > 23 ? " skill-focus__title--long" : ""}`}>{activeSkill}</h3>
                                <span className="skill-focus__rule" aria-hidden="true" />
                            </div>
                            <div className="skill-network__field" role="group" aria-label={`${activeCategory.title} skills`}>
                                <svg className="skill-network__wires" viewBox="0 0 640 300" preserveAspectRatio="none" aria-hidden="true">
                                    <path d="M26 46 160 100 302 42 451 109 612 54M26 46 76 240 160 100 227 250 302 42 375 232 451 109 554 242 612 54M76 240 227 250 375 232 554 242" />
                                </svg>
                                <ul className="skill-network__nodes">
                                    {activeCategory.skills.map((skill, index) => (
                                        <li className={`skill-network__node skill-network__node--${index % 8}`} key={skill}>
                                            <button
                                                type="button"
                                                aria-pressed={activeSkill === skill}
                                                className={activeSkill === skill ? "skill-network__button skill-network__button--active" : "skill-network__button"}
                                                onClick={() => setActiveSkill(skill)}
                                            >
                                                <span className="skill-network__dot" aria-hidden="true" />
                                                {skill}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

export default Skills;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            const media = gsap.matchMedia();
            media.add({
                desktop: "(min-width: 681px)",
                mobile: "(max-width: 680px)",
            }, ({ conditions }) => {
                const offset = conditions?.desktop ? 38 : 12;
                gsap.utils.toArray(".education-entry").forEach((entry, index) => {
                    gsap.fromTo(entry, { x: index % 2 === 0 ? offset : -offset, rotateY: conditions?.desktop ? (index % 2 === 0 ? -2 : 2) : 0 }, {
                        x: 0,
                        rotateY: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: entry,
                            start: "top 88%",
                            end: "center 56%",
                            scrub: 0.55,
                        },
                    });
                });
            });
            return () => media.revert();
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="education" className="section-block section-block--tint journey-section journey-section--education" aria-labelledby="education-title">
            <Reveal className="content-wrap journey-content" y={0}>
                <div className="section-heading section-heading--row">
                    <div>
                        <p className="eyebrow">06 — Education</p>
                        <h2 id="education-title">Academic background</h2>
                    </div>
                </div>
                <div className="education-list">
                    <article className="education-entry">
                        <p className="education-entry__year"><span className="journey-entry__index">02 / STUDY</span>2025–2026<br /><span>Navsari, Gujarat</span></p>
                        <div>
                            <h3>Full Stack Web Development</h3>
                            <p className="education-entry__institution">Creative Design &amp; Multimedia Institute</p>
                            <p className="education-entry__description">Practical frontend and backend development using modern web technologies, including React.js, JavaScript, Node.js, Express.js, APIs, and databases.</p>
                        </div>
                    </article>
                    <article className="education-entry">
                        <p className="education-entry__year"><span className="journey-entry__index">01 / STUDY</span>2022–2025<br /><span>Navsari, Gujarat</span></p>
                        <div>
                            <h3>Bachelor of Computer Applications (BCA)</h3>
                            <p className="education-entry__institution">Naranlala College of Professional and Applied Science</p>
                            <p className="education-entry__description">Computer applications studies covering programming, databases, and software development foundations.</p>
                        </div>
                    </article>
                </div>
            </Reveal>
        </section>
    );
};

export default Education;

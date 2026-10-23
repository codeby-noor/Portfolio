import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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
                const offset = conditions?.desktop ? 36 : 12;
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 82%",
                        end: "center 48%",
                        scrub: 0.6,
                    },
                })
                    .fromTo(".experience-entry__date", { x: -offset, letterSpacing: "0.08em" }, { x: 0, letterSpacing: "normal", ease: "none" }, 0)
                    .fromTo(".experience-entry__content", { x: offset, rotateY: conditions?.desktop ? -3 : 0, transformOrigin: "left center" }, { x: 0, rotateY: 0, ease: "none" }, 0);
            });
            return () => media.revert();
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="section-block journey-section journey-section--experience" aria-labelledby="experience-title">
            <Reveal className="content-wrap journey-content" y={0}>
                <div className="section-heading section-heading--row">
                    <div>
                        <p className="eyebrow">05 — Experience</p>
                        <h2 id="experience-title">Professional experience</h2>
                    </div>
                </div>

                <article className="experience-entry">
                    <div className="experience-entry__date">
                        <span className="journey-entry__index">01 / WORK</span>
                        <span>April 2026 – September 2026</span>
                        <span>Navsari, India</span>
                    </div>
                    <div className="experience-entry__content">
                        <h3>Full Stack Developer</h3>
                        <p className="experience-entry__company">Viby Solution</p>
                        <ul>
                            <li>Developed and maintained web application features, building responsive interfaces with React.js, Bootstrap and CSS.</li>
                            <li>Integrated REST APIs and supported backend functionality and database-connected application features.</li>
                            <li>Collaborated on project implementation and debugging across frontend and backend workflows.</li>
                        </ul>
                        <p className="experience-entry__stack">React.js · Node.js · Express.js · REST APIs · MySQL · MongoDB</p>
                    </div>
                </article>
            </Reveal>
        </section>
    );
};

export default Experience;

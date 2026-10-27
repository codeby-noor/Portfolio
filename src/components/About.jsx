import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            const rail = section.querySelector(".about-rail__path");
            gsap.fromTo(rail, { strokeDashoffset: 1 }, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 76%",
                    end: "bottom 58%",
                    scrub: 0.6,
                },
            });
            gsap.fromTo(".about-rail__item", { x: -16 }, {
                x: 0,
                stagger: 0.12,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 78%",
                    end: "center center",
                    scrub: 0.5,
                },
            });
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section-block about-section" aria-labelledby="about-title">
            <Reveal className="content-wrap about-layout" y={0}>
                <div className="section-heading about-heading">
                    <p className="eyebrow">01 — About / The throughline</p>
                    <h2 id="about-title">A practical full-stack foundation</h2>
                    <span className="about-heading__index" aria-hidden="true">01</span>
                </div>
                <div className="about-rail" role="group" aria-label="Areas connected by my work: interface, API, and data">
                    <svg className="about-rail__drawing" viewBox="0 0 80 300" aria-hidden="true">
                        <path className="about-rail__track" d="M40 22V278" pathLength="1" />
                        <path className="about-rail__path" d="M40 22V278" pathLength="1" />
                    </svg>
                    <div className="about-rail__items">
                        {["Interface", "API", "Data"].map((label, index) => (
                            <div className="about-rail__item" key={label}>
                                <span className="about-rail__number">0{index + 1}</span>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="about-copy">
                    <p>
                        I’m Mahenoor Shaikh, also known as Mahenoor Asif Shaikh. My background combines a Bachelor of Computer Applications with focused full-stack web development training at Creative Design &amp; Multimedia Institute. At Viby Solution, I worked on web application features, responsive React interfaces, REST API integrations, and database-connected functionality.
                    </p>
                    <p>
                        Across project work, my toolkit includes HTML, CSS, Bootstrap, JavaScript, React.js, Node.js, Express.js, REST APIs, MySQL, MongoDB, Git, and GitHub, alongside authentication integrations. I’m interested in building responsive applications where clear user experiences are supported by reliable backend behavior, thoughtful data handling, and maintainable components. I also value collaborating through implementation and debugging to keep features consistent from interface to data layer.
                    </p>
                </div>
            </Reveal>
        </section>
    );
};

export default About;

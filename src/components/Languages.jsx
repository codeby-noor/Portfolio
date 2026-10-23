import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const languages = ["English", "Hindi", "Gujarati"];

const Languages = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            const media = gsap.matchMedia();
            media.add("(min-width: 681px)", () => {
                gsap.fromTo(".languages-list li", { y: 24, rotateX: -14, transformOrigin: "center top" }, {
                    y: 0,
                    rotateX: 0,
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 78%",
                        end: "center 48%",
                        scrub: 0.55,
                    },
                });
            });
            media.add("(max-width: 680px)", () => {
                gsap.fromTo(".languages-list li", { x: -12 }, {
                    x: 0,
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 82%",
                        end: "center 50%",
                        scrub: 0.5,
                    },
                });
            });
            return () => media.revert();
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} id="languages" className="section-block language-section" aria-labelledby="languages-title">
            <Reveal className="content-wrap languages-layout" y={0}>
                <div className="section-heading">
                    <p className="eyebrow">07 — Languages</p>
                    <h2 id="languages-title">Languages</h2>
                </div>
                <ul className="languages-list">
                    {languages.map((language) => <li key={language}>{language}</li>)}
                </ul>
            </Reveal>
        </section>
    );
};

export default Languages;

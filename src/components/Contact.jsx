import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const orbitRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const orbit = orbitRef.current;
        if (!section || !orbit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const context = gsap.context(() => {
            gsap.to(".contact-orbit__ring--outer", {
                rotation: 26,
                transformOrigin: "50% 50%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.7,
                },
            });
            gsap.fromTo(".contact-orbit__signal", { strokeDashoffset: 1 }, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    end: "center center",
                    scrub: 0.5,
                },
            });
        }, section);

        const moveOrbit = (event) => {
            const bounds = orbit.getBoundingClientRect();
            const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
            const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
            orbit.style.setProperty("--orbit-x", `${Math.max(-1, Math.min(1, x)) * 10}px`);
            orbit.style.setProperty("--orbit-y", `${Math.max(-1, Math.min(1, y)) * 10}px`);
        };
        const resetOrbit = () => {
            orbit.style.setProperty("--orbit-x", "0px");
            orbit.style.setProperty("--orbit-y", "0px");
        };

        orbit.addEventListener("pointermove", moveOrbit);
        orbit.addEventListener("pointerleave", resetOrbit);
        return () => {
            orbit.removeEventListener("pointermove", moveOrbit);
            orbit.removeEventListener("pointerleave", resetOrbit);
            context.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="section-block contact-section" aria-labelledby="contact-title">
            <Reveal className="content-wrap contact-content" y={0}>
                <p className="eyebrow">08 — Contact</p>
                <h2 id="contact-title">Let’s build something meaningful.</h2>
                <p className="contact-intro">For roles, collaborations or a conversation about my work, get in touch.</p>
                <div className="contact-orbit" ref={orbitRef} aria-hidden="true">
                    <svg viewBox="0 0 280 280">
                        <circle className="contact-orbit__ring contact-orbit__ring--outer" cx="140" cy="140" r="116" />
                        <circle className="contact-orbit__ring contact-orbit__ring--middle" cx="140" cy="140" r="88" />
                        <circle className="contact-orbit__ring contact-orbit__ring--inner" cx="140" cy="140" r="59" />
                        <path className="contact-orbit__signal" d="M140 24v51m0 130v51M24 140h51m130 0h51M58 58l36 36m92 92 36 36m0-164-36 36m-92 92-36 36" pathLength="1" />
                        <circle className="contact-orbit__core" cx="140" cy="140" r="4" />
                        <text className="contact-orbit__label" x="140" y="18" textAnchor="middle">OPEN TO CONNECT</text>
                        <text className="contact-orbit__monogram" x="140" y="150" textAnchor="middle">MS</text>
                        <text className="contact-orbit__label" x="140" y="272" textAnchor="middle">NAVSARI · INDIA</text>
                    </svg>
                </div>
                <a className="contact-email" href="mailto:Mahenoorshaikh0408@gmail.com">Mahenoorshaikh0408@gmail.com</a>
                <div className="contact-socials">
                    <a href="https://www.linkedin.com/in/mahenoor-shaikh-994125350/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://github.com/codeby-noor" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="/resume.pdf" download>Resume</a>
                </div>
            </Reveal>
        </section>
    );
};

export default Contact;

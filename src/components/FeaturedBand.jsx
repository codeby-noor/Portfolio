import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { featuredProject } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/**
 * FeaturedBand — larger featured-project presentation.
 * On scroll: visual slowly scales, content moves at different
 * speed (parallax), connected cinematic transition.
 */
const FeaturedBand = ({ onOpenCase }) => {
    const bandRef = useRef(null);
    const visualRef = useRef(null);
    const bodyRef = useRef(null);
    const project = featuredProject;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                visualRef.current,
                { scale: 1.12 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: { trigger: bandRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
                }
            );
            gsap.fromTo(
                bodyRef.current,
                { y: 40 },
                {
                    y: -30,
                    ease: "none",
                    scrollTrigger: { trigger: bandRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
                }
            );
        }, bandRef);
        return () => ctx.revert();
    }, []);

    return (
        <article ref={bandRef} className="featured-band" aria-label={`Featured project ${project.title}`}>
            <div className="featured-band__visual">
                <div ref={visualRef} className="featured-band__visual-inner" style={{ inset: "-12%" }}>
                    <span className="featured-band__orb" />
                </div>
            </div>
            <div ref={bodyRef} className="featured-band__body">
                <div className="featured-band__kicker">
                    <span className="badge badge--accent">★ Featured</span>
                    <span>{project.category}</span>
                </div>
                <h3 className="featured-band__title">
                    {project.title} — <span className="text-gradient">{project.tagline}</span>
                </h3>
                <p className="featured-band__text">{project.overview}</p>
                <div className="featured-band__tech">
                    {project.technologies.slice(0, 6).map((t) => (
                        <span key={t} className="badge">{t}</span>
                    ))}
                </div>
                <div className="project-card-actions">
                    <button className="btn btn--primary btn--sm" onClick={() => onOpenCase(project)}>
                        <span>View Case Study</span>
                        <FaArrowRight aria-hidden="true" />
                    </button>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--sm">
                            <FaExternalLinkAlt aria-hidden="true" />
                            <span>{project.liveLabel || "View Live"}</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

export default FeaturedBand;

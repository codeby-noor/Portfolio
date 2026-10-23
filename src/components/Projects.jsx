import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const ProjectIllustration = ({ project }) => {
    if (project.id === "ecommerce") {
        return (
            <svg className="project-art project-art--commerce" viewBox="0 0 640 400" role="img" aria-label="Illustrative e-commerce product catalogue">
                <rect className="art-frame" x="34" y="30" width="572" height="340" rx="2" />
                <path className="art-rule" d="M34 78h572M34 112h572" />
                <circle className="art-dot" cx="56" cy="54" r="4" />
                <circle className="art-dot" cx="72" cy="54" r="4" />
                <circle className="art-dot" cx="88" cy="54" r="4" />
                <path className="art-ink" d="M66 95h100M514 95h38" />
                <rect className="art-panel" x="66" y="142" width="154" height="172" />
                <rect className="art-panel" x="243" y="142" width="154" height="172" />
                <rect className="art-panel" x="420" y="142" width="154" height="172" />
                <path className="art-accent-fill" d="M84 256l28-68 28 68zm174 0 28-68 28 68zm174 0 28-68 28 68z" />
                <path className="art-ink" d="M84 282h82m-82 15h54m95-15h82m-82 15h54m95-15h82m-82 15h54" />
                <path className="art-accent" d="M66 331h508" />
            </svg>
        );
    }

    if (project.id === "codequest") {
        return (
            <svg className="project-art project-art--codequest" viewBox="0 0 640 400" role="img" aria-label="Illustrative coding mission progression interface">
                <rect className="art-frame" x="34" y="30" width="572" height="340" rx="2" />
                <path className="art-rule" d="M34 78h572" />
                <circle className="art-dot" cx="56" cy="54" r="4" />
                <circle className="art-dot" cx="72" cy="54" r="4" />
                <circle className="art-dot" cx="88" cy="54" r="4" />
                <text className="art-small" x="66" y="112">LEARNING PATH</text>
                <text className="art-large" x="66" y="152">World 04</text>
                <text className="art-small" x="482" y="145">97 MISSIONS</text>
                <path className="art-path" d="M112 224c46-52 80 48 126 0s80-50 126 0 80 50 126 0" />
                <circle className="art-node art-node--done" cx="112" cy="224" r="18" />
                <circle className="art-node art-node--done" cx="238" cy="224" r="18" />
                <circle className="art-node art-node--active" cx="364" cy="224" r="22" />
                <circle className="art-node" cx="490" cy="224" r="18" />
                <path className="art-check" d="m104 224 6 6 12-14m110 8 6 6 12-14" />
                <text className="art-label" x="87" y="268">01</text>
                <text className="art-label" x="213" y="268">02</text>
                <text className="art-label" x="339" y="268">03</text>
                <text className="art-label" x="465" y="268">04</text>
                <path className="art-rule" d="M66 310h508" />
                <text className="art-small" x="66" y="340">LEVEL 08</text>
                <text className="art-small" x="230" y="340">XP 2,450</text>
                <text className="art-small" x="452" y="340">6 WORLDS</text>
            </svg>
        );
    }

    return (
        <svg className="project-art project-art--property" viewBox="0 0 640 400" role="img" aria-label="Illustrative property marketplace listing page">
            <rect className="art-frame" x="34" y="30" width="572" height="340" rx="2" />
            <path className="art-rule" d="M34 78h572" />
            <circle className="art-dot" cx="56" cy="54" r="4" />
            <circle className="art-dot" cx="72" cy="54" r="4" />
            <circle className="art-dot" cx="88" cy="54" r="4" />
            <rect className="art-panel" x="66" y="106" width="235" height="210" />
            <path className="art-building" d="M91 267h185v-96l-90-48-95 48zm53 0v-58h40v58m36 0v-42h31" />
            <path className="art-accent" d="m107 166 79-42 77 42" />
            <path className="art-ink" d="M331 120h190m-190 18h120" />
            <text className="art-small" x="331" y="171">PROPERTY DETAILS</text>
            <path className="art-rule" d="M331 188h207" />
            <text className="art-large art-price" x="331" y="224">3 bedroom home</text>
            <path className="art-ink" d="M331 246h170m-170 18h143m-143 18h190" />
            <rect className="art-action" x="331" y="300" width="128" height="30" />
            <path className="art-action-line" d="M348 315h94" />
        </svg>
    );
};

const ProjectCard = ({ project }) => {
    const reduceMotion = useReducedMotion();
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card || reduceMotion) return undefined;

        const context = gsap.context(() => {
            const media = gsap.matchMedia();
            media.add({
                desktop: "(min-width: 900px)",
                mobile: "(max-width: 899px)",
            }, ({ conditions }) => {
                const desktop = conditions?.desktop;
                const visual = card.querySelector(".project-cover");
                const content = card.querySelector(".project-card__body");
                const scenes = {
                    "ai-jamin": {
                        from: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.12, rotateX: -7, y: 22 },
                        to: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, rotateX: 0, y: 0 },
                    },
                    ecommerce: {
                        from: { clipPath: "inset(0% 100% 0% 0%)", scale: 0.92, rotateY: 11, x: -18 },
                        to: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, rotateY: 0, x: 0 },
                    },
                    codequest: {
                        from: { clipPath: "inset(100% 0% 0% 0%)", scale: 0.94, rotateY: -10, y: -16 },
                        to: { clipPath: "inset(0% 0% 0% 0%)", scale: 1, rotateY: 0, y: 0 },
                    },
                };
                const scene = scenes[project.id];
                const from = desktop ? scene.from : { ...scene.from, scale: 0.97, rotateX: 0, rotateY: 0, x: 0, y: 10 };
                const to = scene.to;
                const coverArt = card.querySelector(".project-art, .project-cover img");

                gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 92%",
                        end: "center 55%",
                        scrub: 0.65,
                        invalidateOnRefresh: true,
                    },
                })
                    .fromTo(visual, from, { ...to, ease: "none" }, 0)
                    .fromTo(content, { y: desktop ? 28 : 12 }, { y: 0, ease: "none" }, 0.1)
                    .fromTo(coverArt, { scale: 1.13 }, { scale: 1, ease: "none" }, 0);
            });
            return () => media.revert();
        }, card);

        return () => context.revert();
    }, [project.id, reduceMotion]);

    return (
        <motion.article
            ref={cardRef}
            className={`project-card project-card--${project.id}`}
            data-project={project.id}
            initial={false}
            whileHover={reduceMotion ? undefined : { y: -3 }}
        >
            <div className="project-cover">
                <span className="project-cover__index">{project.number} / SELECTED WORK</span>
                {project.image ? (
                    <img
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        width="640"
                        height="400"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="project-cover__illustration">
                        <ProjectIllustration project={project} />
                        <span className="project-cover__caption">Illustrative preview · not a screenshot</span>
                    </div>
                )}
                {project.liveUrl && <span className="project-cover__live">Live project</span>}
            </div>
            <div className="project-card__body">
                <div className="project-card__heading">
                    <p className="eyebrow"><span className="project-number">{project.number}</span> / {project.type}</p>
                    <h3>{project.title}</h3>
                    <p className="project-card__summary">{project.summary}</p>
                </div>
                <div className="project-contribution">
                    <p className="project-contribution__label">Contribution</p>
                    <ul>
                        {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                    </ul>
                </div>
                {project.technologies.length > 0 && (
                    <ul className="tag-list" aria-label="Technologies">
                        {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                )}
                <div className="project-links">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live project <span aria-hidden="true">↗</span></a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

const Projects = () => (
    <section id="projects" className="section-block section-block--projects" aria-labelledby="projects-title">
        <Reveal className="content-wrap" y={0}>
            <div className="section-heading section-heading--row">
                <div>
                    <p className="eyebrow">04 — Projects</p>
                    <h2 id="projects-title">Selected work</h2>
                </div>
                <p className="section-intro">Product features, API integration and learning workflows across three full-stack projects.</p>
            </div>
            <div className="project-grid">
                {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
        </Reveal>
    </section>
);

export default Projects;

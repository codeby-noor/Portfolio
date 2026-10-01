import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { EASE } from "../motion/motion";

/**
 * RealEstateSchematic — simplified structural schematic of the
 * AI Jamin listings interface: filter bar + property rows with
 * the metadata the shipped UI actually presents.
 */
const RealEstateSchematic = () => (
    <div className="schema schema--estate" aria-hidden="true">
        <div className="schema__filterbar">
            <span className="schema__search" />
            <span className="schema__chip schema__chip--active" />
            <span className="schema__chip" />
            <span className="schema__chip" />
        </div>
        {[
            { price: "₹ 68.5 L", meta: "3 BHK · 1,450 sq.ft · Navsari", tag: "For Sale" },
            { price: "₹ 42.0 L", meta: "2 BHK · 1,020 sq.ft · Surat", tag: "For Sale" },
            { price: "₹ 95.0 L", meta: "4 BHK · 2,100 sq.ft · Navsari", tag: "New" },
        ].map((row) => (
            <div className="schema__listing" key={row.price}>
                <span className="schema__thumb" />
                <span className="schema__lines">
                    <span className="schema__price">{row.price}</span>
                    <span className="schema__meta">{row.meta}</span>
                </span>
                <span className="schema__tag">{row.tag}</span>
            </div>
        ))}
    </div>
);

/**
 * FinanceSchematic — simplified structural schematic of the
 * Diamond Finance dashboard: balance summary, monthly bars,
 * and ledger rows reflecting real computed values.
 */
const FinanceSchematic = () => (
    <div className="schema schema--finance" aria-hidden="true">
        <div className="schema__balance">
            <span className="schema__balance-label">Total balance</span>
            <span className="schema__balance-value">₹ 1,24,500</span>
            <span className="schema__balance-sub">Income ₹ 1,80,000 · Expenses ₹ 55,500</span>
        </div>
        <div className="schema__bars">
            {[38, 55, 44, 70, 58, 86, 64].map((h, i) => (
                <span key={i} className="schema__bar" style={{ height: `${h}%` }} />
            ))}
        </div>
        {[
            { label: "Consulting payout · Oct 12", amount: "+ ₹ 45,000", pos: true },
            { label: "Office rent · Oct 05", amount: "− ₹ 18,000", pos: false },
            { label: "Software subscription · Oct 02", amount: "− ₹ 2,400", pos: false },
        ].map((row) => (
            <div className="schema__ledger" key={row.label}>
                <span className="schema__ledger-label">{row.label}</span>
                <span className={`schema__ledger-amt ${row.pos ? "pos" : "neg"}`}>{row.amount}</span>
            </div>
        ))}
    </div>
);

/**
 * ProjectCard — alternating editorial showcase.
 * Numbered entry: browser-framed interface schematic with
 * scroll parallax beside role/stack/focus copy and links.
 */
const ProjectCard = ({ project, index, onOpenModal }) => {
    const hasLiveUrl = project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "";
    const hasGithubUrl = project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "";
    const num = String(index + 1).padStart(2, "0");
    const reversed = index % 2 === 1;

    return (
        <motion.article
            className={`project-entry${reversed ? " project-entry--reverse" : ""}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: EASE.out }}
        >
            <div className="project-entry__top">
                <span className="project-index">{num}</span>
                <span className="badge">{project.category}</span>
                {project.featured && <span className="badge badge--accent">Featured</span>}
                <span className="project-entry__standing">
                    {project.role}{project.access ? ` — ${project.access}` : ""}
                </span>
            </div>

            <div className="project-show">
                <figure className="project-fig" data-parallax="0.04">
                    <div className="browser-frame">
                        <div className="browser-bar" aria-hidden="true">
                            <span className="browser-dot" />
                            <span className="browser-dot" />
                            <span className="browser-dot" />
                            <span className="browser-url">
                                {project.liveUrl
                                    ? project.liveUrl.replace("https://", "").replace("http://", "").replace(/\/$/, "")
                                    : "private — authorized access"}
                            </span>
                        </div>
                        <div className="browser-body">
                            {project.type === "finance" ? <FinanceSchematic /> : <RealEstateSchematic />}
                        </div>
                    </div>
                    <figcaption className="fig-cap">
                        Interface structure — simplified schematic of the shipped UI
                    </figcaption>
                </figure>

                <div className="project-copy">
                    <h3 className="project-entry__title">{project.title}</h3>
                    <p className="project-entry__tagline">{project.tagline}</p>
                    <p className="project-entry__scope">{project.whatIBuilt || project.summary}</p>

                    <dl className="project-spec">
                        <div className="project-spec__item">
                            <dt>Role</dt>
                            <dd>{project.role}</dd>
                        </div>
                        <div className="project-spec__item">
                            <dt>Stack</dt>
                            <dd>{project.stackShort || project.technologies.slice(0, 4).join(" / ")}</dd>
                        </div>
                        <div className="project-spec__item">
                            <dt>Focus</dt>
                            <dd>{project.focus || "Frontend / Database"}</dd>
                        </div>
                    </dl>

                    {project.keyFeatures.length > 0 && (
                        <ul className="project-entry__points">
                            {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                                <li key={idx}>{feat}</li>
                            ))}
                        </ul>
                    )}

                    <p className="project-entry__stack">{project.technologies.join("  ·  ")}</p>

                    <div className="project-entry__actions">
                        <button
                            className="btn btn--primary btn--sm"
                            onClick={() => onOpenModal(project)}
                            aria-label={`View Case Study for ${project.title}`}
                        >
                            <span>View Case Study</span>
                            <FaArrowRight aria-hidden="true" />
                        </button>
                        {hasLiveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-entry__link"
                                aria-label={`Open Live Demo for ${project.title}`}
                            >
                                <span>{project.liveLabel || "View Live Project"}</span>
                                <FaExternalLinkAlt aria-hidden="true" />
                            </a>
                        )}
                        {!hasLiveUrl && project.privateLabel && (
                            <span className="project-entry__private">{project.privateLabel}</span>
                        )}
                        {hasGithubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-entry__link"
                                aria-label={`View Source Code on GitHub for ${project.title}`}
                            >
                                <span>GitHub</span>
                                <FaExternalLinkAlt aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;

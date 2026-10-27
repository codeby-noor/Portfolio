import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { ProjectIllustration } from "./Projects";
import ThemeToggle from "./ThemeToggle";
import "../styles/projectDetail.css";

const CaseStudySection = ({ id, number, kicker, title, children, className = "" }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            return undefined;
        }

        if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
            section.dataset.revealed = "true";
            return undefined;
        }

        section.dataset.revealPending = "true";
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                delete section.dataset.revealPending;
                section.dataset.revealed = "true";
                observer.disconnect();
            }
        }, { rootMargin: "0px 0px -48px 0px", threshold: 0.08 });

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`shopera-section${className ? ` ${className}` : ""}`}
            aria-labelledby={`${id}-title`}
        >
            <div className="shopera-section__heading">
                <span className="shopera-section__number" aria-hidden="true">{number}</span>
                <div>
                    <p className="shopera-section__kicker">{kicker}</p>
                    <h2 id={`${id}-title`}>{title}</h2>
                </div>
            </div>
            <div className="shopera-section__content">{children}</div>
        </section>
    );
};

const ShoperaArchitecture = () => {
    const layers = [
        {
            index: "01",
            name: "Storefront",
            detail: "React 18 · React Router · Bootstrap",
            note: "Pages and responsive UI",
        },
        {
            index: "02",
            name: "Client state",
            detail: "Context · Axios",
            note: "Auth, cart, wishlist, compare",
        },
        {
            index: "03",
            name: "REST API",
            detail: "Node.js · Express",
            note: "Routes, controllers, JWT",
        },
        {
            index: "04",
            name: "Data",
            detail: "MySQL · mysql2",
            note: "Persistent application records",
        },
    ];

    return (
        <div className="shopera-architecture">
            <p className="shopera-architecture__direction">
                <span aria-hidden="true">01</span> Request <span aria-hidden="true">→</span> response
            </p>
            <ol className="shopera-architecture__layers">
                {layers.map((layer) => (
                    <li className="shopera-architecture__layer" key={layer.index}>
                        <span className="shopera-architecture__index">{layer.index}</span>
                        <h3>{layer.name}</h3>
                        <p className="shopera-architecture__stack">{layer.detail}</p>
                        <p className="shopera-architecture__note">{layer.note}</p>
                    </li>
                ))}
            </ol>
            <p className="shopera-architecture__caption">
                The browser UI calls the configured API through the shared Axios client. Authenticated requests attach a JWT; the Express service reads and writes application data through mysql2.
            </p>
        </div>
    );
};

const ShoperaCaseStudy = ({ project }) => (
    <article className="shopera-case-study">
        <header className="shopera-hero">
            <div className="shopera-hero__copy">
                <p className="shopera-hero__eyebrow">
                    <span className="shopera-hero__mark" aria-hidden="true" />
                    {project.type}
                </p>
                <h1>{project.detailTitle}</h1>
                <p className="shopera-hero__tagline">{project.tagline}</p>
                <p className="shopera-hero__description">{project.summary}</p>
                <div className="shopera-hero__actions">
                    <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo <span aria-hidden="true">↗</span>
                    </a>
                    <a className="button shopera-hero__source" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        View Source Code <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <ul className="shopera-hero__technologies" aria-label="Core technologies">
                    {project.heroTechnologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
            </div>

            <figure className="shopera-hero__preview">
                <div className="shopera-browser-bar" aria-hidden="true">
                    <span className="shopera-browser-bar__lights"><i /><i /><i /></span>
                    <span className="shopera-browser-bar__address">shopera-ecommerce-frontend.vercel.app</span>
                    <span className="shopera-browser-bar__status">LIVE</span>
                </div>
                <img
                    src={project.image}
                    alt={project.imageAlt}
                    width="1365"
                    height="850"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(max-width: 900px) 100vw, 58vw"
                />
                <figcaption>
                    <span>01 / STOREFRONT</span>
                    <span>Live application · Vercel</span>
                </figcaption>
            </figure>

            <dl className="shopera-hero__facts">
                <div>
                    <dt>ROLE</dt>
                    <dd>{project.role}</dd>
                </div>
                <div>
                    <dt>DELIVERABLE</dt>
                    <dd>{project.deliverable}</dd>
                </div>
                <div>
                    <dt>STACK</dt>
                    <dd>React · Node.js · MySQL</dd>
                </div>
            </dl>
        </header>

        <div className="shopera-case-study__body">
            <CaseStudySection id="shopera-overview" number="01" kicker="Project overview" title="A considered journey from discovery to cart">
                <div className="shopera-overview">
                    <p className="shopera-overview__statement">{project.overview}</p>
                    <div className="shopera-overview__details">
                        <div>
                            <h3>Who it serves</h3>
                            <p>{project.intendedUsers}</p>
                        </div>
                        <div>
                            <h3>What it brings together</h3>
                            <p>{project.problem}</p>
                        </div>
                    </div>
                </div>
            </CaseStudySection>

            <CaseStudySection id="shopera-experience" number="02" kicker="Product experience" title="A storefront built around product discovery" className="shopera-section--gallery">
                <p className="shopera-section__intro">
                    Explore the live catalogue and the cart’s designed empty state. Each image below is an unaltered capture of the public SHOPERA application.
                </p>
                <div className="shopera-gallery">
                    {project.screenshots.map((screenshot, index) => (
                        <figure className="shopera-gallery__item" key={screenshot.src}>
                            <div className="shopera-gallery__frame">
                                <img
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    width="1365"
                                    height="850"
                                    loading="lazy"
                                    decoding="async"
                                    sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 44vw"
                                />
                            </div>
                            <figcaption>
                                <span className="shopera-gallery__index">0{index + 2}</span>
                                <span>
                                    <strong>{screenshot.title}</strong>
                                    <span>{screenshot.description}</span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </CaseStudySection>

            <CaseStudySection id="shopera-features" number="03" kicker="Core features" title="The commerce flows behind the interface">
                <ul className="shopera-feature-grid">
                    {project.features.map((feature, index) => (
                        <li className="shopera-feature" key={feature}>
                            <span className="shopera-feature__index">0{index + 1}</span>
                            <p>{feature}</p>
                        </li>
                    ))}
                </ul>
            </CaseStudySection>

            <CaseStudySection id="shopera-architecture" number="04" kicker="Technical architecture" title="A layered application with clear boundaries">
                <ShoperaArchitecture />
            </CaseStudySection>

            <CaseStudySection id="shopera-engineering" number="05" kicker="Engineering decisions" title="Keep state, API, and persistence in sync">
                <div className="shopera-engineering">
                    <div className="shopera-engineering__decisions">
                        {project.engineeringDecisions.map((decision, index) => (
                            <article className="shopera-decision" key={decision.title}>
                                <span className="shopera-decision__index">DECISION 0{index + 1}</span>
                                <h3>{decision.title}</h3>
                                <p>{decision.description}</p>
                            </article>
                        ))}
                    </div>
                    <aside className="shopera-challenges" aria-labelledby="shopera-challenges-title">
                        <p className="shopera-challenges__eyebrow">Challenges / solutions</p>
                        <h3 id="shopera-challenges-title">Connecting the shopping journey</h3>
                        {project.engineeringChallenges.map((challenge, index) => (
                            <p className="shopera-challenges__item" key={challenge}>
                                <span>0{index + 1}</span>
                                {challenge}
                            </p>
                        ))}
                    </aside>
                </div>
            </CaseStudySection>

            <CaseStudySection id="shopera-outcome" number="06" kicker="Reflection" title="A full-stack product, end to end">
                <div className="shopera-outcome">
                    <p>{project.outcome}</p>
                    <p><strong>Key learning</strong>{project.learning}</p>
                </div>
            </CaseStudySection>

            <section className="shopera-cta" aria-labelledby="shopera-cta-title">
                <div>
                    <p className="shopera-section__kicker">Explore the project</p>
                    <h2 id="shopera-cta-title">See SHOPERA in action.</h2>
                    <p>Visit the live storefront or explore the implementation in the public repository.</p>
                </div>
                <div className="shopera-cta__actions">
                    <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo <span aria-hidden="true">↗</span>
                    </a>
                    <a className="button shopera-cta__source" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        View Source Code <span aria-hidden="true">↗</span>
                    </a>
                    <a className="shopera-cta__back" href="/#projects">← Back to selected projects</a>
                </div>
            </section>
        </div>
    </article>
);

const ProjectDetailPage = ({ project, theme, onToggleTheme }) => {
    const relatedProjects = projects.filter(({ slug }) => slug !== project.slug);

    return (
        <div className={`portfolio-app project-detail-app${project.slug === "shopera" ? " project-detail-app--shopera" : ""}`}>
            <a className="skip-link" href="#main-content">Skip to content</a>
            <header className="site-header">
                <div className="site-header__inner project-detail-header">
                    <a className="site-brand" href="/">
                        <span>Mahenoor Shaikh</span>
                    </a>
                    <nav className="project-detail-nav" aria-label="Project navigation">
                        <a href="/#projects">All projects</a>
                        <a href="/#contact">Contact</a>
                    </nav>
                    <div className="site-header__actions">
                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                        <a className="button button--small button--outline resume-link" href="/resume.pdf" download>
                            Resume
                        </a>
                    </div>
                </div>
            </header>

            <main id="main-content" className="project-detail">
                <div className="content-wrap">
                    <nav className="project-breadcrumbs" aria-label="Breadcrumb">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li><a href="/#projects">Projects</a></li>
                            <li aria-current="page">{project.detailTitle}</li>
                        </ol>
                    </nav>

                    {project.slug === "shopera" ? (
                        <ShoperaCaseStudy project={project} />
                    ) : (
                        <>
                    <header className="project-detail-intro">
                        <p className="eyebrow">{project.type} / Project case study</p>
                        <h1>{project.detailTitle}</h1>
                        {project.tagline && <p className="project-detail-tagline">{project.tagline}</p>}
                        <p className="project-detail-lead">{project.summary}</p>
                        {(project.liveUrl || project.githubUrl) && (
                            <div className="project-detail-hero-actions">
                                {project.liveUrl && (
                                    <a className="button button--primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        {project.liveLabel || "Live Demo"} <span aria-hidden="true">↗</span>
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a className="button button--outline" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        Repository <span aria-hidden="true">↗</span>
                                    </a>
                                )}
                            </div>
                        )}
                    </header>

                    <figure className="project-detail-figure">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.imageAlt || `${project.title} project screenshot`}
                                width="1365"
                                height="850"
                                loading="eager"
                                decoding="async"
                            />
                        ) : (
                            <>
                                <ProjectIllustration project={project} />
                                <figcaption>Illustrative interface preview, not a product screenshot.</figcaption>
                            </>
                        )}
                        {project.image && <figcaption>Screenshot of the live SHOPERA storefront.</figcaption>}
                    </figure>

                    <div className="project-detail-facts">
                        <section aria-labelledby="project-purpose-title">
                            <p className="project-detail-label">Project overview</p>
                            <h2 id="project-purpose-title">Purpose and audience</h2>
                            <p>{project.overview || project.summary}</p>
                            {project.intendedUsers && <p><strong>Intended users:</strong> {project.intendedUsers}</p>}
                            {project.problem && <p><strong>Problem addressed:</strong> {project.problem}</p>}
                        </section>
                        <section aria-labelledby="project-stack-title">
                            <p className="project-detail-label">Technology</p>
                            <h2 id="project-stack-title">Verified stack</h2>
                            <ul className="project-detail-tags">
                                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                            </ul>
                        </section>
                    </div>

                    <section className="project-detail-section" aria-labelledby="project-features-title">
                        <p className="project-detail-label">Product features</p>
                        <h2 id="project-features-title">
                            {project.slug === "shopera" ? "SHOPERA shopping experience" : "Documented project features"}
                        </h2>
                        <ul className="project-detail-list">
                            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                        </ul>
                    </section>

                    <section className="project-detail-section" aria-labelledby="project-contributions-title">
                        <p className="project-detail-label">My role and responsibilities</p>
                        <h2 id="project-contributions-title">My contribution</h2>
                        <ul className="project-detail-list">
                            {project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                        </ul>
                    </section>

                    <section className="project-detail-section" aria-labelledby="project-technical-title">
                        <p className="project-detail-label">Technical implementation</p>
                        <h2 id="project-technical-title">How the application is structured</h2>
                        <p>{project.technicalContext}</p>
                    </section>

                    {project.engineeringChallenges?.length > 0 && (
                        <section className="project-detail-section" aria-labelledby="project-challenges-title">
                            <p className="project-detail-label">Engineering challenges</p>
                            <h2 id="project-challenges-title">Keeping the commerce flows connected</h2>
                            <ul className="project-detail-list">
                                {project.engineeringChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}
                            </ul>
                        </section>
                    )}

                    {project.screenshots?.length > 0 && (
                        <section className="project-detail-section project-gallery" aria-labelledby="project-gallery-title">
                            <p className="project-detail-label">Product screens</p>
                            <h2 id="project-gallery-title">SHOPERA in use</h2>
                            <div className="project-gallery__grid">
                                {project.screenshots.map((screenshot) => (
                                    <figure className={`project-gallery__item${screenshot.mobile ? " project-gallery__item--mobile" : ""}`} key={screenshot.src}>
                                        <img
                                            src={screenshot.src}
                                            alt={screenshot.alt}
                                            width={screenshot.mobile ? "390" : "1365"}
                                            height={screenshot.mobile ? "844" : "850"}
                                            loading="lazy"
                                            decoding="async"
                                            sizes={screenshot.mobile ? "(max-width: 600px) 100vw, 25vw" : "(max-width: 600px) 100vw, 50vw"}
                                        />
                                        <figcaption>{screenshot.title}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="project-detail-section" aria-labelledby="project-outcome-title">
                        <p className="project-detail-label">Results and learning</p>
                        <h2 id="project-outcome-title">
                            {project.slug === "shopera" ? "A working full-stack storefront" : "Project outcomes"}
                        </h2>
                        <p>{project.outcome}</p>
                        {project.learning && <p><strong>Learning:</strong> {project.learning}</p>}
                    </section>

                    <nav className="project-related" aria-label="Other project case studies">
                        <h2>Explore other projects</h2>
                        <ul>
                            {relatedProjects.map((relatedProject) => (
                                <li key={relatedProject.slug}>
                                    <a href={`/projects/${relatedProject.slug}`}>{relatedProject.detailTitle}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="project-detail-actions">
                        <a href="/#projects">Back to all projects</a>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                {project.liveLabel || "Visit the live project"}
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Public source repository</a>
                        )}
                    </div>
                        </>
                    )}
                </div>
            </main>

            <footer className="site-footer">
                <div className="content-wrap site-footer__inner">
                    <div className="site-footer__identity">
                        <span className="site-footer__monogram" aria-hidden="true">MS</span>
                        <div>
                            <span>© {new Date().getFullYear()} Mahenoor Shaikh</span>
                            <span className="site-footer__caption">Full-Stack Web Developer · Navsari, India</span>
                        </div>
                    </div>
                    <a href="/">Portfolio home</a>
                </div>
            </footer>
        </div>
    );
};

export default ProjectDetailPage;

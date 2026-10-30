import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import "../styles/interfaceShowcase.css";

const cards = [
    { id: "atelier", category: "Storefront", title: "Atelier No. 8", note: "E-commerce · Editorial objects", kind: "shop" },
    { id: "ledger", category: "Data", title: "Fieldnote Analytics", note: "Dashboard · Illustrative sample data", kind: "dashboard" },
    { id: "responsive", category: "Responsive", title: "Common Ground", note: "One experience · Three viewports", kind: "responsive" },
    { id: "walkthrough", category: "Motion", title: "Project walkthrough", note: "Video · Recording needed", kind: "video" },
    { id: "themes", category: "Themes", title: "Day / Night", note: "Theme study · Design Experiment", kind: "themes" },
    { id: "components", category: "Components", title: "Forma UI", note: "Interface kit · UI Concept", kind: "components" },
];
const filters = ["All", "Storefront", "Data", "Responsive", "Motion", "Themes", "Components"];
const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

function ShopPreview() {
    const products = [
        ["arc", "Arc lounge chair", "$1,280"],
        ["vase", "Sculpture vase", "$148"],
        ["lamp", "Studio lamp", "$420"],
        ["bowl", "Still life bowl", "$86"],
    ];

    return (
        <div className="is-shop">
            <header className="is-shop__header">
                <b className="is-shop__brand">ATELIER <i>NO. 8</i><small>OBJECTS FOR SLOWER LIVING</small></b>
                <nav aria-label="Atelier concept navigation"><span>Furniture</span><span>Lighting</span><span>Ceramics</span><span>Textiles</span></nav>
                <div className="is-shop__tools"><span>Search <b aria-hidden="true">⌕</b></span><span>Bag <b>02</b></span></div>
            </header>
            <div className="is-shop__hero">
                <div className="is-shop__copy">
                    <small>THE FORM STUDY · 2025</small>
                    <h3>Room to<br />reconsider.</h3>
                    <p>Considered pieces for the everyday ritual.</p>
                    <span className="is-shop__cta">Explore the edit <b aria-hidden="true">↗</b></span>
                </div>
                <div className="is-shop__still-life" role="img" aria-label="Sculptural ceramic vessels in a warm, sunlit still life">
                    <span className="is-shop__vase is-shop__vase--large" />
                    <span className="is-shop__vase is-shop__vase--small" />
                    <span className="is-shop__sun" />
                </div>
            </div>
            <div className="is-shop__collection">
                <div className="is-shop__collection-heading"><span>THE OBJECT EDIT</span><span>Considered forms, made to stay</span></div>
                <div className="is-shop__products">
                    {products.map(([shape, name, price], index) => (
                        <div className="is-product" key={shape}>
                            <div className={`is-product__art is-product__art--${shape}`} role="img" aria-label={`${name}, product illustration`}>
                                <span>0{index + 1}</span><i />
                            </div>
                            <b>{name}</b><span>{price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function DashboardPreview() {
    return (
        <div className="is-dashboard">
            <aside className="is-dashboard__side">
                <b className="is-dashboard__logo">fieldnote<span>·</span></b>
                <small>WORKSPACE</small>
                <span className="is-dashboard__nav is-dashboard__nav--active">▦ <b>Overview</b></span>
                <span className="is-dashboard__nav">◷ <b>Reports</b></span>
                <span className="is-dashboard__nav">▤ <b>Projects</b></span>
                <span className="is-dashboard__nav">⚙ <b>Settings</b></span>
                <span className="is-dashboard__invite">＋ Invite team</span>
                <span className="is-dashboard__avatar">AM <b>Alex Morgan</b></span>
            </aside>
            <div className="is-dashboard__main">
                <header className="is-dashboard__heading">
                    <div><small>MONDAY, MARCH 30</small><h3>Good morning, Alex</h3></div>
                    <span className="is-dashboard__date">Last 30 days　⌄</span>
                </header>
                <p className="is-dashboard__sample">Illustrative workspace data · March 1–30</p>
                <div className="is-kpis">
                    {[["Active projects", "24", "+8.2%"], ["Tasks completed", "186", "+12.4%"], ["Team capacity", "78%", "On track"], ["Hours saved", "42.5", "+6.1%"]].map(([label, value, change]) => (
                        <div className="is-kpi" key={label}><small>{label}</small><b>{value}</b><span>{change}</span></div>
                    ))}
                </div>
                <div className="is-chart">
                    <div className="is-chart__heading"><b>Weekly activity</b><span>Illustrative events</span></div>
                    <div className="is-chart__plot">
                        <div className="is-chart__axis"><span>120</span><span>80</span><span>40</span><span>0</span></div>
                        <svg viewBox="0 0 520 120" preserveAspectRatio="none" role="img" aria-label="Illustrative weekly activity chart trending upward">
                            <path className="is-chart__gridline" d="M0 10H520M0 45H520M0 80H520M0 115H520" />
                            <path className="is-chart__area" d="M0 91C44 87 49 48 94 62s49 13 83-8 49 11 82-2 51-31 83-13 51 18 84-8 57 4 94-16v100H0z" />
                            <path className="is-chart__line" d="M0 91C44 87 49 48 94 62s49 13 83-8 49 11 82-2 51-31 83-13 51 18 84-8 57 4 94-16" />
                        </svg>
                    </div>
                    <div className="is-chart__labels"><span>Wk 01</span><span>Wk 02</span><span>Wk 03</span><span>Wk 04</span></div>
                </div>
                <div className="is-table">
                    <div className="is-table__heading"><b>Recent activity</b><span>View all ↗</span></div>
                    <div className="is-table__row is-table__row--head"><span>PROJECT</span><span>OWNER</span><span>STATUS</span></div>
                    <div className="is-table__row"><b>Website refresh</b><span>Alex M.</span><em>In progress</em></div>
                    <div className="is-table__row"><b>Mobile patterns</b><span>Sam R.</span><em className="is-status--review">In review</em></div>
                </div>
            </div>
        </div>
    );
}

function ResponsivePreview() {
    const content = (device) => (
        <div className={`is-common is-common--${device}`}>
            <header><b>common <i>ground</i></b><span>{device === "desktop" ? "Our story　 Spaces　 Journal" : "☰"}</span>{device === "desktop" && <span className="is-common__action">Find your place</span>}</header>
            <div className="is-common__hero">
                <small>LIVE WITH INTENTION</small><b>A little closer<br />to what matters.</b>
                <span>Thoughtful spaces for gathering, growing, and finding your rhythm.</span>
                <span className="is-common__action">Explore the collection　↗</span>
            </div>
            <div className="is-common__tiles"><span>Gather<br />with room</span><span>Make<br />space</span>{device === "desktop" && <span>Find your<br />quiet</span>}</div>
        </div>
    );

    return (
        <div className="is-responsive">
            <div className="is-device is-device--desktop">{content("desktop")}</div>
            <div className="is-device is-device--tablet">{content("tablet")}</div>
            <div className="is-device is-device--phone">{content("phone")}</div>
            <div className="is-device-labels"><span>DESKTOP <b>1280</b></span><span>TABLET <b>768</b></span><span>MOBILE <b>375</b></span></div>
        </div>
    );
}

function VideoPreview() {
    return (
        <div className="is-video">
            <div className="is-video__topline"><span>FIELD NOTES / FILM 01</span><span>01 — 04</span></div>
            <div className="is-video__poster">
                <span className="is-video__index">A PROCESS, IN FRAME</span>
                <div><small>SELECTED WORK · 2025</small><h3>Stories in<br />the making.</h3><span>Case study walkthrough</span></div>
                <span className="is-video__frame">VISUAL STUDY <b>01</b></span>
            </div>
            <div className="is-video__notice"><span className="is-video__status" aria-hidden="true" /><span><b>Recording needed</b><small>No project recording is available yet.</small></span><span className="is-video__duration">NOT AVAILABLE</span></div>
        </div>
    );
}

function ThemePreview() {
    return (
        <div className="is-themes">
            {["light", "dark"].map((theme) => (
                <div className={`is-theme is-theme--${theme}`} key={theme}>
                    <header><b>orbit<span>●</span></b><span>Workspace　⌕</span><span className="is-theme__button">New project</span></header>
                    <small className="is-theme__date">MONDAY, 24 MARCH</small>
                    <h3>Good morning, Noor.</h3><p>Your week, in focus.</p>
                    <div className="is-theme__stats"><span><small>Focus time</small><b>12h 40m</b></span><span><small>Tasks done</small><b>18 / 24</b></span></div>
                    <div className="is-theme__task"><span>Today’s focus</span><b>Design review <small>10:30 AM</small></b></div>
                </div>
            ))}
        </div>
    );
}

function ComponentsPreview() {
    const [tab, setTab] = useState("Buttons");
    const [notice, setNotice] = useState(false);
    const tabs = ["Buttons", "Forms", "Navigation"];

    return (
        <div className="is-components">
            <header><b>forma<span> /</span> ui</b><span>COMPONENT LIBRARY <small>V. 2.4</small></span></header>
            <nav aria-label="Component examples">{tabs.map((item) => <button type="button" className={tab === item ? "is-tab-active" : ""} aria-pressed={tab === item} onClick={() => setTab(item)} key={item}>{item}</button>)}</nav>
            <div className="is-components__body">
                <small>{tab.toUpperCase()}　·　INTERACTIVE SPECIMENS</small>
                {tab === "Buttons" ? (
                    <>
                        <div className="is-components__buttons"><button className="is-primary" type="button" onClick={() => setNotice(true)}>Primary action</button><button type="button" onClick={() => setNotice(true)}>Secondary</button><button className="is-outline" type="button" onClick={() => setNotice(true)}>Outline</button><button type="button" disabled>Disabled</button></div>
                        <label>Email address<input type="email" placeholder="name@example.com" /></label>
                        <p className="is-validation">Example validation state · Enter a valid email address.</p>
                        <div className="is-component-extras"><span className="is-badge">Approved</span><span className="is-badge is-badge--quiet">In review</span><span className="is-tooltip">Status badge <small>Illustrative</small></span></div>
                    </>
                ) : tab === "Forms" ? (
                    <>
                        <div className="is-components__fields"><label>Your name<input placeholder="e.g. Noor" /></label><label>Choose a workspace<select defaultValue="Design team"><option>Design team</option><option>Research</option></select></label></div>
                        <p className="is-validation">Required field example · Please check your details.</p>
                        <span className="is-badge">Form states · Illustrative</span>
                    </>
                ) : (
                    <>
                        <div className="is-tabs"><span>Overview</span><span>Activity</span><span>Settings</span></div>
                        <div className="is-menu-sample"><span>▦　Dashboard</span><span>◷　Activity</span><span>⚙　Settings</span></div>
                    </>
                )}
                <button className="is-toast-trigger" type="button" onClick={() => setNotice((current) => !current)}>{notice ? "Dismiss notification" : "Show toast preview"}</button>
                {notice && <p role="status" className="is-toast">✓　Action previewed successfully.<button type="button" aria-label="Dismiss notification" onClick={() => setNotice(false)}>×</button></p>}
            </div>
        </div>
    );
}

function Artwork({ kind }) {
    if (kind === "shop") return <ShopPreview />;
    if (kind === "dashboard") return <DashboardPreview />;
    if (kind === "responsive") return <ResponsivePreview />;
    if (kind === "themes") return <ThemePreview />;
    if (kind === "components") return <ComponentsPreview />;
    return <VideoPreview />;
}

function PreviewDialog({ card, onClose, openerRef, reduceMotion }) {
    const closeRef = useRef(null);

    useEffect(() => {
        const bodyOverflow = document.body.style.overflow;
        const root = document.getElementById("root");
        const rootWasInert = root?.inert;
        const rootAriaHidden = root?.getAttribute("aria-hidden");
        const opener = openerRef.current;

        document.body.style.overflow = "hidden";
        if (root) {
            root.inert = true;
            root.setAttribute("aria-hidden", "true");
        }
        window.__lenis?.stop();
        closeRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== "Tab") return;
            const focusable = document.querySelectorAll(".is-dialog " + focusableSelector);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) {
                event.preventDefault();
            } else if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = bodyOverflow;
            if (root) {
                root.inert = rootWasInert;
                if (rootAriaHidden === null) root.removeAttribute("aria-hidden");
                else root.setAttribute("aria-hidden", rootAriaHidden);
            }
            window.__lenis?.start();
            opener?.focus();
        };
    }, [onClose, openerRef]);

    return createPortal(
        <motion.div className="is-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.18 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            <motion.section
                className="is-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="is-dialog-title"
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            >
                <header className="is-dialog__header"><div><p>{card.category} <span>·</span> {card.kind === "dashboard" ? "UI Concept · Illustrative sample data" : "UI Concept"}</p><h2 id="is-dialog-title">{card.title}</h2></div><button ref={closeRef} type="button" className="is-dialog__close" onClick={onClose} aria-label="Close preview">×</button></header>
                <div className={`is-dialog__art is-dialog__art--${card.kind}`}><Artwork kind={card.kind} /></div>
            </motion.section>
        </motion.div>,
        document.body
    );
}

export default function InterfaceShowcase() {
    const [filter, setFilter] = useState("All");
    const [activeCard, setActiveCard] = useState(null);
    const openerRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const visible = filter === "All" ? cards : cards.filter((card) => card.category === filter);

    const openPreview = (card, event) => {
        openerRef.current = event.currentTarget;
        setActiveCard(card);
    };

    return (
        <section className="interface-showcase" aria-labelledby="interface-showcase-title">
            <header className="is-heading">
                <p className="is-heading__eyebrow">BEYOND THE PROJECTS</p>
                <h2 id="interface-showcase-title">More Work &amp; Interface Showcase</h2>
                <p className="is-heading__support">Interfaces that make ideas feel real.</p>
                <p className="is-heading__description">A collection of considered interface studies, exploring how thoughtful design can shape distinct digital experiences.</p>
            </header>
            <div className="is-filters" role="group" aria-label="Filter interface concepts">
                {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <motion.div className="is-grid" layout>
                <AnimatePresence initial={false}>
                    {visible.map((card, index) => (
                        <motion.article
                            className={`is-card is-card--${card.kind}`}
                            key={card.id}
                            layout
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                            transition={{ duration: reduceMotion ? 0 : 0.22, delay: reduceMotion ? 0 : index * 0.045, layout: { duration: reduceMotion ? 0 : 0.24 } }}
                        >
                            <div className="is-art"><Artwork kind={card.kind} /></div>
                            <div className="is-card__caption"><div><p>{card.category} <span>·</span> {card.kind === "dashboard" ? "UI Concept · Illustrative sample data" : "UI Concept"}</p><h3>{card.title}</h3></div><button type="button" onClick={(event) => openPreview(card, event)} aria-label={`Open ${card.title} preview`}>View concept <span aria-hidden="true">↗</span></button></div>
                            <p className="is-card__note">{card.note}</p>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>
            <AnimatePresence>{activeCard && <PreviewDialog card={activeCard} onClose={() => setActiveCard(null)} openerRef={openerRef} reduceMotion={reduceMotion} />}</AnimatePresence>
        </section>
    );
}

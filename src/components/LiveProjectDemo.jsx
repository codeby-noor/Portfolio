import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/liveDemo.css";

/**
 * LiveProjectDemo — Reusable live demo experience.
 *
 * Modes:
 *  1. iframe  — when a real live URL exists AND embedding works
 *  2. video   — when a video walkthrough is provided
 *  3. walkthrough — animated screenshot / product walkthrough (fallback)
 *
 * Always provides an "OPEN LIVE DEMO ↗" button that opens the real
 * project in a new tab. Does NOT fake live functionality.
 */

// ---- Animated product walkthroughs (shown when no live URL / screenshots) ----
// These simulate the application being used with animated UI states.
// They do NOT claim real functionality — they are visual walkthroughs.

const RealEstateWalkthrough = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Homepage", desc: "Browse featured properties" },
        { label: "Search", desc: "Search & filter listings" },
        { label: "Property", desc: "View property details" },
        { label: "Inquiry", desc: "Connect with a broker" },
    ];

    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2600);
        return () => clearInterval(id);
    }, [steps.length]);

    return (
        <div className="walkthrough walkthrough--realestate">
            <div className="walkthrough__browser">
                <div className="walkthrough__browser-bar">
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__url">brokerstreets.com</span>
                </div>
                <div className="walkthrough__body">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="walkthrough__screen"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {step === 0 && (
                                <div className="re-hero">
                                    <span className="re-hero__title">Find Your Dream Home</span>
                                    <div className="re-hero__search">
                                        <span className="re-hero__field" />
                                        <span className="re-hero__btn">Search</span>
                                    </div>
                                </div>
                            )}
                            {step === 1 && (
                                <div className="re-list">
                                    <div className="re-filter">
                                        <span className="re-filter__chip">Location</span>
                                        <span className="re-filter__chip">Price</span>
                                        <span className="re-filter__chip">Type</span>
                                    </div>
                                    <div className="re-cards">
                                        <span className="re-card" />
                                        <span className="re-card" />
                                        <span className="re-card" />
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="re-detail">
                                    <div className="re-detail__img" />
                                    <div className="re-detail__info">
                                        <span className="re-detail__line" />
                                        <span className="re-detail__line short" />
                                        <span className="re-detail__price">₹ 45,00,000</span>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="re-inquiry">
                                    <span className="re-inquiry__title">Contact Broker</span>
                                    <div className="re-inquiry__form">
                                        <span className="re-inquiry__field" />
                                        <span className="re-inquiry__field" />
                                        <span className="re-inquiry__btn">Send Inquiry</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="walkthrough__caption">
                    <span className="walkthrough__step">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                    <span className="walkthrough__label">{steps[step].label}</span>
                    <span className="walkthrough__desc">{steps[step].desc}</span>
                </div>
            </div>
        </div>
    );
};

const EcommerceWalkthrough = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Home", desc: "Browse the storefront" },
        { label: "Products", desc: "Explore the catalog" },
        { label: "Cart", desc: "Review your cart" },
        { label: "Checkout", desc: "Complete the order" },
    ];

    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2600);
        return () => clearInterval(id);
    }, [steps.length]);

    return (
        <div className="walkthrough walkthrough--ecommerce">
            <div className="walkthrough__browser">
                <div className="walkthrough__browser-bar">
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__url">ecommerce.store</span>
                </div>
                <div className="walkthrough__body">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="walkthrough__screen"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {step === 0 && (
                                <div className="ec-hero">
                                    <span className="ec-hero__title">Shop the Collection</span>
                                    <div className="ec-hero__banner" />
                                </div>
                            )}
                            {step === 1 && (
                                <div className="ec-grid">
                                    <span className="ec-card" />
                                    <span className="ec-card" />
                                    <span className="ec-card" />
                                    <span className="ec-card" />
                                </div>
                            )}
                            {step === 2 && (
                                <div className="ec-cart">
                                    <div className="ec-cart__item">
                                        <span className="ec-cart__thumb" />
                                        <span className="ec-cart__line" />
                                    </div>
                                    <div className="ec-cart__item">
                                        <span className="ec-cart__thumb" />
                                        <span className="ec-cart__line" />
                                    </div>
                                    <span className="ec-cart__total">Total: ₹ 2,499</span>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="ec-checkout">
                                    <span className="ec-checkout__field" />
                                    <span className="ec-checkout__field" />
                                    <span className="ec-checkout__btn">Place Order</span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="walkthrough__caption">
                    <span className="walkthrough__step">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                    <span className="walkthrough__label">{steps[step].label}</span>
                    <span className="walkthrough__desc">{steps[step].desc}</span>
                </div>
            </div>
        </div>
    );
};

const ChatWalkthrough = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Conversations", desc: "Your message list" },
        { label: "Chat", desc: "Live conversation" },
        { label: "Typing", desc: "Real-time typing state" },
        { label: "Presence", desc: "Online status" },
    ];

    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2600);
        return () => clearInterval(id);
    }, [steps.length]);

    return (
        <div className="walkthrough walkthrough--chat">
            <div className="walkthrough__browser">
                <div className="walkthrough__browser-bar">
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__url">chat.app</span>
                </div>
                <div className="walkthrough__body">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="walkthrough__screen"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {step === 0 && (
                                <div className="chat-convos">
                                    <div className="chat-convo">
                                        <span className="chat-convo__avatar">A</span>
                                        <span className="chat-convo__line" />
                                    </div>
                                    <div className="chat-convo">
                                        <span className="chat-convo__avatar">B</span>
                                        <span className="chat-convo__line" />
                                    </div>
                                    <div className="chat-convo">
                                        <span className="chat-convo__avatar">C</span>
                                        <span className="chat-convo__line" />
                                    </div>
                                </div>
                            )}
                            {step === 1 && (
                                <div className="chat-window">
                                    <div className="chat-msg in">Hey! How are you?</div>
                                    <div className="chat-msg out">Just shipped a new feature!</div>
                                    <div className="chat-msg in">That's awesome!</div>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="chat-window">
                                    <div className="chat-msg in">I'm working on it...</div>
                                    <div className="chat-typing">
                                        <span className="chat-typing__dot" />
                                        <span className="chat-typing__dot" />
                                        <span className="chat-typing__dot" />
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="chat-presence">
                                    <div className="chat-user">
                                        <span className="chat-user__avatar">M</span>
                                        <span className="chat-user__name">Mahenoor</span>
                                        <span className="chat-user__online" />
                                    </div>
                                    <div className="chat-user">
                                        <span className="chat-user__avatar">A</span>
                                        <span className="chat-user__name">Alex</span>
                                        <span className="chat-user__online" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="walkthrough__caption">
                    <span className="walkthrough__step">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                    <span className="walkthrough__label">{steps[step].label}</span>
                    <span className="walkthrough__desc">{steps[step].desc}</span>
                </div>
            </div>
        </div>
    );
};

const DashboardWalkthrough = () => {
    const [step, setStep] = useState(0);
    const steps = [
        { label: "Overview", desc: "Key metrics at a glance" },
        { label: "Analytics", desc: "Visual data reports" },
        { label: "Users", desc: "Manage user records" },
        { label: "Filters", desc: "Refine the data" },
    ];

    useEffect(() => {
        const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2600);
        return () => clearInterval(id);
    }, [steps.length]);

    return (
        <div className="walkthrough walkthrough--dashboard">
            <div className="walkthrough__browser">
                <div className="walkthrough__browser-bar">
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__url">admin.dashboard</span>
                </div>
                <div className="walkthrough__body">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="walkthrough__screen"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {step === 0 && (
                                <div className="db-stats">
                                    <div className="db-stat">
                                        <span className="db-stat__label">Users</span>
                                        <span className="db-stat__value">—</span>
                                    </div>
                                    <div className="db-stat">
                                        <span className="db-stat__label">Sales</span>
                                        <span className="db-stat__value">—</span>
                                    </div>
                                    <div className="db-stat">
                                        <span className="db-stat__label">Views</span>
                                        <span className="db-stat__value">—</span>
                                    </div>
                                </div>
                            )}
                            {step === 1 && (
                                <div className="db-chart">
                                    <span className="db-chart__bar" style={{ height: "40%" }} />
                                    <span className="db-chart__bar" style={{ height: "70%" }} />
                                    <span className="db-chart__bar" style={{ height: "55%" }} />
                                    <span className="db-chart__bar" style={{ height: "90%" }} />
                                    <span className="db-chart__bar" style={{ height: "65%" }} />
                                </div>
                            )}
                            {step === 2 && (
                                <div className="db-table">
                                    <div className="db-table__row">
                                        <span className="db-table__cell" />
                                        <span className="db-table__cell" />
                                    </div>
                                    <div className="db-table__row">
                                        <span className="db-table__cell" />
                                        <span className="db-table__cell" />
                                    </div>
                                    <div className="db-table__row">
                                        <span className="db-table__cell" />
                                        <span className="db-table__cell" />
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="db-filters">
                                    <span className="db-filter__chip">Date</span>
                                    <span className="db-filter__chip">Status</span>
                                    <span className="db-filter__chip">Role</span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="walkthrough__caption">
                    <span className="walkthrough__step">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                    <span className="walkthrough__label">{steps[step].label}</span>
                    <span className="walkthrough__desc">{steps[step].desc}</span>
                </div>
            </div>
        </div>
    );
};

const walkthroughComponents = {
    realestate: RealEstateWalkthrough,
    ecommerce: EcommerceWalkthrough,
    chat: ChatWalkthrough,
    dashboard: DashboardWalkthrough,
};

// ---- Screenshot walkthrough (when real screenshots exist) ----
const ScreenshotWalkthrough = ({ screenshots, project, onBroken = () => {} }) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [broken, setBroken] = useState(false);

    // If any screenshot fails to load, the walkthrough can't render —
    // report broken so the parent can fall back to the animated walkthrough.
    const handleError = useCallback(() => {
        setBroken(true);
        onBroken?.();
    }, [onBroken]);

    // Reset broken state when screenshots change (e.g. another project).
    useEffect(() => {
        setIndex(0);
        setPaused(false);
        setBroken(false);
    }, [screenshots]);

    useEffect(() => {
        if (paused || broken || screenshots.length <= 1) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % screenshots.length), 3000);
        return () => clearInterval(id);
    }, [paused, broken, screenshots.length]);

    const goTo = (i) => setIndex((i + screenshots.length) % screenshots.length);

    return (
        <div className="screenshot-walkthrough">
            <div className="walkthrough__browser">
                <div className="walkthrough__browser-bar">
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__dot" />
                    <span className="walkthrough__url">{project.title.toLowerCase().replace(/\s+/g, "")}.app</span>
                </div>
                <div className="screenshot-walkthrough__stage">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            src={screenshots[index]}
                            alt={`${project.title} — screen ${index + 1}`}
                            className="screenshot-walkthrough__img"
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            onError={handleError}
                        />
                    </AnimatePresence>
                    {screenshots.map((_, i) => (
                        <span
                            key={i}
                            className={`screenshot-walkthrough__dot ${i === index ? "active" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
                <div className="screenshot-walkthrough__controls">
                    <button onClick={() => { setPaused((p) => !p); }} aria-label={paused ? "Play" : "Pause"}>
                        {paused ? <FaPlay /> : <FaPause />}
                    </button>
                    <button onClick={() => goTo(index - 1)} aria-label="Previous screen"><FaChevronLeft /></button>
                    <span className="screenshot-walkthrough__count">{String(index + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}</span>
                    <button onClick={() => goTo(index + 1)} aria-label="Next screen"><FaChevronRight /></button>
                </div>
            </div>
        </div>
    );
};

// ---- Main component ----
const LiveProjectDemo = ({ project, demoUrl, screenshots = [], video = "" }) => {
    const [iframeFailed, setIframeFailed] = useState(false);
    const iframeRef = useRef(null);

    const hasLiveUrl = demoUrl && demoUrl !== "#" && demoUrl !== "";
    const hasVideo = video && video !== "";
    const hasScreenshots = screenshots && screenshots.length > 0;

    // Determine effective mode
    const effectiveMode = hasLiveUrl && !iframeFailed
        ? "iframe"
        : hasVideo
            ? "video"
            : hasScreenshots
                ? "screenshots"
                : "walkthrough";

    // Iframe load detection — if blocked, fall back
    const handleIframeLoad = useCallback(() => {
        setIframeFailed(false);
    }, []);

    const handleIframeError = useCallback(() => {
        setIframeFailed(true);
    }, []);

    const handleScreenshotBroken = useCallback(() => {
        setIframeFailed(true);
    }, []);

    const Walkthrough = walkthroughComponents[project?.type] || RealEstateWalkthrough;

    const useWalkthrough = effectiveMode === "walkthrough" || (effectiveMode === "screenshots" && iframeFailed);

    return (
        <div className="live-demo">
            <div className="live-demo__frame">
                {effectiveMode === "iframe" && (
                    <div className="live-demo__iframe-wrap">
                        <iframe
                            ref={iframeRef}
                            src={demoUrl}
                            title={`${project?.title} live demo`}
                            className="live-demo__iframe"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                    </div>
                )}

                {effectiveMode === "video" && (
                    <div className="live-demo__video-wrap">
                        <video src={video} controls className="live-demo__video" poster={project?.image} />
                    </div>
                )}

                {effectiveMode === "screenshots" && !iframeFailed && (
                    <ScreenshotWalkthrough screenshots={screenshots} project={project} onBroken={handleScreenshotBroken} />
                )}

                {useWalkthrough && (
                    <Walkthrough />
                )}
            </div>

            <div className="live-demo__actions">
                <a
                    href={demoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-demo__btn live-demo__btn--primary"
                    onClick={(e) => {
                        if (!demoUrl || demoUrl === "#") e.preventDefault();
                    }}
                >
                    OPEN LIVE DEMO <span aria-hidden="true">↗</span>
                </a>
                {effectiveMode !== "iframe" && (
                    <span className="live-demo__note">
                        {hasLiveUrl
                            ? "Live preview unavailable here — opening the real app in a new tab."
                            : "Interactive walkthrough — the real application opens in a new tab when available."}
                    </span>
                )}
            </div>
        </div>
    );
};

export default LiveProjectDemo;
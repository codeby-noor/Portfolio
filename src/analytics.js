/**
 * Google Analytics 4 (GA4) Integration & Event Tracking Module
 * Measurement ID: G-R974K3STNH
 * 
 * Complies with strict privacy guidelines, safe async initialization,
 * zero layout shift, non-blocking click delegation, and deduplicated
 * SPA page-view and route tracking.
 */

export const DEFAULT_MEASUREMENT_ID = "G-R974K3STNH";
export const GA_MEASUREMENT_ID =
    process.env.REACT_APP_GA_MEASUREMENT_ID || DEFAULT_MEASUREMENT_ID;

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

// In-memory deduplication state
let lastTrackedPath = null;
let lastTrackedPathTime = 0;
let lastTrackedProjectId = null;
let lastTrackedProjectTime = 0;

/**
 * Check if the user has opted out of tracking via browser Do Not Track.
 */
export const isDoNotTrackEnabled = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return (
        navigator.doNotTrack === "1" ||
        navigator.doNotTrack === "yes" ||
        window.doNotTrack === "1"
    );
};

/**
 * Safely ensure window.dataLayer and window.gtag exist.
 */
export const ensureGtag = () => {
    if (typeof window === "undefined") return null;

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
    }
    return window.gtag;
};

/**
 * Loads the official Google tag (gtag.js) script asynchronously and exactly once.
 */
export const loadGoogleTag = (measurementId = GA_MEASUREMENT_ID) => {
    if (typeof window === "undefined") return;
    if (!measurementId || !MEASUREMENT_ID_PATTERN.test(measurementId)) {
        console.warn("[Analytics] Invalid or missing Google Analytics Measurement ID:", measurementId);
        return;
    }

    if (isDoNotTrackEnabled()) {
        return;
    }

    ensureGtag();

    // Check if the script is already attached to DOM
    const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`
    );

    if (!existingScript) {
        const script = document.createElement("script");
        script.async = true;
        script.fetchPriority = "low";
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);
    }

    if (!window.__portfolioAnalyticsConfigured) {
        window.__portfolioAnalyticsConfigured = true;
        window.gtag("js", new Date());
        // Disable automatic untyped page_view to prevent duplicate events on SPA hydration / navigation
        window.gtag("config", measurementId, {
            send_page_view: false,
            cookie_flags: "SameSite=None;Secure",
            anonymize_ip: true,
        });
    }
};

/**
 * Dispatches a safe GA4 event, verifying gtag readiness and privacy constraints.
 * Never forwards passwords, form values, or personal identifiable information.
 */
export const trackEvent = (eventName, params = {}) => {
    if (typeof window === "undefined" || isDoNotTrackEnabled()) return;
    ensureGtag();

    if (typeof window.gtag !== "function") return;

    // Filter out undefined values and ensure safe payload
    const safeParams = {};
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            safeParams[key] = typeof value === "string" ? value.slice(0, 500) : value;
        }
    }

    window.gtag("event", eventName, safeParams);
};

/**
 * Tracks a page_view event with deduplication to prevent repeated events
 * during React re-renders or Strict Mode double-invocations.
 */
export const trackPageView = (path = window.location.pathname, title = document.title) => {
    if (typeof window === "undefined") return;

    const normalizedPath = (path || window.location.pathname).replace(/\/+$/, "") || "/";
    const currentTitle = title || document.title;
    const now = Date.now();

    // Deduplicate: ignore if the exact same path was tracked within 600ms
    if (lastTrackedPath === normalizedPath && now - lastTrackedPathTime < 600) {
        return;
    }

    lastTrackedPath = normalizedPath;
    lastTrackedPathTime = now;

    trackEvent("page_view", {
        page_title: currentTitle,
        page_location: window.location.href,
        page_path: normalizedPath,
    });
};

/**
 * Tracks a project_view event when a user navigates to or opens a project case study.
 */
export const trackProjectView = (project) => {
    if (!project) return;
    const now = Date.now();
    const projectId = project.id || project.slug;

    if (lastTrackedProjectId === projectId && now - lastTrackedProjectTime < 600) {
        return;
    }

    lastTrackedProjectId = projectId;
    lastTrackedProjectTime = now;

    trackEvent("project_view", {
        project_id: projectId,
        project_name: project.title || project.detailTitle || "Project",
        project_type: project.type || "Full-Stack Project",
        page_location: typeof window !== "undefined" ? window.location.href : "",
    });
};

/**
 * Tracks clicks to external project websites / live demos.
 */
export const trackProjectWebsiteClick = ({ projectName, url }) => {
    trackEvent("project_website_click", {
        project_name: projectName || "Project Demo",
        link_url: url,
        outbound: true,
    });
};

/**
 * Tracks email click triggers.
 */
export const trackEmailClick = (emailAddress = "Mahenoorshaikh0408@gmail.com") => {
    trackEvent("email_click", {
        method: "email",
        link_url: `mailto:${emailAddress}`,
    });
    trackContactClick({ method: "email", linkUrl: `mailto:${emailAddress}` });
};

/**
 * Tracks general contact triggers (email or contact navigation).
 */
export const trackContactClick = ({ method = "email", linkUrl = "" } = {}) => {
    trackEvent("contact_click", {
        method,
        link_url: linkUrl,
    });
};

/**
 * Tracks resume PDF downloads.
 */
export const trackResumeDownload = (fileName = "resume.pdf", url = "/resume.pdf") => {
    trackEvent("resume_download", {
        file_name: fileName,
        file_extension: "pdf",
        link_url: url,
    });
};

/**
 * Tracks clicks on social/profile links (LinkedIn, GitHub).
 */
export const trackSocialLinkClick = ({ platform, url }) => {
    trackEvent("social_link_click", {
        platform,
        link_url: url,
        outbound: true,
    });
};

/**
 * Global passive click listener to delegate link interactions.
 * Never calls event.preventDefault() to preserve natural navigation speed.
 */
const handleDocumentClick = (event) => {
    const anchor = event.target?.closest?.("a[href]");
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const cleanHref = href.trim();

    // 1. Resume download
    if (
        cleanHref.toLowerCase().includes("resume.pdf") ||
        anchor.hasAttribute("download")
    ) {
        trackResumeDownload("resume.pdf", cleanHref);
        return;
    }

    // 2. Email contact click
    if (cleanHref.toLowerCase().startsWith("mailto:")) {
        const email = cleanHref.replace(/^mailto:/i, "").split("?")[0];
        trackEmailClick(email);
        return;
    }

    // 3. Social link click
    if (cleanHref.includes("linkedin.com")) {
        trackSocialLinkClick({ platform: "linkedin", url: cleanHref });
        return;
    }
    if (cleanHref.includes("github.com")) {
        trackSocialLinkClick({ platform: "github", url: cleanHref });
        return;
    }

    // 4. Project live demo click
    const isLiveDemoLink =
        cleanHref.includes("shopera-ecommerce-frontend.vercel.app") ||
        cleanHref.includes("codequest-virid.vercel.app") ||
        (anchor.closest(".project-card, .shopera-cta, .project-detail-hero-actions, .project-links") &&
            anchor.target === "_blank");

    if (isLiveDemoLink) {
        let projectName = "Project Demo";
        if (cleanHref.includes("shopera")) {
            projectName = "SHOPERA";
        } else if (cleanHref.includes("codequest")) {
            projectName = "CodeQuest";
        } else {
            const projectCard = anchor.closest(".project-card, .shopera-cta, .project-detail-hero-actions");
            const header = projectCard?.querySelector?.("h1, h2, h3");
            if (header?.textContent) {
                projectName = header.textContent.trim();
            }
        }
        trackProjectWebsiteClick({ projectName, url: cleanHref });
        return;
    }

    // 5. Contact section navigation
    if (cleanHref === "#contact" || cleanHref.endsWith("/#contact")) {
        trackContactClick({ method: "navigation", linkUrl: cleanHref });
        return;
    }
};

/**
 * Initializes Google Analytics 4, sets up route listeners, and attaches interaction delegations.
 * Safe to call from App.jsx or anywhere in the client lifecycle.
 */
export const initializeAnalytics = () => {
    if (typeof window === "undefined" || window.__portfolioAnalyticsReady) return;
    window.__portfolioAnalyticsReady = true;

    if (isDoNotTrackEnabled()) {
        return;
    }

    // Ensure the Google tag script and configuration are present
    loadGoogleTag(GA_MEASUREMENT_ID);

    // Initial page view tracking for the landing route
    trackPageView(window.location.pathname, document.title);

    // Attach delegated click listener for conversions & interactions
    document.addEventListener("click", handleDocumentClick, { passive: true });

    // Listen to popstate for SPA back/forward browser navigation
    window.addEventListener("popstate", () => {
        trackPageView(window.location.pathname, document.title);
    });
};

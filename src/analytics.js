const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
const measurementIdPattern = /^G-[A-Z0-9]+$/i;

const trackLinkClick = (event) => {
    const anchor = event.target.closest && event.target.closest("a[href]");
    if (!anchor || typeof window.gtag !== "function") return;

    const href = anchor.getAttribute("href") || "";

    if (anchor.hasAttribute("download") && href.toLowerCase().endsWith(".pdf")) {
        window.gtag("event", "resume_download", { file_type: "pdf" });
        return;
    }

    if (href.startsWith("mailto:")) {
        window.gtag("event", "contact_click", { method: "email" });
        return;
    }

    const projectCard = anchor.closest(".project-card");
    if (projectCard && anchor.target === "_blank") {
        window.gtag("event", "project_demo_click", {
            project_name: projectCard.querySelector("h3")?.textContent?.trim() || "project",
        });
    }
};

export const initializeAnalytics = () => {
    if (!measurementId || !measurementIdPattern.test(measurementId) || window.__portfolioAnalyticsReady) return;

    window.__portfolioAnalyticsReady = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(analyticsScript);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: window.location.href,
    });

    document.addEventListener("click", trackLinkClick);
};


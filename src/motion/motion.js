// ============================================================
// MOTION SYSTEM — Liquid Motion / Floating Water identity
// Single source of truth for easing, durations, responsibilities:
// - framer-motion (Motion): component micro-interactions + reveals
// - GSAP ScrollTrigger: section choreography + parallax
// - Lenis: smooth inertial scrolling
// - R3F/Drei: hero liquid 3D only
// Philosophy: Small movement = premium. Large movement = distracting.
// ============================================================

export const EASE = {
    out: [0.16, 1, 0.3, 1], // primary easeOutExpo-like
    inOut: [0.65, 0, 0.35, 1],
    springSoft: { type: "spring", stiffness: 120, damping: 20, mass: 0.8 },
    springSnappy: { type: "spring", stiffness: 260, damping: 26 },
};

export const DURATION = {
    ui: 0.5, // micro-interactions 0.4-0.6
    reveal: 0.9, // section reveals 0.8-1.2
    cinematic: 1.6, // hero / featured 1-2s
};

export const fadeRise = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: DURATION.reveal, ease: EASE.out, delay },
    }),
};

export const staggerParent = (stagger = 0.08) => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
});

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

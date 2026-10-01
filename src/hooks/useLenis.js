import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useLenis — smooth inertial scrolling for the whole site.
 * - Fluid, weightless feel without scroll-jacking
 * - Respects prefers-reduced-motion (skips entirely)
 * - Exposes lenis via window for GSAP ScrollTrigger sync
 */
const useLenis = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.4,
        });

        window.__lenis = lenis;

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Anchor navigation through Lenis for buttery jumps
        const onClick = (e) => {
            if (e.defaultPrevented) return;
            const anchor = e.target.closest?.('a[href^="#"]');
            if (!anchor) return;
            const id = anchor.getAttribute("href");
            if (id.length < 2) return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            lenis.scrollTo(el, { offset: -84, duration: 1.4 });
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", onClick);
            lenis.destroy();
            window.__lenis = undefined;
        };
    }, []);
};

export default useLenis;

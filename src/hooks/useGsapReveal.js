import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useGsapReveal — one-time wiring for [data-reveal] choreography.
 * Sections reveal with opacity / translateY / scale / blur.
 * Slow, elegant, long transitions. Killed on unmount.
 */
const useGsapReveal = () => {
    const ctxRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // Ensure content is visible with no animation
            gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
            return undefined;
        }

        const ctx = gsap.context(() => {
            gsap.utils.toArray("[data-reveal]").forEach((el) => {
                const variant = el.getAttribute("data-reveal") || "rise";
                const delay = parseFloat(el.getAttribute("data-delay") || "0");

                const from = { opacity: 0, y: 36, filter: "blur(6px)" };
                if (variant === "scale") Object.assign(from, { scale: 0.96, y: 20 });
                if (variant === "left") Object.assign(from, { x: -36, y: 0 });
                if (variant === "clip") Object.assign(from, { clipPath: "inset(12% 6% 12% 6% round 16px)", y: 24 });

                gsap.fromTo(
                    el,
                    from,
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        clipPath: "inset(0% 0% 0% 0% round 16px)",
                        duration: 1.1,
                        delay,
                        ease: "power3.out",
                        overwrite: "auto",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            });

            // Gentle parallax for [data-parallax] (subtle, no scroll-jack)
            gsap.utils.toArray("[data-parallax]").forEach((el) => {
                const speed = parseFloat(el.getAttribute("data-parallax") || "0.12");
                gsap.to(el, {
                    y: () => -(speed * 200),
                    ease: "none",
                    scrollTrigger: {
                        trigger: el.closest("section") || el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                });
            });

            // Keep ScrollTrigger in sync with Lenis
            const lenis = window.__lenis;
            if (lenis) {
                lenis.on("scroll", ScrollTrigger.update);
            }
        });

        ctxRef.current = ctx;
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        return () => {
            window.removeEventListener("load", refresh);
            ctx.revert();
        };
    }, []);
};

export default useGsapReveal;

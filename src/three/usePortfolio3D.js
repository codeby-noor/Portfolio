import { useEffect, useRef, useState } from "react";

// Detect if user prefers reduced motion
export const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(media.matches);

        const handler = (e) => setReduced(e.matches);
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    return reduced;
};

// Detect if device is mobile / low-performance
export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
};

// Get mouse position for 3D parallax
export const useMousePosition = () => {
    const ref = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (e) => {
            ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            ref.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };

        window.addEventListener("mousemove", handler, { passive: true });
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    return ref;
};

// Lazy-load 3D scene only when section is in view
export const useInView = (ref, options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const rootMargin = options.rootMargin || "200px";

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref, rootMargin]);

    return isVisible;
};

// Debounced resize handler for canvas quality adjustment
export const useCanvasQuality = () => {
    const [dpr, setDpr] = useState(1.5);
    const [particleCount, setParticleCount] = useState(60);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Determine quality based on viewport + device memory
            const mem = navigator.deviceMemory || 4;
            const isMobile = width <= 768;

            let newDpr = 1;
            if (width > 1600 && mem >= 8) newDpr = 2;
            else if (width > 1024) newDpr = 1.5;
            else if (width > 768) newDpr = 1.25;
            else newDpr = 1;

            let particles = isMobile ? 25 : 60;
            if (mem < 4) particles = Math.floor(particles * 0.6);

            setDpr(newDpr);
            setParticleCount(particles);
            void height;
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { dpr, particleCount };
};
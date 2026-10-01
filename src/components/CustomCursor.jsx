import { useEffect, useRef } from "react";

/**
 * SubtleCursor — desktop-only cursor enhancement.
 * Keeps the native cursor visible; adds a small trailing ring
 * that slightly expands over interactive elements.
 * No cursor: none. No usability harm. Touch devices skip.
 */
const SubtleCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return undefined;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return undefined;

        let x = -100;
        let y = -100;
        let rx = -100;
        let ry = -100;
        let raf = 0;

        const onMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        };

        const loop = () => {
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onOver = (e) => {
            const interactive = e.target.closest?.("a, button, .tilt-card, input, textarea, select");
            ring.classList.toggle("is-hovering", Boolean(interactive));
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
        </>
    );
};

export default SubtleCursor;

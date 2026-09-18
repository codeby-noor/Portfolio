import { useEffect, useRef, useState } from "react";
import "../styles/cursor.css";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [label, setLabel] = useState(null);
    const [isLink, setIsLink] = useState(false);

    useEffect(() => {
        // Only enable on non-touch devices
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return;

        const moveCursor = (e) => {
            if (!cursorRef.current) return;
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
            setVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const closestLink = target.closest?.("a, button, .project-slide, .skills-cinema__word, .project-slide__frame");
            const closestProject = target.closest?.(".project-slide__frame, .project-cinema");

            if (closestProject) {
                setLabel("VIEW");
                setIsLink(true);
            } else if (closestLink) {
                setLabel("OPEN →");
                setIsLink(true);
            } else {
                setLabel(null);
                setIsLink(false);
            }
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${visible ? "visible" : ""} ${isLink ? "hovering-link" : ""} ${label ? "has-label" : ""}`}
            aria-hidden="true"
        >
            {label && <span className="custom-cursor--label">{label}</span>}
        </div>
    );
};

export default CustomCursor;
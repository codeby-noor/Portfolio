import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticButton = ({ children, className = "", onClick, href, type, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    const handleMouseMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const strength = 8;
        setPosition({
            x: (e.clientX - rect.left - rect.width / 2) / rect.width * strength,
            y: (e.clientY - rect.top - rect.height / 2) / rect.height * strength,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setHovering(false);
    };

    const magnetStyle = {
        x: position.x,
        y: position.y,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    };

    const innerStyle = {
        x: hovering ? position.x * 0.4 : 0,
        y: hovering ? position.y * 0.4 : 0,
        transition: { type: "spring", stiffness: 400, damping: 25 },
    };

    const classNames = `btn-magnetic ${className || ""}`;
    const content = (
        <motion.span style={innerStyle} className="btn-magnetic__inner">
            {children}
        </motion.span>
    );

    // If type="submit", render as a button for form submission
    if (type === "submit") {
        return (
            <motion.button
                ref={ref}
                type="submit"
                className={classNames}
                style={magnetStyle}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {content}
            </motion.button>
        );
    }

    return (
        <motion.a
            ref={ref}
            href={href || "#"}
            className={classNames}
            style={magnetStyle}
            onClick={(e) => {
                if (!href || href === "#") e.preventDefault();
                if (onClick) onClick(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {content}
        </motion.a>
    );
};

export default MagneticButton;
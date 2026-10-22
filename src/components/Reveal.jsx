import { motion, useReducedMotion } from "motion/react";

/**
 * SplitWords — subtle word-by-word rise for headings.
 */
export const SplitWords = ({ text, className = "", as: Tag = "span", delay = 0 }) => {
    const reduceMotion = useReducedMotion();
    if (reduceMotion) {
        return <Tag className={className}>{text}</Tag>;
    }
    const words = String(text).split(" ");
    return (
        <Tag className={className} aria-label={text}>
            {words.map((w, i) => (
                <motion.span
                    key={`${w}-${i}`}
                    aria-hidden="true"
                    style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.08em", marginBottom: "-0.08em" }}
                >
                    <motion.span
                        style={{ display: "inline-block", willChange: "transform, opacity" }}
                        initial={{ y: "110%", opacity: 1 }}
                        whileInView={{ y: "0%", opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.06 }}
                    >
                        {w}
                        {i < words.length - 1 ? " " : ""}
                    </motion.span>
                </motion.span>
            ))}
        </Tag>
    );
};

/**
 * Reveal — section wrapper that stays visible before hydration and animates on entry.
 */
const Reveal = ({ children, delay = 0, y = 28, className = "", once = true }) => {
    const reduceMotion = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={{ opacity: 1, y: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: [y, 0] }}
            viewport={{ once, margin: "-70px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;

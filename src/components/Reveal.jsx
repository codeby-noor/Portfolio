import { motion } from "framer-motion";
import { EASE, DURATION } from "../motion/motion";

/**
 * SplitWords — subtle word-by-word rise for headings.
 * e.g. "FULL STACK DEVELOPER" — each word rises + fades.
 * Restrained: 0.7s, 24px rise, small stagger, blur.
 */
export const SplitWords = ({ text, className = "", as: Tag = "span", delay = 0 }) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
                        initial={{ y: "110%", opacity: 0 }}
                        whileInView={{ y: "0%", opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, ease: EASE.out, delay: delay + i * 0.06 }}
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
 * Reveal — single wrapper for section headers / cards.
 * GSAP handles [data-reveal] globally; this covers framer-motion
 * micro-reveals where GSAP attributes are awkward (stagger groups).
 */
const Reveal = ({ children, delay = 0, y = 28, className = "", once = true }) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return <div className={className}>{children}</div>;
    }
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once, margin: "-70px" }}
            transition={{ duration: DURATION.reveal, ease: EASE.out, delay }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;

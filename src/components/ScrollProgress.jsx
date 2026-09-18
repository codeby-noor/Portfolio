import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="scroll-progress" aria-hidden="true">
            <motion.div className="scroll-progress__bar" style={{ scaleY }} />
        </div>
    );
};

export default ScrollProgress;
import { motion } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import "../styles/journey.css";

const stages = [
    { label: "Learn", sub: "BCA Foundation" },
    { label: "Build", sub: "Full-Stack Training" },
    { label: "Connect", sub: "Frontend + Backend" },
    { label: "Create", sub: "Databases + APIs" },
    { label: "Ship", sub: "Real-World Projects" },
];

const Journey = () => {
    const sectionRef = useRef(null);

    return (
        <section id="journey" className="journey section" ref={sectionRef}>
            <div className="container">
                <div className="journey__header">
                    <span className="eyebrow">Development Journey</span>
                    <h2 className="journey__heading">
                        From learning
                        <br />
                        <span className="text-gradient">to shipping.</span>
                    </h2>
                </div>

                <div className="journey__pipeline">
                    {stages.map((stage, index) => (
                        <div className="journey__item" key={index}>
                            <motion.div
                                className="journey__stage"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="journey__stage-index">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="journey__stage-label">{stage.label}</div>
                                <div className="journey__stage-sub">{stage.sub}</div>
                            </motion.div>

                            {index < stages.length - 1 && (
                                <motion.span
                                    className="journey__arrow"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.08 }}
                                    aria-hidden="true"
                                >
                                    <FiArrowRight />
                                </motion.span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;
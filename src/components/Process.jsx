import { motion } from "framer-motion";
import { useRef } from "react";
import { FaLightbulb, FaPencilRuler, FaCode, FaPlug, FaBug, FaRocket } from "react-icons/fa";
import "../styles/process.css";

const stages = [
    { id: "01", title: "Understand", icon: FaLightbulb, desc: "Understand the problem and the user." },
    { id: "02", title: "Design", icon: FaPencilRuler, desc: "Plan the interface and experience." },
    { id: "03", title: "Build", icon: FaCode, desc: "Develop frontend, backend and APIs." },
    { id: "04", title: "Connect", icon: FaPlug, desc: "Integrate database and services." },
    { id: "05", title: "Test", icon: FaBug, desc: "Fix bugs and improve responsiveness." },
    { id: "06", title: "Ship", icon: FaRocket, desc: "Prepare the application for real users." },
];

const Process = () => {
    const sectionRef = useRef(null);

    return (
        <section id="process" className="process section" ref={sectionRef}>
            <div className="container">
                <div className="process__header">
                    <span className="eyebrow">Development Process</span>
                    <h2 className="process__heading">
                        HOW I
                        <br />
                        <span className="text-gradient">BUILD.</span>
                    </h2>
                </div>

                <div className="process__grid">
                    {stages.map((stage, index) => (
                        <motion.div
                            key={stage.id}
                            className="process__stage"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="process__stage-head">
                                <span className="process__stage-index">{stage.id}</span>
                                <span className="process__stage-icon">
                                    <stage.icon aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="process__stage-title">{stage.title}</h3>
                            <p className="process__stage-desc">{stage.desc}</p>
                            {index < stages.length - 1 && (
                                <span className="process__stage-line" aria-hidden="true" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
import { motion } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaServer, FaDatabase, FaBoxOpen } from "react-icons/fa";
import "../styles/capabilities.css";

const capabilities = [
    {
        id: "01",
        title: "Frontend",
        icon: FaCode,
        accent: "#7c8cff",
        items: ["Responsive interfaces", "React.js", "JavaScript", "Bootstrap", "CSS"],
    },
    {
        id: "02",
        title: "Backend",
        icon: FaServer,
        accent: "#8a6bff",
        items: ["APIs & server systems", "Node.js", "Express.js", "REST APIs"],
    },
    {
        id: "03",
        title: "Database",
        icon: FaDatabase,
        accent: "#39d98a",
        items: ["Structured data systems", "MySQL", "MongoDB"],
    },
    {
        id: "04",
        title: "Product",
        icon: FaBoxOpen,
        accent: "#7fd4ff",
        items: ["Real-world applications", "Authentication", "Dashboards", "E-commerce", "Real-time systems"],
    },
];

const Capabilities = () => {
    const sectionRef = useRef(null);

    return (
        <section id="capabilities" className="capabilities section" ref={sectionRef}>
            <div className="container">
                <motion.h2
                    className="capabilities__statement"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    I BUILD ACROSS
                    <br />
                    <span className="text-gradient">THE FULL STACK.</span>
                </motion.h2>

                <div className="capabilities__grid">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={cap.id}
                            className="capabilities__block"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="capabilities__head">
                                <span className="capabilities__index">{cap.id}</span>
                                <span className="capabilities__icon" style={{ color: cap.accent }}>
                                    <cap.icon aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="capabilities__title">{cap.title}</h3>
                            <ul className="capabilities__list">
                                {cap.items.map((item, i) => (
                                    <li className="capabilities__item" key={item}>
                                        <span className="capabilities__item-dot" style={{ background: cap.accent }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Capabilities;
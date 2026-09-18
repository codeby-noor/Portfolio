import { motion } from "framer-motion";
import { useRef, useState, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { usePrefersReducedMotion } from "../three/usePortfolio3D";
import "../styles/architecture.css";

const ArchitectureScene = lazy(() => import("../three/ArchitectureScene"));

const layerInfo = {
    "REACT": { title: "Frontend", desc: "Responsive, component-based interfaces built with React." },
    "AXIOS": { title: "HTTP Client", desc: "Handles requests between the UI and the API layer." },
    "REST API": { title: "API", desc: "Structured endpoints that expose application data." },
    "EXPRESS": { title: "Routing", desc: "Server-side routing and request handling." },
    "NODE.JS": { title: "Backend", desc: "JavaScript runtime powering the server logic." },
    "DATABASE": { title: "Storage", desc: "Persistent, structured storage for application data." },
    "MYSQL / MONGODB": { title: "SQL · No-SQL", desc: "Relational and document databases for real products." },
};

const Architecture = () => {
    const sectionRef = useRef(null);
    const [activeLayer, setActiveLayer] = useState(null);
    const reduced = usePrefersReducedMotion();

    const info = activeLayer ? layerInfo[activeLayer] : null;

    return (
        <section id="architecture" className="architecture section" ref={sectionRef}>
            <div className="container">
                <div className="architecture__header">
                    <span className="eyebrow">Technical Depth</span>
                    <h2 className="architecture__heading">
                        HOW IT
                        <br />
                        <span className="text-gradient">WORKS.</span>
                    </h2>
                    <p className="architecture__sub">
                        I understand applications beyond the UI — from the browser down to the database.
                    </p>
                </div>

                <div className="architecture__grid">
                    {/* 3D diagram */}
                    <div className="architecture__visual">
                        {!reduced && (
                            <Canvas
                                dpr={[1, 1.5]}
                                camera={{ position: [0, 0, 8], fov: 42 }}
                                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                                style={{ position: "absolute", inset: 0 }}
                            >
                                <Suspense fallback={null}>
                                    <ArchitectureScene activeLayer={activeLayer} onLayerHover={setActiveLayer} />
                                    <Environment preset="city" />
                                </Suspense>
                            </Canvas>
                        )}
                        {reduced && (
                            <div className="architecture__static">
                                {Object.keys(layerInfo).map((label) => (
                                    <div className="arch-static__layer" key={label}>
                                        <span className="arch-static__label">{label}</span>
                                        <span className="arch-static__sub">{layerInfo[label].title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info panel */}
                    <div className="architecture__info">
                        <motion.div
                            className="architecture__info-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="architecture__info-label">LAYER</span>
                            <h3 className="architecture__info-title">
                                {info ? info.title : "Full-Stack Architecture"}
                            </h3>
                            <p className="architecture__info-desc">
                                {info
                                    ? info.desc
                                    : "Hover a layer in the diagram to see how each part of the stack works together."}
                            </p>
                            <div className="architecture__info-hint">
                                <span className="architecture__info-dot" />
                                {info ? "Layer selected" : "Hover the stack"}
                            </div>
                        </motion.div>

                        <div className="architecture__flow">
                            <span>REACT</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>AXIOS</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>REST API</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>EXPRESS</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>NODE.JS</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>DATABASE</span>
                            <span className="architecture__flow-arrow">↓</span>
                            <span>MYSQL / MONGODB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Architecture;
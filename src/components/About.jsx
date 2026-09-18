import { FaGraduationCap, FaLaptopCode, FaCheckCircle, FaBriefcase, FaArrowRight } from "react-icons/fa";
import "../styles/about.css";

const aboutHighlights = [
    {
        title: "Academic Background",
        subtitle: "BCA (Bachelor of Computer Applications)",
        icon: FaGraduationCap,
        desc: "3-year curriculum covering data structures, relational database systems (SQL), software development methodologies, and computing fundamentals (2022–2025)."
    },
    {
        title: "Full-Stack Development",
        subtitle: "Practical Web Engineering",
        icon: FaLaptopCode,
        desc: "Hands-on engineering training with React, Node.js, Express.js, MySQL, MongoDB, and RESTful architectures (2025–2026)."
    },
    {
        title: "Current Focus & Availability",
        subtitle: "Ready for Engineering Roles",
        icon: FaBriefcase,
        desc: "Seeking Full Stack / Frontend / Backend Developer roles with engineering teams in North America, Europe, and global remote environments."
    }
];

const engineeringPractices = [
    "Building modular, reusable React UI components with responsive CSS and Bootstrap",
    "Designing structured RESTful API endpoints with input validation and modular routing",
    "Modeling relational schemas in MySQL (primary/foreign keys, joins) and collections in MongoDB",
    "Maintaining clean Git commits, clear documentation, and standard project structures",
    "Testing API endpoints with Postman and validating responsive behavior across viewports"
];

const workflowSteps = [
    { step: "01", title: "Understand", desc: "Define requirements & data models" },
    { step: "02", title: "Plan", desc: "Structure components & API routes" },
    { step: "03", title: "Build", desc: "Develop UI, server & database logic" },
    { step: "04", title: "Test", desc: "Validate endpoints & responsiveness" },
    { step: "05", title: "Refine", desc: "Clean code & handle edge cases" },
    { step: "06", title: "Deploy", desc: "Build & configure hosting environment" }
];

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-eyebrow">
                        <span className="section-eyebrow-dot" />
                        <span>Background & Technical Focus</span>
                    </div>
                    <h2 className="section-title">
                        About my background and approach.
                    </h2>
                    <p className="section-description">
                        Full Stack Developer with a Bachelor of Computer Applications foundation, focused on building clean, database-backed web applications.
                    </p>
                </div>

                <div className="about-grid">
                    {/* Left Column: Summary */}
                    <div className="about-story">
                        <h3 className="about-story-title">
                            Practical web development grounded in computer science fundamentals.
                        </h3>
                        <p className="about-story-p">
                            I am a <strong>Full Stack Developer</strong> based in Navsari, Gujarat, India. During my <strong>Bachelor of Computer Applications (BCA)</strong> degree (2022–2025), I developed foundational knowledge in database systems, data structures, and software principles.
                        </p>
                        <p className="about-story-p">
                            To apply these concepts to full-stack applications, I completed intensive <strong>Full-Stack Web Development</strong> training (2025–2026) and developed professional projects during my internship.
                        </p>

                        <div className="about-story-commitments">
                            <h4 className="about-commitments-heading">Engineering Practices:</h4>
                            <ul className="about-commitments-list">
                                {engineeringPractices.map((practice, idx) => (
                                    <li key={idx} className="about-commitment-item">
                                        <FaCheckCircle className="about-check-icon" aria-hidden="true" />
                                        <span>{practice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Cards */}
                    <div className="about-cards">
                        {aboutHighlights.map((item, idx) => (
                            <div key={idx} className="about-card">
                                <div className="about-card-header">
                                    <item.icon className="about-card-icon" />
                                    <div>
                                        <h4 className="about-card-title">{item.title}</h4>
                                        <span className="about-card-subtitle">{item.subtitle}</span>
                                    </div>
                                </div>
                                <p className="about-card-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Development Workflow Strip */}
                <div className="about-workflow-wrap">
                    <h4 className="about-workflow-heading">Development Approach:</h4>
                    <div className="about-workflow-steps">
                        {workflowSteps.map((ws, idx) => (
                            <div key={ws.step} className="about-workflow-step">
                                <div className="workflow-step-num">{ws.step}</div>
                                <div className="workflow-step-title">{ws.title}</div>
                                <div className="workflow-step-desc">{ws.desc}</div>
                                {idx < workflowSteps.length - 1 && (
                                    <FaArrowRight className="workflow-arrow" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

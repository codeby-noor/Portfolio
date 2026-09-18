import { FaGraduationCap, FaLaptopCode, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/education.css";

const educationData = [
    {
        period: "2022 — 2025",
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Narnala College of Professional and Applied Science",
        location: "Gujarat, India",
        type: "Degree",
        description:
            "Comprehensive university degree covering core computer science principles, database management systems (DBMS), software engineering methodologies, object-oriented programming, and computer networks.",
        highlights: [
            "Data Structures & Algorithms fundamentals",
            "Relational Database Systems (SQL & Schema Modeling)",
            "Web Development & Software Engineering principles"
        ]
    },
    {
        period: "2025 — 2026",
        degree: "Full-Stack Web Development Specialization",
        institution: "Creative Design & Multimedia Institute (CDMI)",
        location: "Surat / Navsari, Gujarat",
        type: "Professional Program",
        description:
            "Intensive professional engineering training focused on end-to-end full-stack development, modern JavaScript (ES6+), React component architectures, Node.js & Express server design, and database integration.",
        highlights: [
            "Full-stack MERN & PERN application architectures",
            "RESTful API design, authentication, and error handling",
            "Real-world application deployments and Git team workflows"
        ]
    }
];

const Education = () => {
    return (
        <section id="education" className="section education-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-eyebrow">
                        <span className="section-eyebrow-dot" />
                        <span>Background & Training</span>
                    </div>
                    <h2 className="section-title">
                        Education & practical development.
                    </h2>
                    <p className="section-description">
                        Academic background in computer applications combined with intensive modern full-stack development training.
                    </p>
                </div>

                <div className="education-timeline">
                    {educationData.map((item, idx) => (
                        <div key={idx} className="education-card">
                            <div className="education-card-top">
                                <div className="education-badge-group">
                                    <span className="badge badge--accent">{item.type}</span>
                                    <span className="education-period">
                                        <FaCalendarAlt aria-hidden="true" />
                                        <span>{item.period}</span>
                                    </span>
                                </div>
                                <div className="education-location">
                                    <FaMapMarkerAlt aria-hidden="true" />
                                    <span>{item.location}</span>
                                </div>
                            </div>

                            <div className="education-body">
                                <div className="education-icon-box">
                                    {idx === 0 ? <FaGraduationCap /> : <FaLaptopCode />}
                                </div>
                                <div className="education-details">
                                    <h3 className="education-degree">{item.degree}</h3>
                                    <div className="education-institution">{item.institution}</div>
                                    <p className="education-desc">{item.description}</p>

                                    <div className="education-highlights">
                                        {item.highlights.map((h, i) => (
                                            <span key={i} className="badge">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;

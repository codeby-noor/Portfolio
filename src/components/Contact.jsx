import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaPaperPlane, FaCheckCircle, FaFileDownload } from "react-icons/fa";
import "../styles/contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = "Please enter your name";
        if (!formData.email.trim()) {
            errs.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errs.email = "Please enter a valid email address";
        }
        if (!formData.message.trim()) {
            errs.message = "Please enter your message";
        } else if (formData.message.trim().length < 10) {
            errs.message = "Message must be at least 10 characters long";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const emailSubject = encodeURIComponent(
            formData.subject.trim()
                ? `[Engineering Opportunity / Project] ${formData.subject.trim()}`
                : `[Engineering Opportunity] From ${formData.name.trim()}`
        );
        const emailBody = encodeURIComponent(
            `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
        );

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            window.location.href = `mailto:Mahenoorshaikh0408@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        }, 400);
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="section-header">
                    <div className="section-eyebrow">
                        <span className="section-eyebrow-dot" />
                        <span>Contact & Opportunities</span>
                    </div>
                    <h2 className="section-title">
                        Have an open role or project? Let's connect.
                    </h2>
                    <p className="section-description">
                        Available for full-time engineering positions, remote roles, and contract development opportunities worldwide.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Left Column: Direct Channels */}
                    <div className="contact-info-panel">
                        <div className="contact-info-card">
                            <h3 className="contact-info-name">Mahenoor Shaikh</h3>
                            <p className="contact-info-role">Full-Stack Web Developer</p>
                            <p className="contact-info-status">
                                <span className="status-indicator-dot" />
                                Open to full-time remote and relocation opportunities
                            </p>

                            <div className="contact-channels">
                                <a
                                    href="mailto:Mahenoorshaikh0408@gmail.com"
                                    className="contact-channel-item"
                                    aria-label="Email Mahenoor Shaikh"
                                >
                                    <div className="channel-icon-wrap">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <span className="channel-label">Email</span>
                                        <strong className="channel-value">Mahenoorshaikh0408@gmail.com</strong>
                                    </div>
                                </a>

                                <a
                                    href="tel:7984078653"
                                    className="contact-channel-item"
                                    aria-label="Call Mahenoor Shaikh"
                                >
                                    <div className="channel-icon-wrap">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <span className="channel-label">Phone / WhatsApp</span>
                                        <strong className="channel-value">+91 79840 78653</strong>
                                    </div>
                                </a>

                                <div className="contact-channel-item static">
                                    <div className="channel-icon-wrap">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <span className="channel-label">Location</span>
                                        <strong className="channel-value">Navsari, Gujarat, India (Open to Remote / Global Work)</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Action Links */}
                            <div className="contact-profile-actions">
                                <a
                                    href="https://github.com/codeby-noor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--secondary btn--sm"
                                    aria-label="GitHub Profile"
                                >
                                    <FaGithub aria-hidden="true" />
                                    <span>GitHub</span>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/mahenoor-shaikh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--secondary btn--sm"
                                    aria-label="LinkedIn Profile"
                                >
                                    <FaLinkedinIn aria-hidden="true" />
                                    <span>LinkedIn</span>
                                </a>

                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn--primary btn--sm"
                                    aria-label="Download Full Resume"
                                >
                                    <FaFileDownload aria-hidden="true" />
                                    <span>Download Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="contact-form-panel">
                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            <h3 className="contact-form-title">Send a Direct Message</h3>

                            <div className="form-group">
                                <label htmlFor="contact-name" className="form-label">
                                    Your Name <span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    className={`form-input ${errors.name ? "form-input--error" : ""}`}
                                    placeholder="e.g. John Smith"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />
                                {errors.name && <span className="form-error-msg">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-email" className="form-label">
                                    Your Email Address <span className="req">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    className={`form-input ${errors.email ? "form-input--error" : ""}`}
                                    placeholder="sconnor@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && <span className="form-error-msg">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-subject" className="form-label">
                                    Subject (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="contact-subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="Full Stack Developer Role / Technical Discussion"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact-message" className="form-label">
                                    Message <span className="req">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="4"
                                    className={`form-textarea ${errors.message ? "form-input--error" : ""}`}
                                    placeholder="Tell me about the role, project, or opportunity."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.message && <span className="form-error-msg">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn--primary btn--full"
                                disabled={isSubmitting}
                            >
                                <FaPaperPlane aria-hidden="true" />
                                <span>{isSubmitting ? "Opening Email..." : "Send Message"}</span>
                            </button>

                            {submitted && (
                                <div className="form-success-banner" role="status">
                                    <FaCheckCircle className="success-icon" />
                                    <span>Your default email client has been prepared with your message.</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

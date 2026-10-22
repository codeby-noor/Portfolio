import Reveal from "./Reveal";

const Contact = () => (
    <section id="contact" className="section-block contact-section" aria-labelledby="contact-title">
        <Reveal className="content-wrap contact-content" y={14}>
            <p className="eyebrow">08 — Contact</p>
            <h2 id="contact-title">Let’s build something meaningful.</h2>
            <p className="contact-intro">For roles, collaborations or a conversation about my work, get in touch.</p>
            <a className="contact-email" href="mailto:Mahenoorshaikh0408@gmail.com">Mahenoorshaikh0408@gmail.com</a>
            <div className="contact-socials">
                <a href="https://www.linkedin.com/in/mahenoor-shaikh-994125350/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/codeby-noor" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="/resume.pdf" download>Resume</a>
            </div>
        </Reveal>
    </section>
);

export default Contact;

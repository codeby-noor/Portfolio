const Experience = () => (
    <section id="experience" className="section-block" aria-labelledby="experience-title">
        <div className="content-wrap">
            <div className="section-heading section-heading--row">
                <div>
                    <p className="eyebrow">05 — Experience</p>
                    <h2 id="experience-title">Professional experience</h2>
                </div>
            </div>

            <article className="experience-entry">
                <div className="experience-entry__date">
                    <span>April 2026 – September 2026</span>
                    <span>Navsari, India</span>
                </div>
                <div className="experience-entry__content">
                    <h3>Full Stack Developer</h3>
                    <p className="experience-entry__company">Viby Solution</p>
                    <ul>
                        <li>Developed and maintained web application features, building responsive interfaces with React.js, Bootstrap and CSS.</li>
                        <li>Integrated REST APIs and supported backend functionality and database-connected application features.</li>
                        <li>Collaborated on project implementation and debugging across frontend and backend workflows.</li>
                    </ul>
                    <p className="experience-entry__stack">React.js · Node.js · Express.js · REST APIs · MySQL · MongoDB</p>
                </div>
            </article>
        </div>
    </section>
);

export default Experience;

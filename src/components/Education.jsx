import Reveal from "./Reveal";

const Education = () => (
    <section id="education" className="section-block section-block--tint" aria-labelledby="education-title">
        <Reveal className="content-wrap" y={14}>
            <div className="section-heading section-heading--row">
                <div>
                    <p className="eyebrow">06 — Education</p>
                    <h2 id="education-title">Academic background</h2>
                </div>
            </div>
            <div className="education-list">
                <article className="education-entry">
                    <p className="education-entry__year">2025–2026<br /><span>Navsari, Gujarat</span></p>
                    <div>
                        <h3>Full Stack Web Development</h3>
                        <p className="education-entry__institution">Creative Design &amp; Multimedia Institute</p>
                        <p className="education-entry__description">Practical frontend and backend development using modern web technologies, including React.js, JavaScript, Node.js, Express.js, APIs, and databases.</p>
                    </div>
                </article>
                <article className="education-entry">
                    <p className="education-entry__year">2022–2025<br /><span>Navsari, Gujarat</span></p>
                    <div>
                        <h3>Bachelor of Computer Applications (BCA)</h3>
                        <p className="education-entry__institution">Naranlala College of Professional and Applied Science</p>
                        <p className="education-entry__description">Computer applications studies covering programming, databases, and software development foundations.</p>
                    </div>
                </article>
            </div>
        </Reveal>
    </section>
);

export default Education;

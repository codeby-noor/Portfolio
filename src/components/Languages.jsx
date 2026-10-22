import Reveal from "./Reveal";

const languages = ["English", "Hindi", "Gujarati"];

const Languages = () => (
    <section id="languages" className="section-block" aria-labelledby="languages-title">
        <Reveal className="content-wrap languages-layout" y={14}>
            <div className="section-heading">
                <p className="eyebrow">07 — Languages</p>
                <h2 id="languages-title">Languages</h2>
            </div>
            <ul className="languages-list">
                {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
        </Reveal>
    </section>
);

export default Languages;

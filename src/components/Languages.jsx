const languages = ["English", "Hindi", "Gujarati"];

const Languages = () => (
    <section id="languages" className="section-block" aria-labelledby="languages-title">
        <div className="content-wrap languages-layout">
            <div className="section-heading" data-reveal="rise">
                <p className="eyebrow">07 — Languages</p>
                <h2 id="languages-title">Languages</h2>
            </div>
            <ul className="languages-list" data-reveal="rise">
                {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
        </div>
    </section>
);

export default Languages;

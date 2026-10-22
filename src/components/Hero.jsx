const Hero = () => (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
        <div className="content-wrap hero-layout">
            <div className="hero-copy">
                <p className="eyebrow hero-eyebrow" data-reveal="rise">Navsari, India</p>
                <h1 id="hero-title" data-reveal="rise"><span>Mahenoor</span> <span>Shaikh</span></h1>
                <p className="hero-role" data-reveal="rise">Full Stack Developer</p>
                <p className="hero-summary" data-reveal="rise">
                    Full Stack Developer with hands-on experience building responsive web applications using React.js, Node.js, Express.js, MySQL, and MongoDB. Experienced in REST API development, database integration, authentication, and building practical user-focused digital products.
                </p>
                <div className="hero-actions" data-reveal="rise">
                    <a className="button button--primary" href="#projects">View projects</a>
                    <a className="button button--outline" href="/resume.pdf" download>Download resume</a>
                </div>
                <div className="hero-links" aria-label="Contact and professional profiles" data-reveal="rise">
                    <a href="mailto:Mahenoorshaikh0408@gmail.com">Email</a>
                    <a href="https://github.com/codeby-noor" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/mahenoor-shaikh-994125350/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
            <aside className="hero-visual" data-reveal="rise" aria-label="Illustrative application stack: React interface, Node and Express API, MySQL and MongoDB data">
                <svg viewBox="0 0 520 340" role="img" aria-labelledby="stack-title stack-description">
                    <title id="stack-title">Application stack</title>
                    <desc id="stack-description">A simple diagram connecting a React interface to a Node and Express API and MySQL and MongoDB data stores.</desc>
                    <path className="stack-guide" d="M42 48v244M478 48v244" />
                    <text className="stack-overline" x="42" y="30">APPLICATION STACK</text>
                    <text className="stack-index" x="470" y="30" textAnchor="end">01 / 03</text>
                    <rect className="stack-node stack-node--primary" x="78" y="62" width="364" height="64" />
                    <text className="stack-node__index" x="98" y="88">01</text>
                    <text className="stack-node__title" x="143" y="91">Frontend</text>
                    <text className="stack-node__detail" x="143" y="111">React.js · Responsive UI</text>
                    <path className="stack-connector" d="M260 126v32" />
                    <circle className="stack-joint" cx="260" cy="142" r="3" />
                    <rect className="stack-node" x="78" y="158" width="364" height="64" />
                    <text className="stack-node__index" x="98" y="184">02</text>
                    <text className="stack-node__title" x="143" y="187">Backend</text>
                    <text className="stack-node__detail" x="143" y="207">Node.js · Express.js · REST APIs</text>
                    <path className="stack-connector" d="M260 222v31m0 0H166v17m94-17h94v17" />
                    <rect className="stack-node stack-node--data" x="78" y="270" width="176" height="48" />
                    <text className="stack-node__detail" x="96" y="299">MySQL</text>
                    <rect className="stack-node stack-node--data" x="266" y="270" width="176" height="48" />
                    <text className="stack-node__detail" x="284" y="299">MongoDB</text>
                </svg>
                <span className="hero-visual__caption">Illustrative stack overview</span>
            </aside>
        </div>
    </section>
);

export default Hero;

const Footer = () => (
    <footer className="site-footer">
        <div className="content-wrap site-footer__inner">
            <div className="site-footer__identity">
                <span className="site-footer__monogram" aria-hidden="true">MS</span>
                <div>
                    <span>© {new Date().getFullYear()} Mahenoor Shaikh</span>
                    <span className="site-footer__caption">Full-Stack Web Developer · Navsari, India</span>
                </div>
            </div>
            <a href="#home">Back to top ↑</a>
        </div>
    </footer>
);

export default Footer;

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroScene = lazy(() => import("../three/HeroScene"));
gsap.registerPlugin(ScrollTrigger);

const Hero = ({ theme }) => {
    const reduceMotion = useReducedMotion();
    const heroRef = useRef(null);
    const [sceneVisible, setSceneVisible] = useState(false);
    const entrance = (delay) => (reduceMotion ? {} : {
        initial: { opacity: 1, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    });

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero || !("IntersectionObserver" in window)) {
            setSceneVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            setSceneVisible(entry.isIntersecting);
        }, { rootMargin: "120px" });
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero || reduceMotion) return undefined;

        const context = gsap.context(() => {
            const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
            entrance
                .fromTo(".hero-eyebrow", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 })
                .fromTo(".hero-title-line__text", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.08)
                .fromTo(".hero-role, .hero-summary", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08 }, 0.28)
                .fromTo(".hero-actions, .hero-links", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 }, 0.46);

            const media = gsap.matchMedia();
            media.add("(min-width: 900px)", () => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "+=65%",
                        pin: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                timeline
                    .to(".hero-copy", { x: -34, y: -14, opacity: 0.84, ease: "none" }, 0)
                    .to(".hero-signature", { y: 18, scale: 0.92, rotate: -2, transformOrigin: "50% 50%", ease: "none" }, 0)
                    .to(".signature-orbit--outer", { rotate: 24, transformOrigin: "50% 50%", ease: "none" }, 0)
                    .to(".signature-orbit--inner", { rotate: -18, transformOrigin: "50% 50%", ease: "none" }, 0);

                return () => timeline.scrollTrigger?.kill();
            });
            media.add("(max-width: 899px)", () => {
                gsap.to(".hero-signature", {
                    y: -18,
                    ease: "none",
                    scrollTrigger: {
                        trigger: hero,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.7,
                    },
                });
            });
            return () => media.revert();
        }, hero);

        return () => context.revert();
    }, [reduceMotion]);

    return (
        <section ref={heroRef} id="home" className="hero-section" aria-labelledby="hero-title">
            <div className="content-wrap hero-layout">
                <div className="hero-copy">
                    <motion.p className="eyebrow hero-eyebrow">Navsari, India</motion.p>
                    <motion.h1 id="hero-title" {...entrance(0.06)}>
                        <span className="hero-title-line"><span className="hero-title-line__text">Mahenoor</span></span>
                        <span className="hero-title-line"><span className="hero-title-line__text">Shaikh</span></span>
                    </motion.h1>
                    <motion.p className="hero-role">Full Stack Developer</motion.p>
                    <motion.p className="hero-summary">
                        I build responsive full-stack web applications, connecting thoughtful React interfaces to REST APIs, authentication, and MySQL or MongoDB data.
                    </motion.p>
                    <motion.div className="hero-actions">
                        <a className="button button--primary" href="#projects">View projects</a>
                        <a className="button button--outline" href="/resume.pdf" download>Download resume</a>
                    </motion.div>
                    <motion.div className="hero-links" aria-label="Contact and professional profiles">
                        <a href="mailto:Mahenoorshaikh0408@gmail.com">Email</a>
                        <a href="https://github.com/codeby-noor" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/mahenoor-shaikh-994125350/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </motion.div>
                </div>
                <motion.aside className="hero-visual hero-visual--signature" aria-label="Mahenoor Shaikh monogram surrounded by a diagram connecting interface, APIs and data" {...entrance(0.2)}>
                    {!reduceMotion && sceneVisible && (
                        <Suspense fallback={<div className="hero-scene-fallback" aria-hidden="true" />}>
                            <HeroScene theme={theme} />
                        </Suspense>
                    )}
                    <svg className="hero-signature" viewBox="0 0 560 430" role="img" aria-labelledby="signature-title signature-description">
                        <title id="signature-title">A full-stack developer’s folio seal</title>
                        <desc id="signature-description">An original MS monogram with fine registration lines connecting interface, API and data.</desc>
                        <rect className="signature-frame" x="18" y="18" width="524" height="394" />
                        <path className="signature-rule" d="M44 62h112M404 62h112M44 368h112M404 368h112" />
                        <text className="signature-label" x="44" y="48">MAHENOOR SHAIKH</text>
                        <text className="signature-label" x="516" y="48" textAnchor="end">FULL STACK / 01</text>
                        <text className="signature-caption" x="44" y="392">NAVSARI, INDIA</text>
                        <text className="signature-caption" x="516" y="392" textAnchor="end">INTERFACE · API · DATA</text>
                        <circle className="signature-disc" cx="280" cy="218" r="127" />
                        <circle className="signature-orbit signature-orbit--outer" cx="280" cy="218" r="108" />
                        <circle className="signature-orbit signature-orbit--inner" cx="280" cy="218" r="92" />
                        <motion.path
                            className="signature-trace"
                            d="M44 124h108l39 38m217-38h-108l-39 38M44 312h108l39-38m217 38h-108l-39-38"
                            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.15, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <motion.path
                            className="signature-trace signature-trace--axis"
                            d="M280 91v30m0 194v30M153 218h36m182 0h36"
                            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <circle className="signature-node" cx="44" cy="124" r="4" />
                        <circle className="signature-node" cx="516" cy="124" r="4" />
                        <circle className="signature-node" cx="44" cy="312" r="4" />
                        <circle className="signature-node" cx="516" cy="312" r="4" />
                        <text className="signature-monogram" x="280" y="240" textAnchor="middle">MS</text>
                        <path className="signature-name-rule" d="M239 260h82" />
                        <text className="signature-discipline" x="280" y="282" textAnchor="middle">BUILDING ACROSS THE STACK</text>
                    </svg>
                </motion.aside>
            </div>
        </section>
    );
};

export default Hero;

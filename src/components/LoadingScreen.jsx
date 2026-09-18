import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/loading.css";

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 12;
            });
        }, 110);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className="loading"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            >
                <div className="loading__content">
                    <motion.div
                        className="loading__name"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Mahenoor Shaikh
                    </motion.div>

                    <motion.p
                        className="loading__role"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Full-Stack Developer
                    </motion.p>

                    <div className="loading__bar">
                        <motion.div
                            className="loading__bar-fill"
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                    </div>

                    <span className="loading__percent">
                        {String(Math.round(Math.min(progress, 100))).padStart(2, "0")}%
                    </span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;
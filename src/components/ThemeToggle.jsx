import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, onToggle }) => {
    return (
        <button
            className="theme-toggle"
            onClick={onToggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggle;
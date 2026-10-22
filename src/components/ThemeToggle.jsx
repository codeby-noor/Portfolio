import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, onToggle }) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    return (
        <button
            className="theme-toggle"
            type="button"
            onClick={onToggle}
            aria-label={`Switch to ${nextTheme} theme`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${nextTheme} theme`}
        >
            <FaSun className="theme-toggle__sun" aria-hidden="true" />
            <FaMoon className="theme-toggle__moon" aria-hidden="true" />
        </button>
    );
};

export default ThemeToggle;
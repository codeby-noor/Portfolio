import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ onToggle }) => {
    return (
        <button
            className="theme-toggle"
            type="button"
            onClick={onToggle}
            aria-label="Toggle color theme"
            title="Toggle color theme"
        >
            <FaSun className="theme-toggle__sun" aria-hidden="true" />
            <FaMoon className="theme-toggle__moon" aria-hidden="true" />
        </button>
    );
};

export default ThemeToggle;
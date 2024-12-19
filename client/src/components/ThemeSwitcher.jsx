import { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import '../styles/header.css';
import PropTypes from 'prop-types';
export default function ThemeSwitcher({ onThemeChange }) {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    
    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const body = document.body;
        const header = document.querySelector("header");
        body.classList.remove("light-mode", "dark-mode");
        header?.classList.remove("light-mode", "dark-mode");

        body.classList.add(isDarkMode ? "dark-mode" : "light-mode");
        header?.classList.add(isDarkMode ? "dark-mode" : "light-mode");

        onThemeChange(isDarkMode);
    }, [isDarkMode, onThemeChange]);

    return (
        <button className="theme-icon" onClick={toggleTheme}>
            {isDarkMode ? (
                <IoMdMoon className="moon" />
            ) : (
                <MdSunny className="sun" />
            )}
        </button>
    );
}

ThemeSwitcher.propTypes = {
    onThemeChange: PropTypes.func.isRequired,
};
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FiSun, FiMoon } from "react-icons/fi";
import { useFavorites } from '../hooks/useFavorites';
import '../styles/Header.css';
import PropTypes from 'prop-types';

export default function Header({ isDarkMode, toggleTheme }) {
    const location = useLocation();
    const path = location.pathname;
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites } = useFavorites();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsSearchVisible(false);
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        if (!isSearchVisible) {
            setIsMenuOpen(true);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // Здесь можно добавить логику поиска
    };

    return (
        <header ref={headerRef} className={`header ${isSearchVisible ? 'search-active' : ''}`}>
            <div className="header-container">
                {!isSearchVisible ? (
                    <>
                        <Link to="/" className="header-logo">
                            <img 
                                src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'} 
                                alt="LostTales" 
                                className="logo-image"
                            />
                        </Link>

                        <nav className={`header-nav ${isMenuOpen ? 'menu-open' : ''}`}>
                            <Link 
                                to="/books" 
                                className={`nav-link ${path === '/books' || path === '/' ? 'active' : ''}`}
                            >
                                Книги
                            </Link>
                            <Link 
                                to="/authors" 
                                className={`nav-link ${path.startsWith('/authors') ? 'active' : ''}`}
                            >
                                Авторы
                            </Link>
                            <Link 
                                to="/genres" 
                                className={`nav-link ${path.startsWith('/genres') ? 'active' : ''}`}
                            >
                                Жанры
                            </Link>
                        </nav>

                        <div className="header-actions">
                            <button className="icon-button" onClick={toggleSearch}>
                                <CiSearch className="icon" />
                            </button>
                            <Link to="/favorites" className="icon-button">
                                <MdFavorite className="icon" />
                                {favorites.length > 0 && <span className="favorites-count">{favorites.length}</span>}
                            </Link>
                            <button className="icon-button" onClick={toggleTheme}>
                                {isDarkMode ? <FiSun className="icon" /> : <FiMoon className="icon" />}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="search-container">
                        <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск книг..."
                            value={searchQuery}
                            onChange={handleSearch}
                            autoFocus
                        />
                        <button className="icon-button" onClick={() => setIsSearchVisible(false)}>
                            ✕
                        </button>
                    </div>
                )}
            </div>

            {isMenuOpen && isSearchVisible && (
                <div className="menu-overlay">
                    <Link 
                        to="/" 
                        className={`nav-link ${path === '/' ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Главная
                    </Link>
                    <nav className="vertical-nav">
                        <Link 
                            to="/books" 
                            className={`nav-link ${path === '/books' || path === '/' ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Книги
                        </Link>
                        <Link 
                            to="/authors" 
                            className={`nav-link ${path.startsWith('/authors') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Авторы
                        </Link>
                        <Link 
                            to="/genres" 
                            className={`nav-link ${path.startsWith('/genres') ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Жанры
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

Header.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};
        
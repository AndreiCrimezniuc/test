import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FiSun, FiMoon } from "react-icons/fi";
import { useFavorites } from '../hooks/useFavorites';
import { useSearch } from '../hooks/useSearch';
import SearchBar from './SearchBar';
import '../styles/header.css';
import PropTypes from 'prop-types';
import { images } from '../utils/images';

export default function Header({ isDarkMode, toggleTheme }) {
    const location = useLocation();
    const path = location.pathname;
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const headerRef = useRef(null);
    const { favorites } = useFavorites();
    const { setIsSearchOpen, closeSearch } = useSearch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                closeSearchBar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeSearch]);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
        setIsSearchOpen(!isSearchVisible);
    };

    const closeSearchBar = () => {
        setIsSearchVisible(false);
        setIsSearchOpen(false);
        closeSearch();
    };

    return (
        <header ref={headerRef} className={`header ${isSearchVisible ? 'search-active' : ''}`}>
            <div className="header-container">
                {!isSearchVisible ? (
                    <>
                        <Link to="/" className="header-logo">
                            <img 
                                src={isDarkMode ? images.whiteLogo : images.blackLogo} 
                                alt="LostTales" 
                                className="logo-image"
                            />
                        </Link>

                        <nav className="header-nav">
                            <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>
                                Главная
                            </Link>
                            <Link to="/books" className={`nav-link ${path === '/books' || path === '/' ? 'active' : ''}`}>
                                Книги
                            </Link>
                            <Link to="/authors" className={`nav-link ${path.startsWith('/authors') ? 'active' : ''}`}>
                                Авторы
                            </Link>
                            <Link to="/genres" className={`nav-link ${path.startsWith('/genres') ? 'active' : ''}`}>
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
                    <SearchBar onClose={closeSearchBar} />
                )}
            </div>
        </header>
    );
}

Header.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    toggleTheme: PropTypes.func.isRequired,
};
        
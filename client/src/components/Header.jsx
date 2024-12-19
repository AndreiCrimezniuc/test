import { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import BurgerMenu from './BurgerMenu';
import SearchBar from './SearchBar';
import logoDark from '../assets/left-black-logo.png';
import logoLight from '../assets/left-white-logo.png';
import ThemeSwitcher from './ThemeSwitcher';
import { MdFavorite } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import booksData from '../books.json';
import '../styles/header.css';

export default function Header() {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const headerRef = useRef(null);
    // const [filteredBooks, setFilteredBooks] = useState(booksData);

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

    const handleThemeChange = (darkMode) => {
        setIsDarkMode(darkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const items = [
        {
            label: 'Главная',
            template: (item, options) => {
                return (
                    <Link to="/" className={options.className}>
                        <span className="p-menuitem-text">Главная</span>
                    </Link>
                );
            }
        },
        {
            label: 'Книги',
            template: (item, options) => {
                return (
                    <Link to="/books" className={options.className}>
                        <span className="p-menuitem-text">Книги</span>
                    </Link>
                );
            }
        },
        {
            label: 'Авторы',
            template: (item, options) => {
                return (
                    <Link to="/authors" className={options.className}>
                        <span className="p-menuitem-text">Авторы</span>
                    </Link>
                );
            }
        },
        {
            label: 'Статьи',
            template: (item, options) => {
                return (
                    <Link to="/articles" className={options.className}>
                        <span className="p-menuitem-text">Статьи</span>
                    </Link>
                );
            }
        }
    ];

    return (
        <header ref={headerRef} className={`${isSearchVisible ? 'search-active' : ''}`}>
            <nav>
                <div className="left-section">
                    {!isSearchVisible ? (
                        <img 
                            onClick={() => navigate('/home')} 
                            className="logo" 
                            src={isDarkMode ? logoLight : logoDark} 
                            alt="logo" 
                        />
                    ) : (
                        <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                    )}
                </div>
                
                {!isSearchVisible ? (
                    <Menubar className="wrapper custom-menubar" model={items} />
                ) : (
                    <div className="search-container">
                        <SearchBar 
                            onClose={() => setIsSearchVisible(false)}
                            data={booksData}
                            onFilter={() => {}}
                        />
                    </div>
                )}
                
                <div className='right-side'>
                    {!isSearchVisible && (
                        <CiSearch className="search-icon" onClick={toggleSearch} />
                    )}
                    <NavLink className="item-link" to={'/favorites'}>
                        <MdFavorite className="favorite-icon" />
                    </NavLink>
                    <ThemeSwitcher onThemeChange={handleThemeChange}/>
                </div>
            </nav>

            {isMenuOpen && isSearchVisible && (
                <div className="menu-overlay">
                    <Menubar className="vertical-menu" model={items} />
                </div>
            )}
        </header>
    );
}
        
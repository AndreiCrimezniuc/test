import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

export default function SearchBar({ onClose, data, onFilter }) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        // Добавляем класс к header при активном поиске
        const header = document.querySelector('header');
        if (header) {
            header.classList.add('search-active');
        }

        return () => {
            // Удаляем класс при размонтировании
            if (header) {
                header.classList.remove('search-active');
            }
        };
    }, []);

    const handleSearch = () => {
        if (searchValue.trim()) {
            const results = {
                books: data.filter(item => 
                    item.title?.toLowerCase().includes(searchValue.toLowerCase())
                ),
                authors: data.filter(item => 
                    item.author?.toLowerCase().includes(searchValue.toLowerCase())
                ),
                articles: data.filter(item => 
                    item.type === 'article' && item.title?.toLowerCase().includes(searchValue.toLowerCase())
                )
            };

            navigate('/search', { 
                state: { 
                    results,
                    searchQuery: searchValue,
                    data
                } 
            });
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        if (onFilter && data) {
            const filteredData = data.filter((item) => {
                const searchLower = e.target.value.toLowerCase();
                return (
                    item.title?.toLowerCase().includes(searchLower) ||
                    item.author?.toLowerCase().includes(searchLower) ||
                    item.genre?.toLowerCase().includes(searchLower)
                );
            });
            onFilter(filteredData);
        }
    };

    return (
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Поиск..."
                autoFocus
            />
            <CiSearch className="search-icon" onClick={handleSearch} />
        </div>
    );
}

SearchBar.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
};
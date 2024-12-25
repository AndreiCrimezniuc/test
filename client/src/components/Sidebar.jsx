"use client";

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { api } from '../services/api';
import '../styles/sidebar.css';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export default function Sidebar({
    selectedGenres, 
    setSelectedGenres, 
    selectedAuthors, 
    setSelectedAuthors,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
}) {
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sectionsState, setSectionsState] = useState({
        genres: true,
        authors: true,
        sort: true
    });

    const [showAllGenres, setShowAllGenres] = useState(false);
    const [showAllAuthors, setShowAllAuthors] = useState(false);
    const ITEMS_TO_SHOW = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [genresResponse, authorsResponse] = await Promise.all([
                    api.getGenres(),
                    api.getAuthors()
                ]);

                // Преобразуем данные авторов
                const transformedAuthors = authorsResponse.map(author => ({
                    id: author.id,
                    name: `${author.firstname} ${author.lastname}`.trim()
                }));

                setGenres(Array.isArray(genresResponse) ? genresResponse : []);
                setAuthors(transformedAuthors);
                setError(null);
            } catch (err) {
                console.error('Error fetching sidebar data:', err);
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleSection = (section) => {
        setSectionsState(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleGenreToggle = (genre) => {
        setSelectedGenres(prev => {
            const isSelected = prev.some(g => g.id === genre.id);
            if (isSelected) {
                return prev.filter(g => g.id !== genre.id);
            } else {
                return [...prev, genre];
            }
        });
    };

    const handleAuthorToggle = (author) => {
        setSelectedAuthors(prev => {
            const isSelected = prev.some(a => a.id === author.id);
            if (isSelected) {
                return prev.filter(a => a.id !== author.id);
            } else {
                return [...prev, author];
            }
        });
    };

    const sortOptions = [
        { value: 'title_asc', name: 'От А до Я', sortBy: 'title', sortOrder: 'asc' },
        { value: 'title_desc', name: 'От Я до А', sortBy: 'title', sortOrder: 'desc' },
        { value: 'year_desc', name: 'Сначала новые', sortBy: 'year', sortOrder: 'desc' },
        { value: 'year_asc', name: 'Сначала старые', sortBy: 'year', sortOrder: 'asc' }
    ];

    if (loading) return <div className="sidebar-loading">Загрузка...</div>;
    if (error) return <div className="sidebar-error">{error}</div>;

    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <div 
                    className="section-header" 
                    onClick={() => toggleSection('genres')}
                >
                    <h2>Жанры</h2>
                    {sectionsState.genres ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.genres && (
                    <div className="section-content">
                        {(showAllGenres ? genres : genres.slice(0, ITEMS_TO_SHOW)).map(genre => (
                            <div key={genre.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`genre-${genre.id}`}
                                    checked={selectedGenres.some(g => g.id === genre.id)}
                                    onChange={() => handleGenreToggle(genre)}
                                />
                                <label htmlFor={`genre-${genre.id}`}>
                                    {genre.name}
                                </label>
                            </div>
                        ))}
                        {genres.length > ITEMS_TO_SHOW && (
                            <button 
                                className="show-more-btn"
                                onClick={() => setShowAllGenres(!showAllGenres)}
                            >
                                {showAllGenres ? 'Показать меньше' : 'Показать все'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <div 
                    className="section-header" 
                    onClick={() => toggleSection('authors')}
                >
                    <h2>Авторы</h2>
                    {sectionsState.authors ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.authors && (
                    <div className="section-content">
                        {(showAllAuthors ? authors : authors.slice(0, ITEMS_TO_SHOW)).map(author => (
                            <div key={author.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`author-${author.id}`}
                                    checked={selectedAuthors.some(a => a.id === author.id)}
                                    onChange={() => handleAuthorToggle(author)}
                                />
                                <label htmlFor={`author-${author.id}`}>
                                    {author.name}
                                </label>
                            </div>
                        ))}
                        {authors.length > ITEMS_TO_SHOW && (
                            <button 
                                className="show-more-btn"
                                onClick={() => setShowAllAuthors(!showAllAuthors)}
                            >
                                {showAllAuthors ? 'Показать меньше' : 'Показать все'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <div 
                    className="section-header" 
                    onClick={() => toggleSection('sort')}
                >
                    <h2>Сортировка</h2>
                    {sectionsState.sort ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.sort && (
                    <div className="section-content">
                        {sortOptions.map((option) => (
                            <div key={option.value} className="radio-item">
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="sort"
                                    value={option.value}
                                    onChange={() => {
                                        setSortBy(option.sortBy);
                                        setSortOrder(option.sortOrder);
                                    }}
                                    checked={sortBy === option.sortBy && sortOrder === option.sortOrder}
                                />
                                <label htmlFor={option.value}>
                                    {option.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    selectedGenres: PropTypes.array.isRequired,
    setSelectedGenres: PropTypes.func.isRequired,
    selectedAuthors: PropTypes.array.isRequired,
    setSelectedAuthors: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    setSortOrder: PropTypes.func.isRequired
};

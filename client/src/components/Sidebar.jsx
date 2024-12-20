"use client";

import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/sidebar.css';
import { FaArrowDownShortWide } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export default function Component({
    selectedGenres, 
    setSelectedGenres, 
    selectedAuthors, 
    setSelectedAuthors,
    sortType,
    setSortType
}) {
    const [sectionsState, setSectionsState] = useState({
        genres: true,
        authors: true,
        sort: true
    });

    const genres = [
        { name: 'Роман', key: 'roman' },
        { name: 'Поэзия', key: 'poetry' },      
        { name: 'Проза', key: 'prose' },
        { name: 'Фантастика', key: 'fantasy' }
    ];

    const authors = [
        { name: 'Пушкин А.С.', key: 'pushkin' },
        { name: 'Толстой Л.Н.', key: 'tolstoy' },
        { name: 'Достоевский Ф.М.', key: 'dostoevsky' },
        { name: 'Чехов А.П.', key: 'chekhov' }
    ];

    const sortOptions = [
        { name: 'Сначала новые', value: 'newest' },
        { name: 'Сначала старые', value: 'oldest' },
        { name: 'От А до Я', value: 'az' },
        { name: 'От Я до А', value: 'za' }
    ];

    const toggleSection = (section) => {
        setSectionsState(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="custom-sidebar">
            <div className="sidebar-section">
                <div className="section-header" onClick={() => toggleSection('genres')}>
                    <span>Жанры</span>
                    {sectionsState.genres ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.genres && (
                    <div className="checkbox-group">
                        {genres.map((genre) => (
                            <div key={genre.key} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={genre.key}
                                    value={genre.key}
                                    onChange={(e) => {
                                        const newSelected = e.target.checked
                                            ? [...selectedGenres, genre]
                                            : selectedGenres.filter(g => g.key !== genre.key);
                                        setSelectedGenres(newSelected);
                                    }}
                                    checked={selectedGenres.some(item => item.key === genre.key)}
                                />
                                <label htmlFor={genre.key}>
                                    {genre.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <div className="section-header" onClick={() => toggleSection('authors')}>
                    <span>Авторы</span>
                    {sectionsState.authors ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.authors && (
                    <div className="checkbox-group">
                        {authors.map((author) => (
                            <div key={author.key} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={author.key}
                                    value={author.key}
                                    onChange={(e) => {
                                        const newSelected = e.target.checked
                                            ? [...selectedAuthors, author]
                                            : selectedAuthors.filter(a => a.key !== author.key);
                                        setSelectedAuthors(newSelected);
                                    }}
                                    checked={selectedAuthors.some(item => item.key === author.key)}
                                />
                                <label htmlFor={author.key}>
                                    {author.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <div className="section-header" onClick={() => toggleSection('sort')}>
                    <span>Сортировка</span>
                    {sectionsState.sort ? 
                        <FaSortAmountUp className="section-icon" /> : 
                        <FaArrowDownShortWide className="section-icon" />
                    }
                </div>
                {sectionsState.sort && (
                    <div className="radio-group">
                        {sortOptions.map((option) => (
                            <div key={option.value} className="radio-item">
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="sort"
                                    value={option.value}
                                    onChange={(e) => setSortType(e.target.value)}
                                    checked={sortType === option.value}
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

Component.propTypes = {
    selectedGenres: PropTypes.array.isRequired,
    setSelectedGenres: PropTypes.func.isRequired,
    selectedAuthors: PropTypes.array.isRequired,
    setSelectedAuthors: PropTypes.func.isRequired,
    sortType: PropTypes.string.isRequired,
    setSortType: PropTypes.func.isRequired
};

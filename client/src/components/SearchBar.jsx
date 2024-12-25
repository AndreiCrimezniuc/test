import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useSearch } from '../hooks/useSearch';
import { api } from '../services/api';
import { getImageUrl } from '../utils/image_url';
import { getAuthorImageUrl } from '../utils/author_image_url';
import '../styles/search-bar.css';

export default function SearchBar({ onClose }) {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const { handleSearch, searchResults, handleShowMore } = useSearch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [booksResponse, authorsResponse] = await Promise.all([
                    api.getBooks(),
                    api.getAuthors()
                ]);
                setBooks(booksResponse || []);
                setAuthors(authorsResponse || []);
            } catch (error) {
                console.error('Error fetching data for search:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value, books, authors);
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <CiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Поиск книг и авторов..."
                    value={query}
                    onChange={handleInputChange}
                    autoFocus
                />
                <button className="close-button" onClick={onClose}>
                    <IoMdClose />
                </button>
            </div>

            {query.trim().length >= 2 && (
                <div className="search-results">
                    {searchResults.books.length > 0 && (
                        <div className="results-section">
                            <h3>Книги</h3>
                            <div className="results-list">
                                {searchResults.books.map(book => (
                                    <Link 
                                        to={`/books/${book.id}`} 
                                        key={book.id}
                                        className="result-item"
                                        onClick={onClose}
                                    >
                                        <img 
                                            src={getImageUrl(book)} 
                                            alt={book.title} 
                                            className="result-image"
                                        />
                                        <div className="result-info">
                                            <h4>{book.title}</h4>
                                            <p>{book.author?.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {searchResults.authors.length > 0 && (
                        <div className="results-section">
                            <h3>Авторы</h3>
                            <div className="results-list">
                                {searchResults.authors.map(author => (
                                    <Link 
                                        to={`/authors/${author.id}`} 
                                        key={author.id}
                                        className="result-item"
                                        onClick={onClose}
                                    >
                                        <img 
                                            src={getAuthorImageUrl(author)} 
                                            alt={`${author.firstname} ${author.lastname}`}
                                            className="result-image author-image"
                                        />
                                        <div className="result-info">
                                            <h4>{`${author.firstname} ${author.lastname}`}</h4>
                                            <p>{author.books?.length || 0} книг</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {(searchResults.books.length > 0 || searchResults.authors.length > 0) && (
                        <button className="show-more-button" onClick={() => {
                            handleShowMore();
                            onClose();
                        }}>
                            Показать все результаты
                        </button>
                    )}

                    {searchResults.books.length === 0 && searchResults.authors.length === 0 && (
                        <div className="no-results">
                            Ничего не найдено
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    onClose: PropTypes.func.isRequired
};
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { api } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/authors.css';
import { getImageUrl } from "../utils/image_url.js";
import { getAuthorImageUrl } from '../utils/author_image_url.js';

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setLoading(true);
                const response = await api.getAuthors();
                const authorsData = Array.isArray(response) ? response : [];
                
                const transformedAuthors = authorsData.map(author => ({
                    ...author,
                    name: `${author.firstname} ${author.lastname}`.trim(),
                }));
                
                setAuthors(transformedAuthors);
            } catch (error) {
                console.error('Error fetching authors:', error);
                setError('Ошибка при загрузке авторов');
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="authors-page">
            <div className="authors-container">
                <h1>Авторы</h1>
                
                <div className="authors-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск авторов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="authors-grid">
                    {filteredAuthors.length > 0 ? (
                        filteredAuthors.map(author => (
                            <div key={author.id} className="author-card">
                                <Link to={`/authors/${author.id}`} className="author-link">
                                    <div className="author-photo">
                                        <img 
                                            src={getAuthorImageUrl(author) || '/placeholder-author.png'} 
                                            alt={author.name} 
                                        />
                                    </div>
                                    <div className="author-info">
                                        <h2 className="author-name">{author.name}</h2>
                                        <p className="author-count">
                                            {author.books?.length || 0} {author.books?.length === 1 ? 'книга' : 'книг'}
                                        </p>
                                    </div>
                                </Link>

                                {author.books && author.books.length > 0 && (
                                    <div className="author-books">
                                        <h3>Последние книги</h3>
                                        <div className="books-grid">
                                            {author.books.slice(0, 3).map(book => (
                                                <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                                                    <div className="book-cover">
                                                        <img 
                                                            src={getImageUrl(book)}
                                                            alt={book.title} 
                                                        />
                                                        <button
                                                            className={`favorite-btn ${favorites.includes(book.id) ? 'active' : ''}`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toggleFavorite(book.id);
                                                            }}
                                                        >
                                                            {favorites.includes(book.id) ? (
                                                                <FaHeart className="favorite-icon" />
                                                            ) : (
                                                                <FaRegHeart className="favorite-icon" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="book-info">
                                                        <h3 className="book-title">{book.title}</h3>
                                                        <p className="book-genre">{book.genre?.name}</p>
                                                        {book.published_year && (
                                                            <p className="book-year">{book.published_year}</p>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                            {author.books.length > 3 && (
                                                <Link to={`/authors/${author.id}`} className="more-books-link">
                                                    Еще {author.books.length - 3} книг
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            {searchQuery ? 'Авторы не найдены' : 'Список авторов пуст'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
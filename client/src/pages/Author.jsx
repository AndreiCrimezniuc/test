import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getImageUrl } from "../utils/image_url.js";
import { getAuthorImageUrl } from '../utils/author_image_url.js';
import '../styles/author.css';

export function Author() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [authorResponse, booksResponse] = await Promise.all([
                    api.getAuthor(id),
                    api.getBooksByAuthor(id)
                ]);
                
                console.log('Author data:', authorResponse);
                console.log('Books data:', booksResponse);
                
                if (!authorResponse) {
                    setError('Автор не найден');
                    return;
                }
                
                setAuthor(authorResponse);
                setBooks(Array.isArray(booksResponse) ? booksResponse : []);
                setError(null);
            } catch (err) {
                console.error('Error fetching author data:', err);
                setError('Ошибка при загрузке данных автора');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!author) return <div className="error">Автор не найден</div>;

    return (
        <div className="author-page">
            <div className="author-container">
                <Link to="/authors" className="back-link">
                    ← Назад к авторам
                </Link>

                <div className="author-header">
                    <div className="author-photo-container">
                        <img 
                            src={getAuthorImageUrl(author) || '/placeholder-author.png'} 
                            alt={`${author.firstname} ${author.lastname}`} 
                            className="author-photo"
                        />
                    </div>
                    <div className="author-info">
                        <h1>{author.firstname} {author.lastname}</h1>
                        <p className="author-books-count">
                            {books.length} {books.length === 1 ? 'книга' : 'книг'}
                        </p>
                        {author.biography && (
                            <div className="author-biography">
                                <h2>Биография</h2>
                                <p>{author.biography}</p>
                            </div>
                        )}
                    </div>
                </div>

                {books.length > 0 && (
                    <div className="author-books-section">
                        <h2>Книги автора</h2>
                        <div className="books-grid">
                            {books.map(book => (
                                <Link 
                                    to={`/books/${book.id}`} 
                                    key={book.id} 
                                    className="book-card"
                                >
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
                                            {favorites.includes(book.id) ? 
                                                <MdFavorite className="favorite-icon" /> : 
                                                <MdFavoriteBorder className="favorite-icon" />
                                            }
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 
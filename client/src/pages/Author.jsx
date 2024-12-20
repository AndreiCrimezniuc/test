import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi.jsx';
import { api } from '../services/api';
import { Component as Sidebar } from '../components/Sidebar';
import { useFavorites } from '../hooks/useFavorites';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export function Author() {
    const { id } = useParams();
    const { data: author, loading: authorLoading, error: authorError } = useApi(
        () => api.getAuthor(id),
        [id]
    );
    const { data: books, loading: booksLoading, error: booksError } = useApi(
        () => api.getBooksByAuthor(id),
        [id]
    );
    const { toggleFavorite, isFavorite } = useFavorites();

    const loading = authorLoading || booksLoading;
    const error = authorError || booksError;

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!author || !books) return null;

    return (
        <div className="catalog-page">
            <div className="catalog-container">
                <aside className="catalog-sidebar">
                    <Sidebar />
                </aside>
                
                <div className="catalog-main">
                    <div className="author-header">
                        <Link to="/authors" className="back-link">
                            ← Назад к авторам
                        </Link>
                        <h1>{author.firstname} {author.lastname}</h1>
                        <p className="author-count">
                            {books.length} {books.length === 1 ? 'книга' : 'книг'}
                        </p>
                        {author.biography && (
                            <div className="author-biography">
                                <h2>Биография</h2>
                                <p>{author.biography}</p>
                            </div>
                        )}
                    </div>

                    <div className="books-grid">
                        {books.map(book => (
                            <Link 
                                to={`/books/${book.id}`} 
                                key={book.id} 
                                className="book-card"
                            >
                                <div className="book-cover">
                                    {book.cover_image && (
                                        <img 
                                            src={api.getImageUrl(book.cover_image)}
                                            alt={book.title}
                                        />
                                    )}
                                    <button 
                                        className={`catalog-favorite-btn ${isFavorite(book.id) ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(book);
                                        }}
                                    >
                                        {isFavorite(book.id) ? 
                                            <MdFavorite className="catalog-favorite-icon" /> : 
                                            <MdFavoriteBorder className="catalog-favorite-icon" />
                                        }
                                    </button>
                                </div>
                                <div className="book-info">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-genre">{book.genre.name}</p>
                                    <p className="book-year">{book.published_year}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 
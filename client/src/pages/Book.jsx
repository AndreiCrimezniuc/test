import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {api} from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { MdFavorite, MdFavoriteBorder, MdFileDownload } from "react-icons/md";
import '../styles/book.css';
import {getImageUrl} from "../utils/image_url.js";

const Book = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.getBook(id);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке книги:', error);
                setError('Ошибка при загрузке книги');
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!book) {
        return <div className="error">Книга не найдена</div>;
    }

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(book.id);
    };

    const handleDownload = async () => {
        try {
            setDownloading(true);
            
            // Ensure the response is valid
            const blob = await api.downloadBook(id);
    
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Prepare file name
            const fileName = `${book.title.toLowerCase().replace(/\s+/g, '_')}.pdf`;
            link.setAttribute('download', fileName);
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Ошибка при скачивании:', err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="book-page">
            <div className="book-container">
                <div className="book-header">
                    <Link to="/books" className="back-link">
                        ← Назад к списку
                    </Link>
                </div>

                <div className="book-content">
                    <div className="book-cover-container">
                        <div className="book-cover">
                            <img 
                                src={getImageUrl(book)}
                                alt={book.title}
                            />
                            <button 
                                className={`favorite-btn ${favorites.includes(book.id) ? 'active' : ''}`}
                                onClick={handleFavoriteClick}
                            >
                                {favorites.includes(book.id) ? 
                                    <MdFavorite className="favorite-icon" /> : 
                                    <MdFavoriteBorder className="favorite-icon" />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="book-info">
                        <h1 className="book-title">{book.title}</h1>
                        
                        <div className="book-meta">
                            {book.author && (
                                <Link to={`/authors/${book.author.id}`} className="book-author">
                                    {book.author.name}
                                </Link>
                            )}
                            {book.genre && (
                                <Link to={`/genres/${book.genre.id}`} className="book-genre">
                                    {book.genre.name}
                                </Link>
                            )}
                            {book.year && (
                                <span className="book-year">{book.year}</span>
                            )}
                        </div>

                        {book.description && (
                            <div className="book-description">
                                <h2>Описание</h2>
                                <p>{book.description}</p>
                            </div>
                        )}

                        {book.file_path && (
                            <button 
                                className="download-button"
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                <MdFileDownload className="download-icon" />
                                {downloading ? 'Скачивание...' : 'Скачать книгу'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book; 
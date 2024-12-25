import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites';
import { api } from '../services/api';
import { getImageUrl } from '../utils/image_url';
import '../styles/favorites.css';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const [books, setBooks] = React.useState([]);

    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.getBooks();
                const favoriteBooks = response.filter(book => 
                    favorites.some(fav => fav.id === book.id)
                );
                setBooks(favoriteBooks);
            } catch (error) {
                console.error('Error fetching favorite books:', error);
            }
        };

        fetchBooks();
    }, [favorites]);

    if (books.length === 0) {
        return (
            <div className="favorites-empty">
                <h1>Избранное</h1>
                <p>У вас пока нет избранных книг</p>
                <Link to="/books" className="browse-books-link">Просмотреть книги</Link>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h1>Избранное</h1>
            <div className="favorites-grid">
                {books.map(book => (
                    <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                        <div className="book-cover">
                            <img 
                                src={getImageUrl(book)} 
                                alt={book.title} 
                            />
                            <button
                                className="favorite-btn active"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavorite(book);
                                }}
                            >
                                <FaHeart className="favorite-icon" />
                            </button>
                        </div>
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author?.name}</p>
                            <p className="book-genre">{book.genre?.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Favorites; 
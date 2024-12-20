import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import {api} from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/Genres.css';

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.getGenres('/genres');
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="genres-page">
            <div className="genres-container">
                <h1>Жанры книг</h1>
                
                <div className="genres-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск жанров..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="genres-grid">
                    {filteredGenres.map(genre => (
                        <div key={genre.id} className="genre-card">
                            <h2 className="genre-name">{genre.name}</h2>
                            <p className="genre-count">{genre.books?.length || 0} книг</p>
                            <p className="genre-description">{genre.description}</p>
                            
                            {genre.books && genre.books.length > 0 && (
                                <div className="genre-books">
                                    <div className="books-grid">
                                        {genre.books.slice(0, 4).map(book => (
                                            <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                                                <div className="book-cover">
                                                    <img 
                                                        src={book.file_path || '/placeholder-book.png'} 
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
                                                    <p className="book-author">{book.author?.name}</p>
                                                    <p className="book-year">{book.year}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Genres;
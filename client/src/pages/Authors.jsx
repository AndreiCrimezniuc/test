import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useApi } from '../hooks/useApi';
import { useFavorites } from '../hooks/useFavorites';
import '../styles/authors.css';

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { get } = useApi();
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await get('/authors');
                setAuthors(response.data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };
        fetchAuthors();
    }, [get]);

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    {filteredAuthors.map(author => (
                        <div key={author.id} className="author-card">
                            <div className="author-photo">
                                <img 
                                    src={author.photo_path || '/placeholder-author.png'} 
                                    alt={author.name} 
                                />
                            </div>
                            <div className="author-info">
                                <h2 className="author-name">{author.name}</h2>
                                <p className="author-count">{author.books?.length || 0} книг</p>
                                <p className="author-description">{author.description}</p>
                            </div>
                            
                            {author.books && author.books.length > 0 && (
                                <div className="author-books">
                                    <div className="books-grid">
                                        {author.books.slice(0, 4).map(book => (
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
                                                    <p className="book-genre">{book.genre?.name}</p>
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
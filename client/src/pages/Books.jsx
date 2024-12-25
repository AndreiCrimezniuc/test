import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { api } from '../services/api';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Sidebar from '../components/Sidebar.jsx';
import '../styles/books.css';
import { getImageUrl } from "../utils/image_url.js";
import { useSearch } from '../hooks/useSearch';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const { favorites, toggleFavorite } = useFavorites();
    const { filterItems } = useSearch();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const params = {
                    sort: `${sortBy}_${sortOrder}`
                };
                
                if (selectedGenres.length > 0) {
                    params.genre_id = selectedGenres.map(g => g.id).join(',');
                }
                if (selectedAuthors.length > 0) {
                    params.author_id = selectedAuthors.map(a => a.id).join(',');
                }

                const response = await api.getBooks(params);
                setBooks(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Ошибка при загрузке книг');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [selectedGenres, selectedAuthors, sortBy, sortOrder]);

    const filteredBooks = searchQuery.trim() 
        ? filterItems(searchQuery, books, []).books 
        : books;

    const sortBooks = (booksToSort) => {
        return [...booksToSort].sort((a, b) => {
            let valueA, valueB;

            switch (sortBy) {
                case 'title':
                    valueA = a.title?.toLowerCase();
                    valueB = b.title?.toLowerCase();
                    break;
                case 'author':
                    valueA = a.author?.name?.toLowerCase();
                    valueB = b.author?.name?.toLowerCase();
                    break;
                case 'genre':
                    valueA = a.genre?.name?.toLowerCase();
                    valueB = b.genre?.name?.toLowerCase();
                    break;
                default:
                    valueA = a.title?.toLowerCase();
                    valueB = b.title?.toLowerCase();
            }

            if (valueA === valueB) return 0;
            if (valueA == null) return 1;
            if (valueB == null) return -1;

            const comparison = valueA < valueB ? -1 : 1;
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };

    const sortedBooks = sortBooks(filteredBooks);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="books-page">
            <div className="books-container">
                <aside className="sidebar">
                    <Sidebar
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        selectedAuthors={selectedAuthors}
                        setSelectedAuthors={setSelectedAuthors}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </aside>

                <div className="main-content">
                    <h1>Книги</h1>

                    <div className="books-controls">
                        <div className="search-container">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Поиск книг..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <CiSearch className="search-icon" />
                        </div>
                    </div>

                    <div className="books-grid">
                        {sortedBooks.map(book => (
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
                                            toggleFavorite(book);
                                        }}
                                    >
                                        {favorites.includes(book.id) ? (
                                            <MdFavorite className="favorite-icon" />
                                        ) : (
                                            <MdFavoriteBorder className="favorite-icon" />
                                        )}
                                    </button>
                                </div>
                                <div className="book-info">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-author">{book.author?.name}</p>
                                    <p className="book-genre">{book.genre?.name}</p>
                                    {book.published_year && <p className="book-year">{book.published_year}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books; 
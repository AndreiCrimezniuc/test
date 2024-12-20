import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import {api} from '../services/api';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Sidebar from '../components/Sidebar.jsx';
import '../styles/books.css';

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

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.getBooks();
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Ошибка при загрузке книг');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filterBooks = (booksToFilter) => {
        return booksToFilter.filter(book => {
            const matchesSearch = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.genre?.name?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesGenres = selectedGenres.length === 0 ||
                (book.genre && selectedGenres.includes(book.genre.id));

            const matchesAuthors = selectedAuthors.length === 0 ||
                (book.author && selectedAuthors.includes(book.author.id));

            return matchesSearch && matchesGenres && matchesAuthors;
        });
    };

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
                case 'year':
                    valueA = a.year;
                    valueB = b.year;
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

    const filteredBooks = filterBooks(books);
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
                                    {book.year && <p className="book-year">{book.year}</p>}
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
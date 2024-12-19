import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/books.css';
import { Component as Sidebar } from '../components/Sidebar';
import { useFavorites } from '../hooks/useFavorites';
import { images } from '../utils/images';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Pagination from '../components/Pagination';
import { fetchBooks } from '../services/books.js';

export default function Books() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [sortType, setSortType] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const [books, setBooks] = useState([]);

    const ITEMS_PER_PAGE = 16;

    useEffect(() => {
        // Fetch books data on mount
        const fetchData = async () => {
            const data = await fetchBooks();
            setBooks(data);
        };

        fetchData();
    }, []);

    // Фильтрация книг
    const filteredBooks = books.filter(book => {
        const noGenresSelected = selectedGenres.length === 0;
        const noAuthorsSelected = selectedAuthors.length === 0;

        if (noGenresSelected && noAuthorsSelected) return true;

        const matchesGenre = noGenresSelected || selectedGenres.some(genre => genre.name === book.genre);
        const matchesAuthor = noAuthorsSelected || selectedAuthors.some(author => author.name === book.author);

        return matchesGenre && matchesAuthor;
    });

    // Сортировка книг
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch (sortType) {
            case 'newest':
                return b.published_year - a.published_year;
            case 'oldest':
                return a.published_year - b.published_year;
            case 'az':
                return a.title.localeCompare(b.title);
            case 'za':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    // Пагинация
    const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = sortedBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleFavoriteClick = (e, book) => {
        e.preventDefault();
        toggleFavorite(book);
    };

    return (
        <div className="catalog-page">
            <div className="catalog-container">
                <aside className="catalog-sidebar">
                    <Sidebar 
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        selectedAuthors={selectedAuthors}
                        setSelectedAuthors={setSelectedAuthors}
                        sortType={sortType}
                        setSortType={setSortType}
                    />
                </aside>
                <div className="catalog-main">
                    <h1>Вся коллекция книг</h1>
                    <div className="catalog-grid">
                        {paginatedBooks.map(book => (
                            <div className="catalog-book-card" key={book.id}>
                                <Link to={`/books/${book.id}`}>
                                    <div className="catalog-book-cover">
                                        <img src={images[book.cover_image]} alt={book.title} />
                                        <button 
                                            className={`catalog-favorite-btn ${isFavorite(book.id) ? 'active' : ''}`}
                                            onClick={(e) => handleFavoriteClick(e, book)}
                                        >
                                            {isFavorite(book.id) ? 
                                                <MdFavorite className="catalog-favorite-icon" /> : 
                                                <MdFavoriteBorder className="catalog-favorite-icon" />
                                            }
                                        </button>
                                    </div>
                                    <div className="catalog-book-info">
                                        <h3>{book.title}</h3>
                                        <h4>{book.author}</h4>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

Books.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            cover_image: PropTypes.string.isRequired
        })
    ).isRequired
}; 
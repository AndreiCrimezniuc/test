import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { api } from '../services/api';
import { useSearch } from '../hooks/useSearch';
import { getImageUrl } from '../utils/image_url';
import { getAuthorImageUrl } from '../utils/author_image_url';
import '../styles/search-results.css';

export default function SearchResults() {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleSearch, searchResults } = useSearch();
    const [localSearchQuery, setLocalSearchQuery] = useState(location.state?.searchQuery || '');

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const [booksResponse, authorsResponse] = await Promise.all([
                    api.getBooks(),
                    api.getAuthors()
                ]);
                
                if (isMounted) {
                    const booksData = Array.isArray(booksResponse) ? booksResponse : [];
                    const authorsData = Array.isArray(authorsResponse) ? authorsResponse : [];
                    
                    setBooks(booksData);
                    setAuthors(authorsData);

                    if (localSearchQuery) {
                        handleSearch(localSearchQuery, booksData, authorsData);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setLocalSearchQuery(query);
        handleSearch(query, books, authors);
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <div className="search-results-page">
            <div className="search-header">
                <h1>Результаты поиска</h1>
                <div className="search-bar-container">
                    <input
                        type="text"
                        value={localSearchQuery}
                        onChange={handleInputChange}
                        placeholder="Поиск..."
                        className="search-input"
                    />
                    <CiSearch className="search-icon" />
                </div>
            </div>

            <div className="results-container">
                {!searchResults.books.length && !searchResults.authors.length ? (
                    <div className="no-results">
                        <h2>По вашему запросу ничего не найдено</h2>
                        <p>Попробуйте изменить запрос или проверить правильность написания</p>
                    </div>
                ) : (
                    <>
                        {searchResults.authors.length > 0 && (
                            <div className="results-section">
                                <h2>Авторы ({searchResults.authors.length})</h2>
                                <div className="authors-grid">
                                    {searchResults.authors.map(author => (
                                        <Link 
                                            to={`/authors/${author.id}`} 
                                            key={author.id} 
                                            className="author-card"
                                        >
                                            <div className="author-image">
                                                <img 
                                                    src={getAuthorImageUrl(author)} 
                                                    alt={`${author.firstname} ${author.lastname}`} 
                                                />
                                            </div>
                                            <div className="author-info">
                                                <h3>{`${author.firstname} ${author.lastname}`}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {searchResults.books.length > 0 && (
                            <div className="results-section">
                                <h2>Книги ({searchResults.books.length})</h2>
                                <div className="books-grid">
                                    {searchResults.books.map(book => (
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
                                            </div>
                                            <div className="book-info">
                                                <h3>{book.title}</h3>
                                                <p className="book-author">{book.author?.name}</p>
                                                <p className="book-genre">{book.genre?.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
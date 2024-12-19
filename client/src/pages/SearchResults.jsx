import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import '../styles/search-results.css';
import { images } from '../utils/images';

export default function SearchResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState({
        books: [],
        authors: [],
        articles: []
    });

    // Получаем начальные результаты из state при переходе
    useEffect(() => {
        if (location.state?.results) {
            setResults(location.state.results);
            setSearchQuery(location.state.searchQuery || '');
        }
    }, [location]);

    const handleSearch = async (query) => {
        // Здесь будет логика поиска
        const filteredResults = {
            books: location.state?.data?.filter(item => 
                item.title?.toLowerCase().includes(query.toLowerCase())
            ) || [],
            authors: location.state?.data?.filter(item => 
                item.author?.toLowerCase().includes(query.toLowerCase())
            ) || [],
            articles: location.state?.data?.filter(item => 
                item.type === 'article' && item.title?.toLowerCase().includes(query.toLowerCase())
            ) || []
        };
        
        setResults(filteredResults);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div className="search-results-page">
            <div className="search-header">
                <h1>Результаты поиска</h1>
                <div className="search-bar-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Поиск..."
                        className="search-input"
                    />
                    <CiSearch className="search-icon" />
                </div>
            </div>

            <div className="results-container">
                {!results.books.length && !results.authors.length && !results.articles.length ? (
                    <div className="no-results">
                        <h2>По вашему запросу ничего не найдено</h2>
                        <p>Попробуйте изменить запрос или проверить правильность написания</p>
                    </div>
                ) : (
                    <>
                        {results.books.length > 0 && (
                            <div className="results-section">
                                <h2>Книги</h2>
                                <div className="books-grid">
                                    {results.books.map((book, index) => (
                                        <div key={index} className="book-card" onClick={() => navigate(`/books/${book.id}`)}>
                                            <img src={images[book.cover_image]} alt={book.title} />
                                            <div className="catalog-book-info">
                                                <h3 >{book.title}</h3>
                                                <h4>{book.author}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.authors.length > 0 && (
                            <div className="results-section">
                                <h2>Авторы</h2>
                                <div className="authors-grid">
                                    {results.authors.map((author, index) => (
                                        <div key={index} className="author-card" onClick={() => navigate(`/authors/${author.id}`)}>
                                            <img src={images[author.photo]} alt={author.name} />
                                            <h3>{author.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.articles.length > 0 && (
                            <div className="results-section">
                                <h2>Статьи</h2>
                                <div className="articles-list">
                                    {results.articles.map((article, index) => (
                                        <div key={index} className="article-card" onClick={() => navigate(`/articles/${article.id}`)}>
                                            <img src={images[article.cover_image]} alt={article.title} />
                                            <h3>{article.title}</h3>
                                        </div>
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

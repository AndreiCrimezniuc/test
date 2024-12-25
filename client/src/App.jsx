import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Home } from './pages/Home';
import Books from './pages/Books';
import { Book } from './pages/Book';
import Authors from './pages/Authors';
import { Author } from './pages/Author';
import Genres from './pages/Genres';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import { FavoritesProvider } from './context/FavoritesProvider.jsx';
import { SearchProvider } from './context/SearchProvider';
import SearchResults from './pages/SearchResults';
import './styles/App.css';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Router>
            <FavoritesProvider>
                <SearchProvider>
                    <div className="app">
                        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/books" element={<Books />} />
                                <Route path="/books/:id" element={<Book />} />
                                <Route path="/authors" element={<Authors />} />
                                <Route path="/authors/:id" element={<Author />} />
                                <Route path="/genres" element={<Genres />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/search" element={<SearchResults />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </SearchProvider>
            </FavoritesProvider>
        </Router>
    );
}

export default App; 
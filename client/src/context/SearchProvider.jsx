import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchContext } from './SearchContext';

export function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState({ books: [], authors: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    const filterItems = (query, books = [], authors = []) => {
        if (!query.trim()) return { books: [], authors: [] };

        const filteredBooks = Array.isArray(books) ? books.filter(book => 
            book.title?.toLowerCase().includes(query.toLowerCase()) ||
            book.author?.name?.toLowerCase().includes(query.toLowerCase()) ||
            book.genre?.name?.toLowerCase().includes(query.toLowerCase())
        ) : [];

        const filteredAuthors = Array.isArray(authors) ? authors.filter(author => {
            const fullName = `${author.firstname} ${author.lastname}`.toLowerCase();
            return fullName.includes(query.toLowerCase());
        }) : [];

        return {
            books: filteredBooks,
            authors: filteredAuthors
        };
    };

    const handleSearch = async (query, books = [], authors = []) => {
        setSearchQuery(query);
        
        if (query.trim().length >= 2) {
            const results = filterItems(query, books, authors);
            setSearchResults({
                books: results.books.slice(0, 4),
                authors: results.authors.slice(0, 4)
            });
        } else {
            setSearchResults({ books: [], authors: [] });
        }
    };

    const handleShowMore = () => {
        navigate('/search', { 
            state: { 
                searchQuery,
                initialResults: searchResults 
            } 
        });
        setIsSearchOpen(false);
        setSearchResults({ books: [], authors: [] });
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchResults({ books: [], authors: [] });
        setSearchQuery('');
    };

    return (
        <SearchContext.Provider value={{
            searchResults,
            searchQuery,
            isSearchOpen,
            setIsSearchOpen,
            handleSearch,
            handleShowMore,
            closeSearch,
            filterItems
        }}>
            {children}
        </SearchContext.Provider>
    );
}

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 
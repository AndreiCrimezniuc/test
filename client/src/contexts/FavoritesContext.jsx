import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Экспортируем контекст
export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (book) => {
        setFavorites(prev => [...prev, book.id]);
    };

    const removeFromFavorites = (book) => {
        setFavorites(prev => prev.filter(id => id !== book.id));
    };

    const isFavorite = (bookId) => {
        return favorites.includes(bookId);
    };

    const toggleFavorite = (book) => {
        if (isFavorite(book.id)) {
            removeFromFavorites(book);
        } else {
            addToFavorites(book);
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
}; 
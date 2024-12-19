import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (book) => {
        setFavorites(prev => [...prev, book]);
    };

    const removeFromFavorites = (bookId) => {
        setFavorites(prev => prev.filter(book => book.id !== bookId));
    };

    const isFavorite = (bookId) => {
        return favorites.some(book => book.id === bookId);
    };

    const toggleFavorite = (book) => {
        if (isFavorite(book.id)) {
            removeFromFavorites(book.id);
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
    children: PropTypes.node.isRequired,
};

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
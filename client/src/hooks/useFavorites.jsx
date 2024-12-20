import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext } from '../context/FavoritesContext';

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (book) => {
        setFavorites(prevFavorites => {
            const isBookFavorite = prevFavorites.some(fav => fav.id === book.id);
            if (isBookFavorite) {
                return prevFavorites.filter(fav => fav.id !== book.id);
            } else {
                return [...prevFavorites, book];
            }
        });
    };

    const isFavorite = (bookId) => {
        return favorites.some(book => book.id === bookId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}



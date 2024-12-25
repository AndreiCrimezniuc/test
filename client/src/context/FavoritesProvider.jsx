import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error('Error parsing favorites:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const toggleFavorite = (book) => {
        if (!book || !book.id) {
            console.error('Invalid book object:', book);
            return;
        }

        setFavorites(prevFavorites => {
            const isBookFavorite = prevFavorites.some(fav => fav.id === book.id);
            if (isBookFavorite) {
                return prevFavorites.filter(fav => fav.id !== book.id);
            } else {
                const bookToSave = {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    genre: book.genre,
                    cover_image: book.cover_image,
                    published_year: book.published_year
                };
                return [...prevFavorites, bookToSave];
            }
        });
    };

    const isFavorite = (bookId) => {
        return favorites.some(book => book.id === bookId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default FavoritesProvider;

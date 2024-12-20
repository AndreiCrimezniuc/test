import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
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
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;
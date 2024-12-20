import { createContext, useState } from 'react';

// Create the context
export const FavoritesContext = createContext();

// Create a provider component
const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesProvider;

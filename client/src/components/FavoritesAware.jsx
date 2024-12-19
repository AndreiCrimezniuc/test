import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesAware({ children }) {
    try {
        useFavorites();
        return children;
    } catch {
        return null;
    }
} 
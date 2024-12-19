import { FavoritesProvider } from './context/FavoritesContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
    return (
        <FavoritesProvider>
            <RouterProvider router={router} />
        </FavoritesProvider>
    );
}

export default App; 
import { useFavorites } from '../hooks/useFavorites';
import books from '../books.json';
import Book from '../components/Book';
import '../styles/favorites.css';

export default function Favorites() {
    const { favorites } = useFavorites();
    
    // Используем массив favorites напрямую, так как в нем уже хранятся полные объекты книг
    const favoriteBooks = favorites;
    
    console.log('Favorites:', favorites); // Для отладки
    console.log('Favorite Books:', favoriteBooks); // Для отладки

    return (
        <div className="favorites-page">
            <h1>Избранное</h1>
            <div className="books-grid">
                {favoriteBooks.length > 0 ? (
                    favoriteBooks.map(book => (
                        <Book key={book.id} book={book} />
                    ))
                ) : (
                    <p>В избранном пока нет книг</p>
                )}
            </div>
        </div>
    );
} 
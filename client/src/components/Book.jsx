import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { images } from '../utils/images';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useFavorites } from '../hooks/useFavorites';
import '../styles/book.css';

export default function Book({ book }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="book-card">
            <Link to={`/books/${book.id}`}>
                <div className="book-image">
                    <img src={images[book.cover_image]} alt={book.title} />
                    <button 
                        className={`favorite-btn ${isFavorite(book.id) ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(book);
                        }}
                    >
                        {isFavorite(book.id) ? 
                            <MdFavorite className="favorite-icon" /> : 
                            <MdFavoriteBorder className="favorite-icon" />
                        }
                    </button>
                </div>
                <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <div className="book-details">
                        <span>{book.genre}</span>
                        <span>{book.published_year}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        published_year: PropTypes.number.isRequired,
        cover_image: PropTypes.string.isRequired
    }).isRequired
};
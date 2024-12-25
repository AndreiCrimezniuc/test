import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/books-slider.css';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useFavorites } from '../hooks/useFavorites';
import { getImageUrl } from "../utils/image_url.js";

export default function BooksSlider({ books }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const maxBooks = 8;
    
    console.log('Books received in BooksSlider:', books);
    
    if (!books || !Array.isArray(books)) {
        console.log('No books data or invalid format');
        return null;
    }

    const displayedBooks = books.slice(0, maxBooks);

    return (
        <div className="books-slider-container">
            <Swiper
                speed={2000}
                slidesPerView={4}
                spaceBetween={false}
                navigation={true}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
                className="books-swiper"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 12 },
                    768: { slidesPerView: 3, spaceBetween: 15 },
                    1024: { slidesPerView: 4, spaceBetween: 15 }
                }}
            >
                {displayedBooks.map((book) => (
                    <SwiperSlide key={book.id}>
                        <Link to={`/books/${book.id}`} className="book-slide">
                            <div className="book-slide-image">
                                <img src={getImageUrl(book)} alt={book.title} />
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
                                <div className="book-slide-info">
                                    <div className="basic-info">
                                        <h3>{book.title}</h3>
                                        <p>{book.author?.firstname} {book.author?.lastname}</p>
                                    </div>
                                    <div className="hover-info">
                                        <p className="genre">Жанр: {book.genre?.name}</p>
                                        <p className="year">Год: {book.published_year}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

BooksSlider.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.object.isRequired,
            genre: PropTypes.object.isRequired,
            published_year: PropTypes.number.isRequired,
            cover_image: PropTypes.string
        })
    ).isRequired
}; 
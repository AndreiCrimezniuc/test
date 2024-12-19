import Slider from '../components/Slider';
import BooksSlider from '../components/BooksSlider';
import BookAwardsSlider from '../components/BookAwardsSlider';
import books from '../books.json';
import '../styles/home.css';
import BooksCollections from '../components/BooksCollections';

export default function Home() {
    return (
        <div className="box">
            <div className="empty-space"></div>
            <Slider />
            <div className="empty-space"></div>
            <BooksSlider books={books} />
            <div className="empty-space"></div>
            <BookAwardsSlider books={books} />
            <BooksCollections />
        </div>
    );
}
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import Slider from '../components/Slider';
import BooksSlider from '../components/BooksSlider';
import BookAwardsSlider from '../components/BookAwardsSlider';
import BooksCollections from '../components/BooksCollections';
import '../styles/home.css';

export function Home() {
    const { data: latestBooks, loading: latestLoading } = useApi(
        () => api.getLatestBooks(10),
        []
    );

    const { data: randomBooks1, loading: random1Loading } = useApi(
        () => api.getRandomBooks(10),
        []
    );

    const { data: randomBooks2, loading: random2Loading } = useApi(
        () => api.getRandomBooks(10),
        []
    );

    if (latestLoading || random1Loading || random2Loading) {
        return (
            <div className="loading-container">
                <div className="loading">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="box">
            <div className="empty-space"></div>
            <Slider />
            <div className="empty-space"></div>

            <section className="books-section">
                <h2 className="section-title">Новые поступления</h2>
                <BooksSlider books={latestBooks || []} />
            </section>

            <div className="empty-space"></div>

            <section className="books-section">
                <h2 className="section-title">Популярные книги</h2>
                <BooksSlider books={randomBooks1 || []} />
            </section>

            <div className="empty-space"></div>

            <section className="books-section">
                <h2 className="section-title">Рекомендуемые книги</h2>
                <BookAwardsSlider books={randomBooks2 || []} />
            </section>

            <div className="empty-space"></div>

            <BooksCollections />
        </div>
    );
}
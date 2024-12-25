import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import Slider from '../components/Slider';
import BooksSlider from '../components/BooksSlider';
import BooksCollections from '../components/BooksCollections';
import '../styles/home.css';

export function Home() {
    const { data: latestBooks, loading: latestLoading, error: latestError } = useApi(
        () => api.getLatestBooks(10),
        []
    );

    const { data: randomBooks1, loading: random1Loading, error: random1Error } = useApi(
        () => api.getRandomBooks(10),
        []
    );

    const { data: randomBooks2, loading: random2Loading, error: random2Error } = useApi(
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

    if (latestError || random1Error || random2Error) {
        console.error('Errors:', { latestError, random1Error, random2Error });
        return (
            <div className="error-container">
                <div className="error">
                    Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.
                </div>
            </div>
        );
    }

    if (!latestBooks || !randomBooks1 || !randomBooks2) {
        return (
            <div className="error-container">
                <div className="error">
                    Данные не найдены
                </div>
            </div>
        );
    }

    return (
        <div className="box">
            <div className="empty-space"></div>
            <Slider />
            <div className="empty-space"></div>

            {latestBooks && latestBooks.length > 0 && (
                <section className="books-section">
                    <h2 className="section-title">Новые поступления</h2>
                    <BooksSlider books={latestBooks} />
                </section>
            )}

            {randomBooks1 && randomBooks1.length > 0 && (
                <section className="books-section">
                    <h2 className="section-title">Популярные книги</h2>
                    <BooksSlider books={randomBooks1} />
                </section>
            )}

            {randomBooks2 && randomBooks2.length > 0 && (
                <section className="books-section">
                    <h2 className="section-title">Рекомендуемые книги</h2>
                    <BooksSlider books={randomBooks2} />
                </section>
            )}

            <div className="empty-space"></div>
            <BooksCollections />
        </div>
    );
}
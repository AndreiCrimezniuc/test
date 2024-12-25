import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.getGenres();
                // работа с массивом
                setGenres(Array.isArray(response) ? response : []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching genres:', err);
                setError('Ошибка при загрузке жанров');
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div>
            <h1>Жанры</h1>
            <div className="genres-list">
                {genres.map(genre => (
                    <div key={genre.id} className="genre-item">
                        <h3>{genre.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genres;
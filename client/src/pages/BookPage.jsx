import books from "../books.json"
import {Link, useParams } from "react-router-dom"
import '../styles/book-page.css';
import { images } from '../utils/images';

export default function BookPage() {
    const {id} = useParams()
    const book = books.find(b => b.id === parseInt(id))
    
    if (!book) return <div>Книга не найдена</div>;

    return (
        <div className="book-page">
            <Link to="/books" className="back-link">← Назад к списку</Link>
            <div className="book-details">
                <div className="book-cover">
                    <img src={images[book.cover_image]} alt={book.title} />
                </div>
                <div className="book-info">
                    <h1>{book.title}</h1>
                    <p className="author">Автор: {book.author}</p>
                    <p className="genre">Жанр: {book.genre}</p>
                    <p className="year">Год издания: {book.published_year}</p>
                    <p className="description">{book.description}</p>
                </div>
            </div>
        </div>
    );
}
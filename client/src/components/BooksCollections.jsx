import { images } from '../utils/images';
import '../styles/collections.css';
import { Link } from 'react-router-dom';

export default function BooksCollections() {
    return (
        <div className="box-collections">
            <div className="empty-space"></div>
            <h1 className="slider-title">Подборки книг, авторов, статей и поэзии </h1>

            <div className="articles-box">
                <Link to="/collections/1">
                    <article className="collection-card">
                        <img src={images.collection1} alt="collection-image" />

                        <div className="content">
                            <h1>Лучшие книги XXI века по версии The New York Times</h1>
                            <p className="synopsis">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit non architecto ad tempora recusandae...
                            </p>
                        </div>
                    </article>
                </Link>

                <Link to="/collections/2">
                    <article className="collection-card">
                        <img src={images.collection2} alt="collection-image" />

                        <div className="content">
                            <h1>Лучшие книги XXI века по версии Vulture</h1>
                            <p className="synopsis">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit non architecto ad tempora recusandae...
                            </p>
                        </div>
                    </article>
                </Link>

                <Link to="/collections/3">
                    <article className="collection-card">
                        <img src={images.collection3} alt="collection-image" />

                        <div className="content">
                            <h1>Классики румынской поэзии</h1>
                            <p className="synopsis">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit non architecto ad tempora recusandae...</p>
                        </div>
                    </article>
                </Link>
{/* 
                <Link to="/collections/4">
                    <article className="collection-card">
                        <img src={images.collection4} alt="collection-image" />

                        <div className="content">
                            <h1>Полка «Полки»</h1>
                            <p className="synopsis">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit non architecto ad tempora recusandae dolor ex quod quos commodi laudantium debitis molestias dolore ut, possimus similique ab dicta quibusdam distinctio...
                            </p>
                        </div>
                    </article>
                </Link> */}
            </div>
        </div>
    );
}
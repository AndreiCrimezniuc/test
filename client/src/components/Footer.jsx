import { FaGithub, FaReddit, FaDribbble, FaYoutube } from "react-icons/fa";
import "../styles/footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer id="footer">
            <div className="col">
                <h3>losTTales</h3>
                <div className="footer-links">
                    <Link to="/about">О нас</Link>
                    <Link to="/privacy">Политика конфиденциальности</Link>
                    <Link to="/terms">Условия использования</Link>
                    <Link to="/contact">Контакты</Link>
                </div>
                <div className="social">
                    <Link to="https://github.com/" target="_blank" className="social-link">
                        <FaGithub/>
                    </Link>
                    <Link to="https://www.reddit.com" target="_blank" className="social-link">
                        <FaReddit/>
                    </Link>
                    <Link to="https://dribbble.com" target="_blank" className="social-link">
                        <FaDribbble/>
                    </Link>
                    <Link to="https://www.youtube.com" target="_blank" className="social-link">
                        <FaYoutube />
                    </Link>
                </div>
                <p>2024 © All Rights Reserved</p>
            </div>
        </footer>
    );
}
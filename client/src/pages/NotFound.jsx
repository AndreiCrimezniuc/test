import "../styles/notfound.css";

export default function NotFound() {
    return <div className="o-404">
        <div className="title">
            <h1 className="a-title">404</h1>
            <p className="a-message">Страница не найдена</p>
        </div>
        
        <div className="o-cat">
            <div className="m-ears">
                <div className="m-ear -right"></div>
                <div className="m-ear -left"></div>
            </div>
            <div className="m-face">
                <div className="m-eyes">
                    <div className="m-eye -left">
                        <div className="a-eyePupil"></div>
                    </div>
                    <div className="m-eye -right">
                        <div className="a-eyePupil"></div>
                    </div>
                </div>
                <div className="m-nose"></div>
            </div>
        </div>
    </div>
}
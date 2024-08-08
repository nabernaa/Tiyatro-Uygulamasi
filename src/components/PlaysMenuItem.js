import '../styles/PlaysMenuItem.css';
import { useNavigate} from 'react-router-dom';

function PlaysMenuItem({ image, name, imgUrl, genre, date, subject, director, writer, assistant_director, music, lights, decor, actors, length}) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Parametreleri diğer sayfaya yönlendirme
        navigate(`/plays/${name}`, { state: { image, imgUrl, name, genre, date, subject, director, writer, assistant_director, music, lights, decor, actors, length} });
    };

    return (
        <div className="menuItem">
            <div style={{ backgroundImage: `url(${image})` }}></div>
            <h1 style={{ marginBottom: '10px', fontSize: '28px',color: 'black' }}>{name}</h1>
            {/* <h6 style={{ marginTop: '0px' }}>{content}</h6> */}
            <p>
                <i style={{ color: 'black' }}>{genre}</i>
            </p>
            <p>
                <i style={{ color: 'black' }}>{date}</i>
            </p>
            <button className="inspect-button" onClick={handleClick}>İncele</button>
        </div>
    );
}

export default PlaysMenuItem;
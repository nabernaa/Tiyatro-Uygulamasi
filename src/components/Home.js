import React from 'react';
import '../styles/Home.css';
import BannerImage from '../images/main-banner.jpg';
import { useNavigate} from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Parametreleri diğer sayfaya yönlendirme
        navigate(`/plays/`);
    };

    return (
        <div className="mainPage" style={{ backgroundImage: `url(${BannerImage})` }}> 
            <div className="banner-box">  
                <h1 style={{ fontSize:'42px' }}>NİSAN AYINDA 30'DAN FAZLA OYUNU SİZLERLE BULUŞTURUYORUZ </h1>
                <p id="text" className="home-text"> 
                27 Mart Dünya Tiyatro Gününüz Kutlu Olsun<br/>
                <button className='home-button' onClick={handleClick}>Oyunları görmek için tıklayınız.</button>
                </p>
            </div>  
        </div>
    );
};

export default Home; 

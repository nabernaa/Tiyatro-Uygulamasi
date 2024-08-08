import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/SeatSelect.css';
import axios from 'axios';

export default function SeatSelect() {
    const { playName } = useParams();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [studentTicket, setStudentTicket] = useState('0');
    const [normalTicket, setNormalTicket] = useState('0');
    
    // Seçilen koltuklar ve bilet bilgilerini localStorage'da tutmak için anahtarlar
    const selectedSeatsKey = 'selectedSeats';
    const normalTicketKey = 'normalTicket';
    const studentTicketKey = 'studentTicket';

    useEffect(() => {
        // localStorage'dan seçilen koltukları ve bilet bilgilerini al
        const initialSelectedSeats = JSON.parse(localStorage.getItem(selectedSeatsKey)) || [];
        const initialNormalTicket = JSON.parse(localStorage.getItem(normalTicketKey)) || '0';
        const initialStudentTicket = JSON.parse(localStorage.getItem(studentTicketKey)) || '0';

        // Seçilen koltukları ve bilet bilgilerini state'e ilk değer olarak ata
        setSelectedSeats(initialSelectedSeats);
        setNormalTicket(initialNormalTicket);
        setStudentTicket(initialStudentTicket);
    }, []);

    // localStorage'a seçilen koltukları ve bilet bilgilerini kaydet
    useEffect(() => {
        localStorage.setItem(selectedSeatsKey, JSON.stringify(selectedSeats));
        localStorage.setItem(normalTicketKey, JSON.stringify(normalTicket));
        localStorage.setItem(studentTicketKey, JSON.stringify(studentTicket));
    }, [selectedSeats, normalTicket, studentTicket]);
    
    // Koltuklar için bir dizi oluştur
    const rows = Array.from({ length: 8 }, (_, index) => String.fromCharCode(65 + index));
    const seats = Array.from({ length: 16 }, (_, index) => index + 1);

    useEffect(() => {
        const getOccupiedSeats = async () => {
        const user = localStorage.getItem('username');
        try {
            const response = await axios.post('http://localhost:8000/getOccupiedSeats', {
                username: user,
                playName: playName,
            });
            const data = response.data;
            setOccupiedSeats(data.occupiedSeats);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        getOccupiedSeats();
    }, [playName]);

    function buyTicket() {
        const totalTicket = parseInt(normalTicket) + parseInt(studentTicket);

        if (selectedSeats.length > 10){
            alert('En fazla 10 adet koltuk seçebilirsiniz');
            return;
        }

        if (totalTicket > selectedSeats.length){
            alert(`Lütfen seçilen koltuk kadar bilet türü seçiniz. Seçilen koltuk: ${selectedSeats.length} Türü seçilen bilet sayısı: ${totalTicket}`);
            return;
        }

        navigate(`/plays/${playName}/payment`,{state: {selectedSeats, playName, normalTicket, studentTicket}});
    }
    
    function toggleSeat(row, seat) {
        const seatId = `${row}${seat}`;

        if (isSeatOccupied(row, seat)) {
            // Koltuk zaten dolu ise tıklanmayı engelle
            return;
        }

        const seatIndex = selectedSeats.indexOf(seatId);
        if (seatIndex === -1) {
            // Koltuk seçili değilse, seçilen koltuklar listesine ekle
            setSelectedSeats([...selectedSeats, seatId]);
        } else {
            // Koltuk seçiliyse, seçilen koltuklar listesinden kaldır
            setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex));
        }
    }

    function isSeatSelected(row, seat) {
        return selectedSeats.includes(`${row}${seat}`);
    }

    function isSeatOccupied(row, seat) {
        return occupiedSeats.includes(`${row}${seat}`);
    }

    return (
        <div className='seat-select-div'>
            <div className="seat-section">
                <ul className="showcase">
                    <li>
                    <div id="" className="seat"></div>
                    <small>Boş</small>
                    </li>
                    <li>
                    <div className="seat selected"></div>
                    <small>Seçili</small>
                    </li>
                    <li>
                    <div id="" className="seat occupied"></div>
                    <small>Dolu</small>
                    </li>
                </ul>
                
                <div className="container-seat">
                    <div className="stage">SAHNE</div>
                        {/* Koltukları döngü ile oluşturur */}
                        {rows.map(row => (
                        <div key={row} className="row">
                            {seats.map(seat => (
                                <div key={`${row}-${seat}`}
                                    className={`seat ${isSeatSelected(row, seat) ? 'selected' : ''} ${isSeatOccupied(row, seat) ? 'occupied' : ''}`}
                                    onClick={() => toggleSeat(row, seat)}>
                                    {row}{seat}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="payment-section">
                <div>
                <label htmlFor="dropdown" style={{color:'black'}}>Tam: 50 TL </label>
                    <select id="dropdown" style={{marginLeft:'4px'}} value={normalTicket} onChange={(e) => setNormalTicket(e.target.value)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <label htmlFor="dropdown" style={{color:'black', marginLeft:'10px'}}>Öğrenci: 30 TL </label>
                    <select id="dropdown" style={{marginLeft:'8px'}} value={studentTicket} onChange={(e) => setStudentTicket(e.target.value)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <p style={{marginLeft:'12%'}}>{normalTicket} tam, {studentTicket} öğrenci bileti seçildi. </p>
                </div>
                <p className="text">
                    <span id="count">Toplam {selectedSeats.length}</span> adet koltuk seçtiniz. 
                </p>
                    <button className="button-seatSelect" onClick={buyTicket}>Devam Et</button>
                    <p style={{color:'red', fontSize:'10px', wordBreak:'break-word'}}>UYARI: Bilet tipi seçilmediği durumlarda tüm biletler tam bilet olarak varsayılır.</p>
            </div>
        </div>
    );
}

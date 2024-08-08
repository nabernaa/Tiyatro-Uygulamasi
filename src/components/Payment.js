import React from 'react';
import '../styles/Payment.css';
import { useState, useEffect } from 'react';
import OrderSummary from './OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  const selectedSeats = location.state.selectedSeats;
  const playName = location.state.playName
  const normalTicket = location.state.normalTicket
  const studentTicket = location.state.studentTicket

  const saveSeatNumbers = async () => {
    const user = localStorage.getItem('username');
    try {
      const response = await fetch('http://localhost:8000/saveSeatNumbers', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: user,
          playName: playName,
          selectedSeats: selectedSeats,
          normalTicket: normalTicket,
          studentTicket: studentTicket
        })
      });
      console.log(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    saveSeatNumbers();
    setShowModal(true);
    console.log('Ödeme işlemi gerçekleştirildi:');
    setPaymentCompleted(true);

    // 3 saniye sonra modalı kapat ve anasayfaya yönlendir
    setTimeout(() => {
      setShowModal(false);
      navigate('/');
    }, 3000); 
  };

  useEffect(() => {
    // Ödeme işlemi tamamlandığında localStorage'ı temizle
    if (paymentCompleted) {
        localStorage.removeItem("selectedSeats");
        localStorage.removeItem("normalTicket");
        localStorage.removeItem("studentTicket");
    }
}, [paymentCompleted]);

  return (
    
    <div className='div-payment'>
      {showModal && (
        <div className="modal-bg">
          <div className="modal-content">
            <p>Ödemeniz başarılı. Keyifli seyirler dileriz.</p> 
            <p>Anasayfaya yönlendiriliyorsunuz...</p>
          </div>
        </div>
      )}
      <span className='back-icon' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} fontSize={"36px"} /></span>
      <div className='container-payment'>
        <h2>Ödeme Bilgileri</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Kart Numarası</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Kart Üzerindeki İsim</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              maxLength="50"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Son Kullanma Tarihi</label>
            <div className="expiry-date">
              <input
                type="text"
                id="expiryMonth"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                maxLength="2"
                placeholder="MM"
                required
              />
              <input
                type="text"
                id="expiryYear"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                maxLength="2"
                placeholder="YY"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
            />
          </div>
          <button className="button-payment" type="submit"><b>Ödemeyi Tamamla</b></button>
        </form>
      </div>
      <OrderSummary/>
    </div>
  );
}

export default Payment;
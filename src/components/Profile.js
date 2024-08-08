import React from 'react'
import '../styles/Profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = localStorage.getItem('username');
      try {
        const response = await axios.post('http://localhost:8000/getUserInfo', {
          username: user, 
        });
  
        setUsername(response.data.user.username); 
        setEmail(response.data.email.email);
        setReservations(response.data.reservations)
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserInfo();
  }, []);
  console.log(reservations)
  return (
    <div className='profile-div'>
      <div className='user-container'>
        <h2>Bilgilerim</h2>
          {username && email && (
            <>
              <p><b>Kullanıcı Adı: </b> {username} </p>
              <p><b>Email: </b> {email}</p>
            </>
          )}
      </div>
      <div className='ticket-container'>
        <h2>Biletlerim</h2>
          <ul>
              {reservations.map((reservation, index) => (
                  <li key={index} className="product-container">
                      <div className="product-info">
                          <span><b>Oyun İsmi: </b>{reservation.playName}&nbsp;</span>
                          <span><b>Oyun Tarihi: </b>{reservation.playDate}&nbsp;</span>
                          <span><b>Koltuk No: </b>{reservation.seatNumber}&nbsp;</span>
                          <span><b>Bilet Türü: </b>{reservation.ticketType}&nbsp;</span>
                          <span><b>Bilet Tutarı: </b>{reservation.ticketPrice}&nbsp;TL</span>
                          <span><b>Referans Kodu: </b>{reservation.referenceNumber}&nbsp;</span>
                          <span><b>Satın Alınan Tarih: </b>{reservation.purchaseDate}&nbsp;</span>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  )
}

export default Profile
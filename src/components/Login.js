  import React, { useState } from 'react'
  import '../styles/Login.css';
  import axios from 'axios';
  import { useNavigate} from 'react-router-dom';
  import Notification from './Notification'; 

  function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const URL = "http://localhost:8000";

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `${URL}/login`,
          { username: username, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        );
        if (response.data.message === "Giriş başarılı!") {
          setIsLoggedIn(true);
          const user = response.data.user.username
          const token = response.data.token
          localStorage.setItem('username', user);
          localStorage.setItem('token', token);
          localStorage.setItem('isLoggedIn', 'true');
          setShowModal(true);
          setTimeout(() => {
            navigate(`/`);
            setShowModal(false);
          }, 1000);

          
        } else {
          setNotification({ message: response.data.message, type: 'error' });
        }
      } catch (error) {
        setNotification({ message: error.message, type: 'error' });
        console.error('Error:', error);
      }
    };
    

    return (
      <div>
        {showModal ? (
          <div className="modal-bg">
            <div className="modal-content">
              <p>Giriş başarılı.</p> 
              <p>Anasayfaya yönlendiriliyorsunuz...</p>
            </div>
          </div>
        ) : (
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required=""
              />
              <label>Kullanıcı Adı</label>
            </div>
            <div className="user-box">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
              <label>Şifre</label>
            </div>
            <button type="submit" className="login-button">Giriş Yap</button>
          </form>
          {notification && (
            <Notification message={notification.message} type={notification.type} />
          )}
        </div>
        )}
      </div>
    )
  }

  export default Login
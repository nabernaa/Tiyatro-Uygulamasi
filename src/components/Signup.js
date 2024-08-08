import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Notification from './Notification'; 

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(true);
        setTimeout(() => {
          navigate(`/login`);
          setShowModal(false);
        }, 3000); 
      } else {
        setNotification({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setNotification({ message: error.message, type: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-div'>
      {showModal ? (
        <div className="modal-bg">
          <div className="modal-content">
            <p>Kayıt başarılı.</p> 
            <p>Giriş sayfasına yönlendiriliyorsunuz...</p>
          </div>
        </div>
      ) : (
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required=""
              />
              <label>Kullanıcı Adı</label>
            </div>
            <div className="user-box">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required=""
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required=""
              />
              <label>Şifre</label>
            </div>
            <div className="user-box">
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required=""
              />
              <label>Şifre Tekrar</label>
            </div>
            <button type="submit" className='login-button'>Kayıt Ol</button>
          </form>
          {notification && (
            <Notification message={notification.message} type={notification.type} />
          )}
        </div>
      )}
    </div>
  );
  
}

export default SignUp;
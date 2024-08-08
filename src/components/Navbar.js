import React, { useEffect, /* useState */ } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
/* import axios from 'axios'; */

function Navbar({isLoggedIn, setIsLoggedIn}) {
/*   const [userData, setUserData] = useState(null); */

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

/*   const getUserInfo = async () => {
    const user = localStorage.getItem('username');
    try {
      const response = await axios.post('http://localhost:8000/getUserInfo', {
        username: user, 
      });

      setUserData(response.data.user); 
      //console.log(response.data.user.username, response.data.email.email)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }; */

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <nav className="mainNav">
      <div className="leftItems">
        <NavLink className="navbar-item" to="/"><FontAwesomeIcon icon={faMasksTheater} style={{ marginRight: "6px"}} /></NavLink>
        <NavLink className="navbar-item" to="/">ANASAYFA</NavLink>
        <NavLink className="navbar-item" to="/plays">ETKİNLİKLER</NavLink>
        <NavLink className="navbar-item" to="/stages">SAHNELER</NavLink>
        <NavLink className="navbar-item" to="/aboutUs">HAKKIMIZDA</NavLink>
      </div>
      <div className="rightItems">
      {isLoggedIn ? (
          <>
            <NavLink className="navbar-item" to="/profile" /* onClick={getUserInfo} */>PROFİL</NavLink>
            <NavLink className="navbar-item" to="/login" onClick={handleLogout}>ÇIKIŞ YAP</NavLink>
          </>
        ) : (
          <>
            <NavLink className="navbar-item" to="/login">GİRİŞ YAP</NavLink>
            <NavLink className="navbar-item" to="/signup">KAYIT OL</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

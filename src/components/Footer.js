import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <ul className="social-media-list">
            <li className="social-media-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} style={{ color: "#feffff" }} />
              </a>
            </li>
            <li className="social-media-item">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} style={{ color: "#feffff" }} />
              </a>
            </li>
            <li className="social-media-item">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} style={{ color: "#feffff" }} />
              </a>
            </li>
            <li className="social-media-item">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} style={{ color: "#feffff" }} />
              </a>
            </li>
            <li className="social-media-item">
              <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} style={{ color: "#feffff" }} />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

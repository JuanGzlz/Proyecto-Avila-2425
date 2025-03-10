import React from 'react';
import "./Footer.css"; 
import avilaLogo from '../images/logo.jpeg'; 
import facebookLogo from '../images/facebook.jpg'; 
import instagramLogo from '../images/instagram.jpg'; 
import youtubeLogo from '../images/youtube.jpg'; 


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="info-title">¡Para más información contáctanos!</h2>

        <div className="footer-content">
          <div className="logo-section">
            <img
              alt="Logo El Ávila Excursions"
              className="footer-logo"
              src={avilaLogo} 
            />
          </div>

          <div className="social-section">
            <div className="social-item">
              <img src={instagramLogo} alt="Instagram" className="social-icon" />
              <p>@avilaexcursionsunimet</p>
            </div>
            <div className="social-item">
              <img src={facebookLogo} alt="Facebook" className="social-icon" />
              <p>@AvilaExsUnimet</p>
            </div>
            <div className="social-item">
              <img src={youtubeLogo} alt="YouTube" className="social-icon" />
              <p>@AvilaExsUnimet</p>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <p>Caracas, Venezuela</p>
          <p>+58 414 329 3323</p>
          <p>avilaexsunimet@gmail.com</p>
        </div>

        <p className="footer-text">
          © 2025 Ávila Excursions | Cod. Fisc. e P. IVA 01456923867 | 
          <a href="#"> Privacy Policy </a> | <a href="#"> Cookies Policy </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


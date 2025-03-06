import React from 'react';
import "./Footer.css"; 
import avilaLogo from '../images/logo.jpeg'; 

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
              <img src="instagram-icon.png" alt="Instagram" className="social-icon" />
              <p>@avilaexcursionsunimet</p>
            </div>
            <div className="social-item">
              <img src="facebook-icon.png" alt="Facebook" className="social-icon" />
              <p>@AvilaExsUnimet</p>
            </div>
            <div className="social-item">
              <img src="twitter-icon.png" alt="Twitter" className="social-icon" />
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


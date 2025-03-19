import React from 'react';
import "./Footer.css"; 
import avilaLogo from '../images/logo.jpeg'; 
import facebookLogo from '../images/facebook.jpg'; 
import instagramLogo from '../images/instagram.jpg'; 
import youtubeLogo from '../images/youtube.jpg'; 

const googleMapsUrl = "https://maps.apple.com/?address=Centro%20Comercial%20Plaza%20Las%20Americas,%20Caracas%20Miranda,%20Venezuela&auid=849425572219958333&ll=10.458414,-66.828949&lsp=9902&q=Centro%20Comercial%20Plaza%20Las%20Americas&t=m";
const phoneNumber = "+584143293323";
const email = "avilaexsunimet@gmail.com";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="info-title">¡Para más información contáctanos!</h2>

        <div className="flex justify-center items-center gap-[30px] mb-4 flex-col lg:flex-row">
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

        <div className="flex justify-center gap-[20px] text-[16px] flex-wrap items-center">
          <p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="footer-link">
              📍 <u>Centro Comercial Plaza Las Américas, Caracas, Miranda, Venezuela</u>
            </a>
          </p>
          <p>
            <a href={`tel:${phoneNumber}`} className="phone-link">
              📞 <u>{phoneNumber}</u>
            </a>
          </p>
          <p>
            <a href={`mailto:${email}`} className="email-link">
              📧 <u>{email}</u>
            </a>
          </p>
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



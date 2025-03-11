import React from 'react';
import Header from './Header';
import Footer from './Footer';
import avilaImage from '../images/EL-AVILA-031.jpg';
import avilaImage2 from '../images/el avila 15.jpg';
import avilaImage3 from '../images/el avila 16.jpg';
import avilaImage4 from '../images/el avila 17.jpg';
import avilaImage5 from '../images/el avila 18.jpg';
import avilaImage6 from '../images/el avila 19.png';
import avilaImage7 from '../images/el avila 20.png';
import avilaImage8 from '../images/el avila 21.png';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className='page-container'>
      <Header />
      <section className="hero-section">
        <img
          className='hero-image'
          alt="Vista del majestuoso Cerro El Ávila"
          src={avilaImage}
        />
        <h2 className="hero-title">
          ¡Vive experiencias inigualables a través de visitas al majestuoso Cerro El Ávila!
        </h2>
      </section>
      
      <section>
        <h2 className="info-title-white">¡Conoce más sobre este patrimonio nacional!</h2>
      </section>

      <section className="info-section">
        <div className="info-container">
          <div className="box-info-cards">
            <div className="info-card">
              <p>Respira el aire fresco de la montaña y disfruta de vistas que te dejarán sin aliento.</p>
            </div>
            <div className="info-card">
              <p>Cada sendero cuenta una historia. ¿Listo para explorar?</p>
            </div>
            <div className="info-card">
              <p>Déjate sorprender por la biodiversidad y la paz que El Ávila puede ofrecerte.</p>
            </div>
          </div>

          <div className="info-buttons">
            <button className="info-button">Ver más información</button>
            <button className="info-button">Galería de fotos</button>
          </div>
        </div>
      </section>

      <section className="box-welcome">
          <div className='info-welcome'>
            <h2 className="info-title-black">Bienvenido a la experiencia definitiva...</h2>
            <p className="text-welcome">
              Aquí, la naturaleza y la aventura se encuentran con la comodidad y la seguridad. Nuestras actividades están
              diseñadas para explorar los alrededores de Caracas y descubrir los tesoros naturales que este parque ofrece.
              Desde caminatas hasta paseos en teleférico, siempre encontrarás algo que hacer. ¡Te esperamos con los brazos
              abiertos, y estamos aquí para hacerlo posible!
            </p>
          </div>
          <div className="info-welcome">
            <img
              alt="Imagen de la experiencia"
              className="image"
              height="300"
              src={avilaImage2}
              width="350"
            />
          </div>
      </section>

      <section className="page-conteiner">
        <h2 className="info-title-white">¡Visita nuestras mejores actividades!</h2>
        <div className="image-box">
          <div className="image-container">
            <img alt="Acampar" src={avilaImage3} />
            <h3 className="image-text">Acampar</h3>
          </div>
          <div className="image-container">
            <img alt="Subir Teleférico" src={avilaImage4} />
            <h3 className="image-text">Subir Teleférico</h3>
          </div>
          <div className="image-container">
            <img alt="Sabas Nieves" src={avilaImage5} />
            <h3 className="image-text">Sabas Nieves</h3>
          </div>
        </div>
        <div className="info-buttons">
          <button className="verMas-button">Ver más</button>
        </div>
      </section>

      <section className="page-conteiner">
        <h2 className="info-title-white">¿Tienes experiencia siendo guía? ¡Únete y sé uno!</h2>
        <div className="image-box">
          <div className="image-container">
            <img alt="Acampar" src={avilaImage7} />
            <h3 className="image-text">¿Tienes los equipos necesarios?</h3>
          </div>
          <div className="image-container">
            <img alt="Subir Teleférico" src={avilaImage6} />
            <h3 className="image-text">¿Conoces las rutas?</h3>
          </div>
          <div className="image-container">
            <img alt="Sabas Nieves" src={avilaImage8} />
            <h3 className="image-text">¿Sabes de auxilios médicos?</h3>
          </div>
        </div>
        <div className="info-buttons">
          <button className="verMas-button">Enviar solicitud</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
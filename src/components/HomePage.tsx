import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  return (
    <div className='page-container'>
      <Header />
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          className='hero-image'
          alt="Vista del majestuoso Cerro El Ávila"
          src={avilaImage}
        />
        <motion.h2 
          className="hero-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ¡Vive experiencias inigualables a través de visitas al majestuoso
          <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Brush Script MT', cursive" }}>
            Cerro El Ávila!
          </p>
        </motion.h2>
      </motion.section>
      <motion.section 
        className="info-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
      <h2 className = "text-4xl pt-3 font-bold text-white pt-5 pb-10" style={{ fontFamily: "'Lucida Handwriting', cursive" }}>¡Conoce más sobre este patrimonio nacional!</h2>
        <div className="box-info-cards">
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🏔️</span>
              <p className="mt-2 max-w-xs text-center">Respira aire fresco de la montaña y disfruta vistas que te ayudan a relajarte.</p>
            </div>
          </motion.div>
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🥾</span>
              <p className="mt-2 max-w-xs text-center">Cada sendero cuenta una historia única. ¿Listo para explorar?</p>
            </div>
          </motion.div>
          <motion.div className="info-card" whileHover={{ scale: 1.05 }}>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🌄</span>
              <p className="mt-2 max-w-xs text-center">Déjate sorprender por la biodiversidad y las vistas que El Ávila puede ofrecer.</p>
            </div>
          </motion.div>
        </div>
        <div className="info-buttons">
          <motion.button className="info-button font-semibold" whileHover={{ scale: 1.1 }}>
            Ver más información
          </motion.button>
          <motion.button className="info-button font-semibold" whileHover={{ scale: 1.1 }} onClick={() => navigate('/fauna')}>
            Galería de fotos
          </motion.button>
        </div>
      </motion.section>

      <motion.section className="box-welcome" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className='info-welcome'>
          <h2 className="info-title-black">Bienvenido a la experiencia definitiva...</h2>
          <p className="text-welcome text-justify">
            Aquí, la naturaleza y la aventura se encuentran con la comodidad y la seguridad. Nuestras actividades están
            diseñadas para explorar los alrededores de Caracas y descubrir los tesoros naturales que este parque ofrece.
            Desde caminatas hasta paseos en teleférico, siempre encontrarás algo que hacer. ¡Te esperamos con los brazos
            abiertos, y estamos aquí para hacerlo posible!
          </p>
        </div>
        <motion.div className="info-welcome" whileHover={{ scale: 1.05 }}>
          <img alt="Imagen de la experiencia" className="image" height="300" src={avilaImage2} width="350" />
        </motion.div>
      </motion.section>

      <h2 className="info-title-white">¡Visita nuestras mejores actividades!</h2>

      <motion.section className="image-box" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="Acampar" src={avilaImage3} />
          <h3 className="image-text">Acampar</h3>
        </motion.div>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="Subir Teleférico" src={avilaImage4} />
          <h3 className="image-text">Subir Teleférico</h3>
        </motion.div>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="Sabas Nieves" src={avilaImage5} />
          <h3 className="image-text">Sabas Nieves</h3>
        </motion.div>
      </motion.section>

      <div className="info-buttons">
        <motion.button className="verMas-button" whileHover={{ scale: 1.1 }}>
          Ver más
        </motion.button>
      </div>

      <h2 className="info-title-white">¿Tienes experiencia siendo guía? ¡Únete y sé uno!</h2>
      

      <motion.section className="image-box" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="¿Tienes los equipos necesarios?" src={avilaImage6} />
          <h3 className="image-text">¿Tienes los equipos necesarios?</h3>
        </motion.div>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="¿Conoces las rutas?" src={avilaImage7} />
          <h3 className="image-text">¿Conoces las rutas?</h3>
        </motion.div>
        <motion.div className="image-container" whileHover={{ scale: 1.05, rotate: 3 }}>
          <img alt="¿Sabes de auxilios medicos?" src={avilaImage8} />
          <h3 className="image-text">¿Sabes de auxilios medicos?</h3>
        </motion.div>
      </motion.section>

      
      <div className="info-buttons">
        <motion.button className="verMas-button" whileHover={{ scale: 1.1 }}>
          Enviar solicitud
        </motion.button>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
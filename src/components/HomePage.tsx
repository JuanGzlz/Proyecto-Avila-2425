import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';
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
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const toggleCard = (card: string) => {
  setExpandedCard(expandedCard === card ? null : card);
};
const formatList = (items: string[]) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>🔹 {item}</li>
    ))}
  </ul>
);

  return (
    <div className='page-container'>
      <Header />
      <motion.section 
        className="hero-section relative w-full h-[300px] lg:h-[450px]"
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
      <h2 className = "text-4xl font-bold text-white pt-5 pb-10" style={{ fontFamily: "'Lucida Handwriting', cursive" }}>¡Conoce más sobre este patrimonio nacional!</h2>
        <div className="flex justify-center items-center gap-[15px] lg:gap-[125px] flex-col lg:flex-row relative w-full overflow-visible">
          <motion.div className="info-card-afuera">
            <div className='info-card'>
              <div className="flex flex-col items-center">
                <span className="text-4xl">🏔️</span>
                <p className="mt-2 max-w-xs text-center">Respira aire fresco de la montaña y disfruta vistas que te ayudan a relajarte.</p>
              </div>
            </div>
            
          </motion.div>
          <motion.div className="info-card-afuera">
            <div className='info-card'>
              <div className="flex flex-col items-center">
                <span className="text-4xl">🥾</span>
                <p className="mt-2 max-w-xs text-center">Cada sendero cuenta una historia única. ¿Listo para explorar?</p>
              </div>
            </div>
            
          </motion.div>
          <motion.div className="info-card-afuera">
            <div className='info-card'>
              <div className="flex flex-col items-center">
                <span className="text-4xl">🌄</span>
                <p className="mt-2 max-w-xs text-center">Déjate sorprender por la biodiversidad y las vistas que El Ávila puede ofrecer.</p>
              </div>
            </div>
            
          </motion.div>
        </div>
        <div className="info-buttons">
          <motion.button className="info-button font-semibold" whileHover={{ scale: 1.1 }} onClick={() => navigate('/info-avila')}>
            Ver más información
          </motion.button>
          <motion.button className="info-button font-semibold" whileHover={{ scale: 1.1 }} onClick={() => navigate('/fauna')}>
            Galería de fotos
          </motion.button>
        </div>
      </motion.section>

      <motion.section className="max-w-[1000px] mx-auto bg-white text-center text-black flex justify-between items-center gap-10 mt-10 mb-10 flex-col lg:flex-row" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className='font-normal text-black p-5'>
          <h2 className="text-[30px] lg:text-[40px] font-bold mb-6 text-left">Bienvenido a la experiencia definitiva...</h2>
          <p className="text-left">
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

      <motion.section className="image-box flex flex-col lg:flex-row justify-center items-center gap-[35px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
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
      

      <motion.section className="image-box flex flex-col lg:flex-row justify-center items-center gap-[35px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
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
      <motion.section 
  className="info-cards-section"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>

  <h2 className="info-title-center">Nuestra Esencia</h2>

  <div className="box-info-cards flex flex-col lg:flex-row justify-center items-center gap-[35px]">
    {['mision', 'vision', 'objetivo'].map((card, index) => (
      <div key={index} className="info-card-container">
        <h3 className="card-title-outside">
          {card === 'mision' ? '🌿 Misión' : card === 'vision' ? '🌄 Visión' : '🎯 Objetivo General'}
        </h3>

        <motion.div 
          className={`info-card-2 gradient-bg ${expandedCard === card ? 'expanded' : ''}`} 
          whileHover={{ scale: 1.05 }}
          onClick={() => toggleCard(card)}
        >
          <img 
            src={card === 'mision' ? avilaImage3 : card === 'vision' ? avilaImage4 : avilaImage5} 
            alt={card === 'mision' ? "Imagen de Misión" : card === 'vision' ? "Imagen de Visión" : "Imagen de Objetivo General"} 
            className="card-image"
          />

          <div className={`text-container fade-in-slow ${expandedCard === card ? 'expanded' : ''}`}>
            {card === 'mision' && formatList([
              'Fomentar la conexión entre los estudiantes de la Universidad Metropolitana y el entorno natural del Cerro El Ávila.',
              'Ofrecer una plataforma innovadora donde pueden explorar, disfrutar y participar en actividades deportivas y recreativas.',
              'Brindar herramientas para que los usuarios registren sus aventuras y conserven recuerdos.'
            ])}

            {card === 'vision' && formatList([
              'Convertirse en el punto de encuentro digital para conectar con la naturaleza de manera significativa.',
              'Inspirar a cada usuario a descubrir la belleza del Parque Nacional El Ávila.',
              'Promover un estilo de vida activo, saludable y en armonía con el entorno.',
              'Fomentar el respeto por el medio ambiente y el sentido de comunidad.',
              'Crear una comunidad vibrante de amantes de la naturaleza con guías especializados.'
            ])}

            {card === 'objetivo' && (
              <>
                <p>Desarrollar una plataforma web que permita a los estudiantes:</p>
                {formatList([
                  'Reservar actividades en el Parque Nacional El Ávila.',
                  'Registrar y compartir sus experiencias.',
                  'Acceder a información relevante sobre las actividades disponibles.'
                ])}
                <br />
                <strong>Objetivos Específicos:</strong>
                {formatList([
                  '📌 Establecer los requerimientos tanto funcionales como no funcionales de la plataforma.',
                  '🖥️ Diseñar la estructura del sistema basada en React, con una arquitectura fácilmente actualizable.',
                  '💻 Desarrollar todas las funcionalidades y módulos de la plataforma en React usando Firebase como backend.',
                  '✅ Establecer un sistema de pruebas para la validación del correcto funcionamiento del sistema.'
                ])}
              </>
            )}
          </div>
        </motion.div>
      </div>
    ))}
  </div>
</motion.section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
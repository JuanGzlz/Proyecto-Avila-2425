import React from 'react';
import Header from './Header';
import Footer from './Footer';
import avilaImage from '../images/EL-AVILA-031.jpg';
import avilaImage2 from '../images/el avila 15.jpg';
import avilaImage3 from '../images/el avila 16.jpg';
import avilaImage4 from '../images/el avila 17.jpg';
import avilaImage5 from '../images/el avila 18.jpg';
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
          Vive experiencias inigualables a través de visitas al majestuoso Cerro El Ávila!
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


      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Tienes experiencia siendo guía? ¡Únete y sé uno!</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Tienes los equipos necesarios?"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">¿Tienes los equipos necesarios?</h3>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Conoces las rutas?"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">¿Conoces las rutas?</h3>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Sabes de auxilios médicos?"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">¿Sabes de auxilios médicos?</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-800 text-white px-6 py-2 rounded-md">Enviar solicitud</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
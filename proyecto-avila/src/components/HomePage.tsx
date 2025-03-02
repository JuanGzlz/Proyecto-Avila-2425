import React from 'react';
import Header from './Header';
import Footer from './Footer';
import avilaImage from '../images/EL-AVILA-031.jpg';
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
          Vive experiencias inigualables a través de visitas al majestuoso Cerro El Ávila
        </h2>
      </section>
      
      <section className="info-section">
        <div className="info-container">
          <h2 className="info-title-white">¡Conoce más sobre este patrimonio nacional!</h2>

          <div className="box-info-cards">
            <div className="info-card">
              <div className="info-icon">🚶‍♂️</div> {/* Ícono de muñeco */}
              <p>Respira el aire fresco de la montaña.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🌄</div> {/* Ícono de montaña */}
              <p>Disfruta de vistas que te dejarán sin aliento.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🌿</div> {/* Ícono de naturaleza */}
              <p>Cada sendero cuenta una historia.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🕊️</div> {/* Ícono de paz */}
              <p>Déjate sorprender por la biodiversidad y la paz.</p>
            </div>
          </div>


          <div className="info-buttons">
            <button className="info-button">Ver más información</button>
            <button className="info-button">Galería de fotos</button>
          </div>
        </div>
      </section>

      <section className="page-conteiner">

        <div className="box-welcome">
          <div className='info-welcome'>
            <h2 className="info-title-black">Bienvenido a la experiencia definitiva...</h2>
            <p className="text-welcome">
              Aquí, la naturaleza y la aventura se encuentran con la comodidad y la seguridad. Nuestras actividades están
              diseñadas para explorar los alrededores de Caracas y descubrir los tesoros naturales que este parque ofrece.
              Desde caminatas hasta paseos en teleférico, siempre encontrarás algo que hacer. ¡Te esperamos con los brazos
              abiertos, y estamos aquí para hacerte posible!
            </p>
          </div>
          <div className="info-welcome">
            <img
              alt="Imagen de la experiencia"
              className="rounded-lg shadow-lg"
              height="300"
              src=""
              width="400"
            />
          </div>
        </div>
      </section>
      <section className="page-conteiner">
        <div className="">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¡Visita nuestras mejores actividades!</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Acampar"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Acampar</h3>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Subir Teleférico"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Subir Teleférico</h3>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="relative">
                <img
                  alt="Sabas Nieves"
                  className="rounded-lg shadow-lg"
                  height="200"
                  src=""
                  width="300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Sabas Nieves</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-800 text-white px-6 py-2 rounded-md">Ver más</button>
          </div>
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
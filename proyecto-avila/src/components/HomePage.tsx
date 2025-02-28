import React from 'react';
import Header from './Header';
import Footer from './Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <section className="relative">
        <img
          alt="Vista del majestuoso Cerro El Ávila"
          className="w-full h-64 object-cover"
          height="400"
          src=""
          width="1200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
            Vive experiencias inigualables a través de visitas al majestuoso Cerro El Ávila
          </h1>
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¡Conoce más sobre este patrimonio nacional!</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-green-800 text-white p-6 rounded-lg">
                <i className="fas fa-hiking text-4xl mb-4"></i>
                <p>Regístrate y forma parte de los grupos en rutas.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-green-800 text-white p-6 rounded-lg">
                <i className="fas fa-map-signs text-4xl mb-4"></i>
                <p>Conoce más sobre las rutas disponibles. ¡Son para ti!</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-green-800 text-white p-6 rounded-lg">
                <i className="fas fa-mountain text-4xl mb-4"></i>
                <p>¿Tienes experiencia? ¡Sé parte de los guías!</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-green-800 text-white px-6 py-2 rounded-md mx-2">Ver más información</button>
            <button className="bg-green-800 text-white px-6 py-2 rounded-md mx-2">Galería de fotos</button>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Bienvenido a la experiencia definitiva...</h2>
            <p className="text-gray-700 mb-4">
              Aquí, la naturaleza y la aventura se encuentran con la comodidad y la seguridad. Nuestras actividades están
              diseñadas para explorar los alrededores de Caracas y descubrir los tesoros naturales que este parque ofrece.
              Desde caminatas hasta paseos en teleférico, siempre encontrarás algo que hacer. ¡Te esperamos con los brazos
              abiertos, y estamos aquí para hacerte posible!
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
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
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
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
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import avilaImage1 from '../images/EL-AVILA-031.jpg';
import avilaImage2 from '../images/el avila 15.jpg';
import avilaImage3 from '../images/el avila 16.jpg';
import avilaImage4 from '../images/el avila 17.jpg';
import './InfoAvila.css';


const AvilaInfoPage: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans w-full ">
      <Header />
      
      <motion.section 
        className="text-center py-10 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-semibold">Descubre El Ávila:</h1>
        <p className = "text-3xl pt-3 font-bold text-black" style={{ fontFamily: "'Lucida Handwriting', cursive" }}
                > ¡🌿Aventura, naturaleza y adrenalina en un solo lugar🌿! </p>
      </motion.section>
      
      <section className="w-full px-20 grid p-0 contenedor-general">
        <motion.div 
          className="flex flex-row items-center gap-10 w-full fondo-verde seccion"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}  
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src={avilaImage1} 
            alt="El Ávila" 
            className="w-[300px] rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-white ">Un ícono de Caracas</h2>
            <p className="text-lg leading-relaxed text-white">El Parque Nacional Waraira Repano, mejor conocido como El Ávila, es un ícono natural que separa a Caracas del Mar Caribe. Con paisajes impresionantes y biodiversidad única, es el destino perfecto para los amantes del senderismo y la aventura.</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex items-center gap-10 bg-white p-6 w-full seccion "
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-black">Rutas imperdibles</h2>
            <ul className="list-disc pl-6 text-lg leading-relaxed">
              <li><strong>Pico Naiguatá:</strong> A 2765 metros sobre el mar, con vistas inigualables.</li>
              <li><strong>Sabas Nieves:</strong> Sendero ideal para principiantes y entrenamientos diarios.</li>
              <li><strong>La Julia:</strong> Un camino menos transitado para una conexión más íntima con la naturaleza.</li>
            </ul>
          </div>
          <motion.img 
            src={avilaImage2} 
            alt="Rutas" 
            className="w-[300px] rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        <motion.div 
          className="flex flex-row items-center gap-10 fondo-verde text-white p-6 w-full seccion "
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src={avilaImage3} 
            alt="Consejos" 
            className="w-[300px] rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold">Tips para excursionistas</h2>
            <ul className="list-disc pl-6 text-lg leading-relaxed">
              <li>Lleva ropa cómoda y calzado adecuado.</li>
              <li>Hidrátate bien y lleva snacks energéticos.</li>
              <li>Respeta la naturaleza, no tires basura ni tomes atajos no autorizados por el guía.</li>
              <li>Sé puntual para aprovechar al máximo la excursión.</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-row items-center gap-10 w-full seccion"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-black">Un paraíso natural</h2>
            <p className="text-lg leading-relaxed">El Ávila es hogar de una impresionante biodiversidad. Camina entre bosques de orquídeas, bromelias y helechos gigantes. En su fauna habitan distintas especies animales como el cunaguaro, los cachicamos, el rabipelado, ardillas y muchos más, pero no te preocupes: nuestras rutas están diseñadas para que estos no representen ningún peligro para ti.</p>
          </div>
          <motion.img 
            src={avilaImage4} 
            alt="Biodiversidad" 
            className="w-[300px] rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </section>
      
      <motion.div 
        className="text-center py-10 fondo-verde banner-inferior text-white text-2xl font-bold w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className = "text-3xl pt-3 font-bold text-white" style={{ fontFamily: "'Lucida Handwriting', cursive" }}
                > ¡🌿Aventura, naturaleza y adrenalina en un solo lugar🌿! </p>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default AvilaInfoPage;
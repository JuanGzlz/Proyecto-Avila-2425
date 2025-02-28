import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">¡Para más información contáctanos!</h2>
        <div className="flex flex-wrap justify-center items-center mb-6">
          <div className="w-full md:w-1/3 p-4">
            <img
              alt="Logo El Ávila Excursions"
              className="mx-auto"
              height="100"
              src=""
              width="100"
            />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <p>Caracas, Venezuela</p>
            <p>+58 414 329 3323</p>
            <p>avilaexcursions@gmail.com</p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="flex justify-center space-x-4">
              <a className="text-white text-2xl" href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="text-white text-2xl" href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="text-white text-2xl" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="text-white text-2xl" href="#">
                <i className="fab fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <p className="text-sm">
          © 2025 Ávila Excursions | Cod. Fisc. P IVA 0145632786/7 | Privacy Policy | Cookies Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
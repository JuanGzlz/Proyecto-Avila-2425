import React from 'react';
import Header from './Header';
import Footer from './Footer';


const HomePage: React.FC = () => {
        return (
          <div>
            <Header />
            <main>
              <h1>Titulo de la pagina web</h1>
              <p>Parrafo de la pagina web principal</p>
            </main>
            <Footer />
          </div>
        );
      };




export default HomePage;
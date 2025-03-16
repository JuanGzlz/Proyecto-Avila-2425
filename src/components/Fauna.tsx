import React from 'react';
import EmblaCarousel from './Carousels/EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import './Carousels/embla.css';
import './Carousels/base.css';
import Header from './Header';
import Footer from './Footer';

import fauna1 from '../images/arañamona.jpg';
import fauna2 from '../images/cerdito.jpg';
import fauna3 from '../images/cunaguaro.jpg';
import fauna4 from '../images/lagarto.jpg';
import fauna5 from '../images/pereza.jpg';
import fauna6 from '../images/Turpial_.jpg';
import fauna7 from '../images/venadomatacan.jpg';

import flora1 from '../images/flor1.jpg';
import flora2 from '../images/flor2.jpg';
import flora3 from '../images/flor3.jpg';
import flora4 from '../images/flor4.jpg';
import flora5 from '../images/flor5.jpg';
import flora6 from '../images/flor6.jpg';
import flora7 from '../images/flor7.jpg';

import montaña1 from '../images/montaña1.jpg';
import montaña2 from '../images/montaña2.jpg';
import montaña3 from '../images/montaña3.jpg';
import montaña4 from '../images/montaña4.jpg';
import montaña5 from '../images/montaña5.jpg';
import montaña6 from '../images/montaña6.jpg';
import montaña7 from '../images/montaña7.jpg';

const OPTIONS: EmblaOptionsType = { loop: true };

const SLIDES_FAUNA = [fauna1, fauna2, fauna3, fauna4, fauna5, fauna6, fauna7];
const SLIDES_FLORA = [flora1, flora2, flora3, flora4, flora5, flora6, flora7];
const SLIDES_MONTAÑA = [montaña1, montaña2, montaña3, montaña4, montaña5, montaña6, montaña7];

const Fauna: React.FC = () => {
    return (
        <div className="fauna-container">
            <Header />
            
            <section className="intro font-bold pt-8 pb-10">
                <h1 >Descubre El Ávila:</h1>
                <p className = "text-3xl pt-3 font-bold text-black" style={{ fontFamily: "'Lucida Handwriting', cursive" }}
                > ¡🌿Aventura, naturaleza y adrenalina en un solo lugar🌿! </p>
            </section>

            <section className="carousel-section bg-[#1d6363]">
                <p className = "pl-10 pt-5 pb-6 text-4xl text-left font-bold text-white" style={{ fontFamily: "'Brush Script MT', cursive" }}> Explora la maravillosa fauna... </p>
                <EmblaCarousel slides={SLIDES_FAUNA} options={OPTIONS} />
            </section>

            <section className="carousel-section">
                <p className = "pl-10 pt-5 pb-6 text-4xl text-left font-bold text-black" style={{ fontFamily: "'Brush Script MT', cursive" }}> Enamórate de la hermosa flora... </p>
                <EmblaCarousel slides={SLIDES_FLORA} options={OPTIONS} />
            </section>

            <section className="carousel-section bg-[#1d6363]">
                <p className = "pl-10 pt-5 pb-6 text-4xl text-left font-bold text-white" style={{ fontFamily: "'Brush Script MT', cursive" }}> Descubre los lugares emblemáticos de la montaña... </p>
                <EmblaCarousel slides={SLIDES_MONTAÑA} options={OPTIONS} />
            </section>

            <section className="carousel-section bg-white pt-10 pb-10">
                <p className = "text-3xl pt-3 font-bold text-black" style={{ fontFamily: "'Lucida Handwriting', cursive" }}
                > ¡🌿Reserva tu aventura con nosotros y vive el Ávila de manera segura y emocionante🌿! </p>
            </section>

            <Footer />
        </div>
    );
};

export default Fauna;

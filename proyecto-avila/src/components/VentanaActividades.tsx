import HeaderVentanas from './HeaderVentanas';
import './VentanaActividades.css';

const VentanaActividades: React.FC = () => {
    const excursiones = [
        {
            guia: "Enrique León",
            horaInicio: "8:00 am (Sábado)",
            horaFinal: "5:30 pm (Domingo)",
            fecha: "20/02/2025",
            inscritos: 4,
            limite: 10,
            campamento: "El Lagunazo",
            costo: "$35",
            imagenes: ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"],
        },
        {
            guia: "Fabiana Obelmejías",
            horaInicio: "9:00 am (Jueves)",
            horaFinal: "3:00 pm (Viernes)",
            fecha: "08/03/2025",
            inscritos: 12,
            limite: 12,
            campamento: "Los Venados",
            costo: "$20",
            imagenes: ["/img5.jpg", "/img6.jpg", "/img7.jpg", "/img8.jpg"],
        },
    ];

    return (
        <div className='page-container'>
            <HeaderVentanas />
            
            <section>
                <h2 className="info-title-white">¡Descubre todas las excursiones que tenemos disponibles!</h2>
            </section>
            
            <div className="info-buttons">
                <input
                    className="search-input"
                    placeholder="Buscar..."
                    type="text"
                />
            </div>
            
            {excursiones.map((excursion, index) => (
                <div key={index} className="excursion-card">
                    <div className="images-grid">
                        {excursion.imagenes.slice(0, 3).map((img, i) => (
                            <img key={i} src={img} alt="Excursion" className="excursion-img" />
                        ))}
                        <div className="ver-mas">Ver más...</div>
                    </div>
                    <div className="excursion-info">
                        <p><strong>Guía:</strong> {excursion.guia}</p>
                        <p><strong>Hora Inicio:</strong> {excursion.horaInicio}</p>
                        <p><strong>Hora Final:</strong> {excursion.horaFinal}</p>
                        <p><strong>Fecha:</strong> {excursion.fecha}</p>
                        <p><strong>Personas inscritas:</strong> {excursion.inscritos}</p>
                        <p><strong>Límite de personas:</strong> {excursion.limite}</p>
                        <p><strong>Campamento:</strong> {excursion.campamento}</p>
                        <p><strong>Costo de la actividad:</strong> {excursion.costo}</p>
                            <button className="anotarse">Anotarse</button>
                            <button className="detalles">Ver más detalles</button>
                        
                    </div>
                </div>
            ))}
        </div>
    );
};
export default VentanaActividades;
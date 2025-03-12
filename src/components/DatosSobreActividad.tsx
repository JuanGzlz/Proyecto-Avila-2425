import React from "react";
import HeaderVentanas from "./HeaderVentanas";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

const DatosSobreActividad: React.FC = () => {
    const navigate = useNavigate();

    const [limitePersonas, setLimitePersonas] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [guia, setGuia] = useState("");
    const [puntoEncuentro, setPuntoEncuentro] = useState("");
    const [dificultad, setDificultad] = useState("");
    const [nombreRuta, setNombreRuta] = useState("");
    const [datosExtra, setDatosExtra] = useState("");
    const [distanciaRuta, setDistanciaRuta] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const actividadData = {
            limitePersonas,
            horaInicio,
            guia,
            puntoEncuentro,
            dificultad,
            nombreRuta,
            datosExtra,
            distanciaRuta,
          };

        console.log(actividadData);

        navigate("/admin", {state : actividadData});

        }



  return (
    <div>
    <HeaderVentanas/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10 p-px">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl h-full">
        <h2 className="text-center text-xl font-semibold mb-6">Datos sobre la actividad</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit = {handleSubmit}>

          <input 
          className="border p-2 rounded-3xl min-h-24" 
          placeholder="Limite de personas" 
          value ={limitePersonas}
          onChange={(e) => setLimitePersonas(e.target.value)}
          />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Hora de inicio, hora final, tiempo de duración"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Datos sobre el guía"
              value={guia}
              onChange={(e) => setGuia(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Punto de encuentro, traslado"
              value={puntoEncuentro}
              onChange={(e) => setPuntoEncuentro(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Dificultad de la actividad"
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Nombre de la ruta o vía para llegar al destino"
              value={nombreRuta}
              onChange={(e) => setNombreRuta(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Datos extra para el excursionista"
              value={datosExtra}
              onChange={(e) => setDatosExtra(e.target.value)}
            />
            <input
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Distancia de ruta a realizar"
              value={distanciaRuta}
              onChange={(e) => setDistanciaRuta(e.target.value)}
            />
        </form>
    <button className="mt-6 w-full !bg-[#1d6363] text-white py-2 rounded-full text-lg">Crear actividad</button>
        
      </div>
    </div>
  </div>

  );
}

export default DatosSobreActividad;
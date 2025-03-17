import React, { useState } from 'react';
import './Calendario.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const meses: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const diasSemana: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

interface CalendarioProps {
  onSelectDate: (selectedDates: string[]) => void;
  markedDates: string[];
  multipleDates?: boolean;
}

const obtenerDiasDelMes = (anio: number, mes: number): number => {
  return new Date(anio, mes + 1, 0).getDate();
};

const obtenerDiaDeInicio = (anio: number, mes: number): number => {
  const dia: number = new Date(anio, mes, 1).getDay();
  return dia === 0 ? 6 : dia - 1;
};

const Calendario: React.FC<CalendarioProps> = ({ onSelectDate, markedDates, multipleDates = false }) => {
  const fechaActual: Date = new Date();
  const [mesActual, setMesActual] = useState<number>(fechaActual.getMonth());
  const [anioActual, setAnioActual] = useState<number>(fechaActual.getFullYear());
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState<string[]>([]);

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAnio = anioActual;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAnio -= 1;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAnio += 1;
    }

    setMesActual(nuevoMes);
    setAnioActual(nuevoAnio);
  };

  const toggleDiaSeleccionado = (dia: number) => {
    const fechaString = new Date(anioActual, mesActual, dia).toISOString().split("T")[0];

    if (!markedDates.includes(fechaString)) {
      return; // No permitir la selección de fechas no disponibles
    }

    if (!multipleDates) {
        setFechasSeleccionadas([fechaString]);
        onSelectDate([fechaString]);
        return;
    }

    let nuevasFechasSeleccionadas = [...fechasSeleccionadas];

    if (nuevasFechasSeleccionadas.includes(fechaString)) {
      nuevasFechasSeleccionadas = nuevasFechasSeleccionadas.filter(fecha => fecha !== fechaString);
    } else {
      nuevasFechasSeleccionadas.push(fechaString);
    }

    setFechasSeleccionadas(nuevasFechasSeleccionadas);
    onSelectDate(nuevasFechasSeleccionadas);
  };

  const esDiaMarcado = (dia: number): boolean => {
    const fechaString = new Date(anioActual, mesActual, dia).toISOString().split("T")[0];
    return markedDates.includes(fechaString);
  };

  const esDiaSeleccionado = (dia: number): boolean => {
    const fechaString = new Date(anioActual, mesActual, dia).toISOString().split("T")[0];
    return fechasSeleccionadas.includes(fechaString);
  };

  const totalDias: number = obtenerDiasDelMes(anioActual, mesActual);
  const diaInicio: number = obtenerDiaDeInicio(anioActual, mesActual);
  const dias: (number | null)[] = Array(diaInicio).fill(null).concat(Array.from({ length: totalDias }, (_, i) => i + 1));

  return (
    <div className="contenedorCalendario border-1 border-black shadow-2xl rounded-xl mb-6">
      <div className="encabezado">
        <button className="flecha" onClick={() => cambiarMes(-1)}>
          <FaChevronLeft />
        </button>
        <div className="mesAnio">
          {meses[mesActual]} {anioActual}
        </div>
        <button className="flecha" onClick={() => cambiarMes(1)}>
          <FaChevronRight />
        </button>
      </div>

      <div className="semana">
        {diasSemana.map((dia) => (
          <div key={dia} className="diaSemana">
            {dia}
          </div>
        ))}
      </div>

      <div className="dias font-bold">
        {dias.map((dia, index) => (
          dia === null ? (
            <div key={index} className="dia"></div>
          ) : (
            <div
              key={index}
              className={`dia ${esDiaMarcado(dia) ? 'marcado' : ''} ${esDiaSeleccionado(dia) ? 'seleccionado' : ''}`}
              onClick={() => toggleDiaSeleccionado(dia)}
            >
              {dia}
            </div>
          )
        ))}
      </div>

        <div className="footer !bg-[#163f33] rounded-lg flex justify-center items-center shadow-lg border-2 border-gray-300">
        {fechasSeleccionadas.length > 0 && (
            <div className="seleccionTexto ml-3 !text-white text-center font-bold flex flex-col justify-center items-center">
            <p className="text-lg">Fechas Seleccionadas</p>
            <div className="grid grid-cols-4 gap-2 mt-2 text-xs font-normal">
                {fechasSeleccionadas.map((fecha, index) => (
                <div key={index} className="bg-white text-black p-2 rounded-lg text-center">
                    {fecha}
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    </div>
  );
};

export default Calendario;
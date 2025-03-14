import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import VentanaActividades from './components/VentanaActividades';
import Perfil from './components/Perfil';
import CrearActividad from './components/CrearActividad';
import DatosSobreActividad from './components/DatosSobreActividad';
import Admin from './components/Admin';
import DetallesExcursionSeleccionada from './components/DetallesExcursionSeleccionada';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ventana-actividades" element={<VentanaActividades />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crear-actividad" element={<CrearActividad />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/datos-sobre-actividad" element={<DatosSobreActividad />} />
          <Route path="/detalles-excursion-seleccionada/:id" element={<DetallesExcursionSeleccionada />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

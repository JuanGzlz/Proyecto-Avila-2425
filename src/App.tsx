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
import FiltroBusqueda from './components/FiltroBusqueda';
import ForoDetallado from './components/ForoDetallado';
import Foro from './components/Foro';
import CrearForo from './components/CrearForo';
import Fauna from './components/Fauna';

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
          <Route path="/filtro-busqueda" element={<FiltroBusqueda />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/foro/:id" element={<ForoDetallado />} />
          <Route path="/crear-foro" element={<CrearForo />} />
          <Route path="/fauna" element={<Fauna />} />


          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

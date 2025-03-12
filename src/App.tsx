import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import VentanaActividades from './components/VentanaActividades';
import Perfil from './components/Perfil';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

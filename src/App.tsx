import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import RegistroProfesional from './pages/RegistroProfesional';
import Servicios from './pages/Servicios'; // 1. Importamos la nueva página

// Una vista rápida para el Home momentáneo
function Home() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
        Bienvenido a Gran Servicio
      </h1>
      <p className="text-lg text-slate-600 max-w-md">
        La plataforma de Córdoba para conectar con los mejores profesionales independientes de tu zona.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/unirse" element={<RegistroProfesional />} />
          {/* 2. Registramos la nueva ruta de servicios */}
          <Route path="/servicios" element={<Servicios />} /> 
        </Routes>
      </div>
    </Router>
  );
}
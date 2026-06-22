import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white h-[72px] px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Logo que te lleva al Home */}
      <Link to="/" className="text-xl font-bold text-blue-500 tracking-tight hover:opacity-90 transition-opacity">
        Gran Servicio
      </Link>

      {/* Enlaces centrales */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-400 transition-colors">Inicio</Link>
        <Link to="/servicios" className="hover:text-blue-400 transition-colors">Servicios</Link>
        {/* Cambiamos el enlace para unirse como trabajador a nuestra ruta real */}
        <Link to="/unirse" className="hover:text-blue-400 transition-colors">Profesionales</Link>
      </div>

      {/* Botón de Iniciar Sesión */}
      <div>
        <Link 
          to="/login" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-xs transition-all"
        >
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
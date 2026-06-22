import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Conexión a tu base de datos

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  
  // Estados para manejar respuestas visuales
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      if (isRegister) {
        // ---- REGISTRO REAL EN SUPABASE ----
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Guardamos el nombre adentro de los metadatos del usuario
            data: {
              full_name: nombre,
            }
          }
        });

        if (error) throw error;
        
        setMensaje({ 
          tipo: 'exito', 
          texto: '¡Registro exitoso! Revisá tu correo electrónico para confirmar la cuenta.' 
        });
      } else {
        // ---- INICIO DE SESIÓN REAL EN SUPABASE ----
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        setMensaje({ 
          tipo: 'exito', 
          texto: `¡Bienvenido de nuevo! Iniciaste sesión como ${data.user?.email}` 
        });
      }
    } catch (error: any) {
      setMensaje({ 
        tipo: 'error', 
        texto: error.message || 'Ocurrió un error inesperado.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-100">
        
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isRegister ? 'Crear Cuenta' : '¡Hola de nuevo!'}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {isRegister 
              ? 'Registrate para empezar a ofrecer o buscar servicios.' 
              : 'Ingresá tus credenciales para acceder a Gran Servicio.'}
          </p>
        </div>

        {/* Alertas de Mensajes */}
        {mensaje && (
          <div className={`p-3 rounded-lg text-sm font-medium mb-4 text-center ${
            mensaje.tipo === 'exito' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {mensaje.texto}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer text-sm flex items-center justify-center"
          >
            {loading ? 'Procesando...' : isRegister ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        {/* Selector de modo */}
        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">
            {isRegister ? '¿Ya tenés una cuenta?' : '¿No tenés cuenta todavía?'}
            <button 
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setMensaje(null);
              }} 
              className="text-blue-600 font-semibold hover:underline ml-1 cursor-pointer"
            >
              {isRegister ? 'Iniciá Sesión' : 'Registrate gratis'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
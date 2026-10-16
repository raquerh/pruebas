import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Panel: hay que haber iniciado sesión. Mientras se verifica el token con el servidor no se muestra nada.
export function SoloAutenticados() {
  const { autenticado, cargando } = useAuth();
  if (cargando) return null;
  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

// Eventos, contenido y usuarios: solo el perfil Administrador. Bedelía vuelve al inicio del panel.
// El servidor también valida el rol en cada ruta de la API.
export function SoloAdministrador() {
  const { esAdmin } = useAuth();
  return esAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}

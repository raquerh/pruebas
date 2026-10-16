import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Panel: hay que haber iniciado sesión.
export function SoloAutenticados() {
  const { autenticado } = useAuth();
  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

// Eventos, contenido y usuarios: solo el perfil Administrador. Bedelía vuelve al inicio del panel.
export function SoloAdministrador() {
  const { esAdmin } = useAuth();
  return esAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}

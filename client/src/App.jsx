import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollManager from "./components/ScrollManager.jsx";
import { SoloAdministrador, SoloAutenticados } from "./components/RutasProtegidas.jsx";
import Inicio from "./pages/Inicio.jsx";
import Carrera from "./pages/Carrera.jsx";
import Ingreso from "./pages/Ingreso.jsx";
import Alumnos from "./pages/Alumnos.jsx";
import Eventos from "./pages/Eventos.jsx";
import Evento from "./pages/Evento.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import AdminInicio from "./pages/AdminInicio.jsx";
import AdminAcademica from "./pages/AdminAcademica.jsx";
import AdminEventos from "./pages/AdminEventos.jsx";
import AdminEventoNuevo from "./pages/AdminEventoNuevo.jsx";
import AdminContenido from "./pages/AdminContenido.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/carrera" element={<Carrera />} />
          <Route path="/ingreso" element={<Ingreso />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/evento" element={<Evento />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<SoloAutenticados />}>
          <Route path="/admin" element={<AdminInicio />} />
          <Route path="/admin-academica" element={<AdminAcademica />} />
          <Route element={<SoloAdministrador />}>
            <Route path="/admin-eventos" element={<AdminEventos />} />
            <Route path="/admin-evento-nuevo" element={<AdminEventoNuevo />} />
            <Route path="/admin-contenido" element={<AdminContenido />} />
            <Route path="/admin-usuarios" element={<AdminUsuarios />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

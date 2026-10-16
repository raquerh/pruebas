import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminInicio() {
  const { esAdmin, usuario } = useAuth();

  return (
    <div className="admin activa">
      <AdminLateral />
      <main className="contenido-admin">
        <div className="barra-admin">
          <span className="usuario">
            <span className="avatar">{usuario.iniciales}</span>
            {usuario.nombre}
          </span>
        </div>
        <div className="cab-admin">
          <div>
            <h1 id="saludo-admin">Hola, {usuario.saludo}</h1>
            <p>¿Qué querés actualizar hoy?</p>
          </div>
        </div>
        <div className="atajos">
          {esAdmin && (
            <Link className="atajo at-1" to="/admin-evento-nuevo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <div>
                <strong>Cargar un evento</strong>
                <br />
                <span>Fotos, fecha y descripción</span>
              </div>
            </Link>
          )}
          <Link className="atajo at-2" to="/admin-academica">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <div>
              <strong>Publicar horarios o mesas</strong>
              <br />
              <span>El período anterior pasa al archivo</span>
            </div>
          </Link>
          {esAdmin && (
            <Link className="atajo at-3" to="/admin-contenido">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 20h4L19 9l-4-4L4 16z" />
              </svg>
              <div>
                <strong>Editar contenido</strong>
                <br />
                <span>Plan, autoridades, enlaces</span>
              </div>
            </Link>
          )}
        </div>
        <div className="resumen">
          {esAdmin && (
            <div className="dato">
              <span>Eventos visibles</span>
              <strong>3</strong>
            </div>
          )}
          {esAdmin && (
            <Link className="dato" to="/admin-eventos" style={{ textDecoration: "none" }}>
              <span>Publicaciones de Instagram para revisar</span>
              <strong>1</strong>
            </Link>
          )}
          <div className="dato">
            <span>Período académico vigente</span>
            <strong style={{ fontSize: "22px" }}>2.° cuatrimestre 2026</strong>
          </div>
        </div>
        <div className="caja">
          <h2>Últimos cambios</h2>
          <ul className="actividad">
            <li>
              <span>
                Se publicó el evento <strong>Mateada Patria</strong> desde Instagram
              </span>
              <time>Hace 2 días</time>
            </li>
            <li>
              <span>Se publicaron los horarios del 2.° cuatrimestre 2026</span>
              <time>10 de agosto</time>
            </li>
            <li>
              <span>Los horarios del 1.° cuatrimestre pasaron al archivo</span>
              <time>10 de agosto</time>
            </li>
            <li>
              <span>
                Se actualizó la sección <strong>Autoridades</strong>
              </span>
              <time>2 de agosto</time>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

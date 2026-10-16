import { useState } from "react";
import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminEventoNuevo() {
  const [ok, setOk] = useState({});
  const { usuario } = useAuth();

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
            <h1>Cargar un evento</h1>
            <p>Completá los datos del evento para publicarlo en la galería.</p>
          </div>
        </div>
        <form
          className="form-admin"
          onSubmit={(e) => {
            e.preventDefault();
            setOk((o) => ({ ...o, "ok-evento": true }));
          }}
        >
          <div className="caja">
            <div className="campo">
              <label htmlFor="e-tit">Título del evento</label>
              <input id="e-tit" defaultValue="Jornada de Gastronomía 2026" />
            </div>
            <div className="fila">
              <div className="campo">
                <label htmlFor="e-fecha">Fecha</label>
                <input id="e-fecha" type="date" defaultValue="2026-10-16" />
              </div>
              <div className="campo">
                <label htmlFor="e-video">Video (opcional)</label>
                <input id="e-video" placeholder="Enlace al video en Instagram" />
                <span className="ayuda">Pegá el enlace a la publicación de Instagram.</span>
              </div>
            </div>
            <div className="campo">
              <label htmlFor="e-desc">Descripción</label>
              <textarea
                id="e-desc"
                defaultValue="Jornada abierta con elaboraciones de los estudiantes de los tres años."
              />
            </div>
            <div className="campo">
              <span style={{ fontWeight: "700" }}>Fotos</span>
              <div className="zona-fotos">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
                </svg>
                <strong>Arrastrá las fotos acá o hacé clic para elegirlas</strong>
                <span>Hasta 20 fotos por evento, en JPG o PNG.</span>
              </div>
              <div className="previas">
                <img src={IMGS.PLATO} alt="Foto cargada 1" />
                <img src={IMGS.VERDURAS} alt="Foto cargada 2" />
                <img src={IMGS.MORRON} alt="Foto cargada 3" />
                <img src={IMGS.ESTUDIO} alt="Foto cargada 4" />
              </div>
            </div>
          </div>
          <div className="caja">
            <h2>Publicación</h2>
            <label className="interruptor">
              <input type="checkbox" defaultChecked /> Visible en el sitio
            </label>
            <p style={{ color: "var(--suave)", fontSize: "15px", margin: "14px 0 20px" }}>
              Al terminar el año pasa a "Años anteriores".
            </p>
            <button className="boton boton-verde" type="submit" style={{ width: "100%" }}>
              Publicar evento
            </button>
            <Link
              className="boton boton-linea"
              to="/admin-eventos"
              style={{ width: "100%", marginTop: "12px" }}
            >
              Cancelar
            </Link>
            <p
              id="ok-evento"
              role="status"
              className={"aviso" + (ok["ok-evento"] ? " visible" : "")}
            >
              Evento publicado en la galería.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

const PERIODOS = {
  "Por año": ["2025", "2026"],
  "Por cuatrimestre": ["1.° cuatrimestre 2026", "2.° cuatrimestre 2025", "1.° cuatrimestre 2025"],
  "Un evento": ["Noche de los Museos"],
};

export default function AdminEventos() {
  const { esAdmin, usuario } = useAuth();

  const [alcance, setAlcance] = useState("Por año");
  const [periodo, setPeriodo] = useState(PERIODOS["Por año"][0]);
  const [msg, setMsg] = useState("");

  const cambiarAlcance = (valor) => {
    setAlcance(valor);
    setPeriodo(PERIODOS[valor][0]);
  };
  const descargar = () =>
    setMsg("Se preparó la descarga: " + alcance.toLowerCase() + ", " + periodo + ".");

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
            <h1>Eventos</h1>
            <p>Eventos cargados desde el panel y publicaciones recibidas desde Instagram.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link className="boton boton-verde" to="/admin-evento-nuevo">
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
              Cargar evento
            </Link>
          </div>
        </div>
        <div
          className="caja"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span className="icono ic-naranja">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </span>
            <div>
              <strong>Instagram conectado: @ifts_2_ok</strong>
              <p style={{ color: "var(--suave)", fontSize: "15px" }}>
                Se incorporan las publicaciones con #IFTSEventos. Revisión diaria; la última fue hoy
                a las 6:00.
              </p>
            </div>
          </div>
          <span className="etiqueta et-verde">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Funcionando
          </span>
        </div>
        {esAdmin && (
          <div className="caja descarga-archivo">
            <div>
              <strong>Descargar lo archivado</strong>
              <p style={{ color: "var(--suave)", fontSize: "15px" }}>
                Guardá una copia de los eventos archivados en tu computadora para llevarla a un
                Drive o a un disco externo.
              </p>
            </div>
            <div className="descarga-controles">
              <label htmlFor="d-alcance" className="solo-lectores">
                Qué descargar
              </label>
              <select
                id="d-alcance"
                value={alcance}
                onChange={(e) => cambiarAlcance(e.target.value)}
              >
                <option>Por año</option>
                <option>Por cuatrimestre</option>
                <option>Un evento</option>
              </select>
              <select
                id="d-periodo"
                aria-label="Período"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                {PERIODOS[alcance].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <button
                className="boton boton-verde boton-chico"
                type="button"
                id="d-boton"
                onClick={descargar}
              >
                Descargar
              </button>
            </div>
            <p className={"aviso" + (msg ? " visible" : "")} id="ok-descarga" role="status">
              {msg}
            </p>
          </div>
        )}
        <div className="pestanas">
          <button aria-selected="true">Todos (5)</button>
          <button aria-selected="false">Para revisar (1)</button>
          <button aria-selected="false">Visibles (3)</button>
          <button aria-selected="false">Ocultos (0)</button>
          <button aria-selected="false">Archivados (1)</button>
        </div>
        <div className="tabla-caja">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Evento</th>
                <th>Origen</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img className="miniatura" src={IMGS.MORRON} alt="" />
                </td>
                <td>
                  <strong>Clase de pastelería básica</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Septiembre 2026, 3 fotos
                  </span>
                </td>
                <td>
                  <span className="etiqueta et-naranja">Instagram</span>
                </td>
                <td>
                  <span className="etiqueta et-naranja">Para revisar</span>
                </td>
                <td>
                  <div className="acciones-fila">
                    <button className="boton boton-verde boton-chico" type="button">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Aprobar
                    </button>
                    <button className="boton boton-linea boton-chico" type="button">
                      Descartar
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="miniatura" src={IMGS.PLATO} alt="" />
                </td>
                <td>
                  <strong>Mateada Patria</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Mayo 2026, 6 fotos
                  </span>
                </td>
                <td>
                  <span className="etiqueta et-naranja">Instagram</span>
                </td>
                <td>
                  <span className="etiqueta et-verde">Visible</span>
                </td>
                <td>
                  <div className="acciones-fila">
                    <Link className="boton boton-linea boton-chico" to="/admin-evento-nuevo">
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
                      Editar
                    </Link>
                    <button className="boton boton-linea boton-chico" type="button">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Ocultar
                    </button>
                    <button
                      className="boton boton-linea boton-chico"
                      type="button"
                      aria-label="Eliminar Mateada Patria"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="miniatura" src={IMGS.MORRON} alt="" />
                </td>
                <td>
                  <strong>Jornada de Gastronomía</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Junio 2026, 8 fotos
                  </span>
                </td>
                <td>
                  <span className="etiqueta et-gris">Manual</span>
                </td>
                <td>
                  <span className="etiqueta et-verde">Visible</span>
                </td>
                <td>
                  <div className="acciones-fila">
                    <Link className="boton boton-linea boton-chico" to="/admin-evento-nuevo">
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
                      Editar
                    </Link>
                    <button className="boton boton-linea boton-chico" type="button">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Ocultar
                    </button>
                    <button
                      className="boton boton-linea boton-chico"
                      type="button"
                      aria-label="Eliminar Jornada de Gastronomía"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="miniatura" src={IMGS.ESTUDIO} alt="" />
                </td>
                <td>
                  <strong>Noche de los Museos</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Noviembre 2025, 5 fotos
                  </span>
                </td>
                <td>
                  <span className="etiqueta et-naranja">Instagram</span>
                </td>
                <td>
                  <span className="etiqueta et-gris">Archivado</span>
                </td>
                <td>
                  <div className="acciones-fila">
                    <button
                      className="boton boton-linea boton-chico"
                      type="button"
                      aria-label="Descargar Noche de los Museos"
                      onClick={() =>
                        setMsg("Se preparó la descarga del evento Noche de los Museos.")
                      }
                    >
                      Descargar
                    </button>
                    <Link className="boton boton-linea boton-chico" to="/admin-evento-nuevo">
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
                      Editar
                    </Link>
                    <button className="boton boton-linea boton-chico" type="button">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Ocultar
                    </button>
                    <button
                      className="boton boton-linea boton-chico"
                      type="button"
                      aria-label="Eliminar Noche de los Museos"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="miniatura" src={IMGS.VERDURAS} alt="" />
                </td>
                <td>
                  <strong>Cierre del 1.° cuatrimestre</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Julio 2026, 4 fotos
                  </span>
                </td>
                <td>
                  <span className="etiqueta et-gris">Manual</span>
                </td>
                <td>
                  <span className="etiqueta et-verde">Visible</span>
                </td>
                <td>
                  <div className="acciones-fila">
                    <Link className="boton boton-linea boton-chico" to="/admin-evento-nuevo">
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
                      Editar
                    </Link>
                    <button className="boton boton-linea boton-chico" type="button">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Ocultar
                    </button>
                    <button
                      className="boton boton-linea boton-chico"
                      type="button"
                      aria-label="Eliminar Cierre del 1.° cuatrimestre"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminContenido() {
  const [ok, setOk] = useState({});
  const { usuario } = useAuth();
  const [panel, setPanel] = useState("autoridades");

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
            <h1>Contenido institucional</h1>
            <p>Carrera, plan de estudios, autoridades, datos de contacto y enlaces útiles.</p>
          </div>
        </div>
        <div className="form-admin form-contenido">
          <ul className="secciones-lista">
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Perfil del egresado</strong>
                  <small>Actualizado el 2 de agosto</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Plan de estudios</strong>
                  <small>Actualizado en marzo</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Correlatividades</strong>
                  <small>Actualizado en marzo</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="true">
                <span>
                  <strong>Autoridades</strong>
                  <small>Actualizado el 2 de agosto</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Tutoría</strong>
                  <small>Actualizado en abril</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button">
                <span>
                  <strong>Ingreso y preingreso</strong>
                  <small>Actualizado en marzo</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Datos de contacto</strong>
                  <small>Actualizado en marzo</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed="false">
                <span>
                  <strong>Enlaces útiles</strong>
                  <small>Actualizado en marzo</small>
                </span>
                <span className="flecha">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
          <form
            className="caja panel-cont"
            hidden={panel !== "autoridades"}
            onSubmit={(e) => {
              e.preventDefault();
              setOk((o) => ({ ...o, "ok-cont": true }));
            }}
          >
            <h2>Autoridades</h2>
            <div className="fila">
              <div className="campo">
                <label htmlFor="s-n1">Nombre</label>
                <input id="s-n1" defaultValue="Cecilia C. Dipiazza" />
              </div>
              <div className="campo">
                <label htmlFor="s-c1">Cargo</label>
                <input id="s-c1" defaultValue="Rectora" />
              </div>
            </div>
            <div className="fila">
              <div className="campo">
                <label htmlFor="s-n2">Nombre</label>
                <input id="s-n2" defaultValue="Prof. Julia Sboro" />
              </div>
              <div className="campo">
                <label htmlFor="s-c2">Cargo</label>
                <input id="s-c2" defaultValue="Tutora institucional" />
              </div>
            </div>
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
                <path d="M12 5v14M5 12h14" />
              </svg>
              Agregar persona
            </button>
            <div className="acciones">
              <button className="boton boton-verde" type="submit">
                Guardar cambios
              </button>
              <Link className="enlace" to="/carrera">
                Ver cómo queda en el sitio
              </Link>
            </div>
            <p id="ok-cont" role="status" className={"aviso" + (ok["ok-cont"] ? " visible" : "")}>
              Cambios guardados.
            </p>
          </form>
          <form
            className="caja panel-cont"
            hidden={panel !== "ingreso"}
            onSubmit={(e) => {
              e.preventDefault();
              setOk((o) => ({ ...o, "ok-ing": true }));
            }}
          >
            <h2>Ingreso y preingreso</h2>
            <div className="campo">
              <label htmlFor="g-req">Requisito de ingreso</label>
              <input id="g-req" defaultValue="Secundario completo" />
            </div>
            <div className="fila">
              <div className="campo">
                <label htmlFor="g-pre">Enlace a la preinscripción</label>
                <input
                  id="g-pre"
                  defaultValue="guarani-autogestionagencia.bue.edu.ar/preinscripcion"
                />
              </div>
              <div className="campo">
                <label htmlFor="g-mail">Correo de consultas del preingreso</label>
                <input id="g-mail" defaultValue="preingreso.ifts@bue.edu.ar" />
              </div>
            </div>
            <div className="campo">
              <span style={{ fontWeight: "700" }}>Material de preingreso</span>
              <div className="archivo-actual">
                <strong>Guía de preingreso a Técnica Superior</strong>
                <span>PDF, 6 páginas</span>
              </div>
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
                <strong>Subí la guía nueva en PDF</strong>
                <span>Si la recibís en PowerPoint, exportala como PDF.</span>
              </div>
            </div>
            <div className="campo">
              <label htmlFor="g-faq">Preguntas frecuentes</label>
              <textarea
                id="g-faq"
                defaultValue="¿Qué necesito para inscribirme?
¿Puedo anotarme en más de una carrera?
¿Cómo entro al curso de preparación?
¿Qué se evalúa en los exámenes?
¿Cómo se asignan las vacantes?"
              />
              <span className="ayuda">
                Una pregunta por línea. Las respuestas se editan al abrir cada una.
              </span>
            </div>
            <div className="acciones">
              <button className="boton boton-verde" type="submit">
                Guardar cambios
              </button>
              <Link className="enlace" to="/ingreso">
                Ver cómo queda en el sitio
              </Link>
            </div>
            <p id="ok-ing" role="status" className={"aviso" + (ok["ok-ing"] ? " visible" : "")}>
              Cambios guardados.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

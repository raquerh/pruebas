import { useState } from "react";
import { anio } from "../utils";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminAcademica() {
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
            <h1>Información académica</h1>
            <p>
              Horarios, mesas de examen, inscripciones y calendario de ingreso del período vigente.
            </p>
          </div>
        </div>
        <div className="form-admin">
          <form
            className="caja"
            onSubmit={(e) => {
              e.preventDefault();
              setOk((o) => ({ ...o, "ok-acad": true }));
            }}
          >
            <h2>Publicar información nueva</h2>
            <div className="fila">
              <div className="campo">
                <label htmlFor="a-tipo">Tipo</label>
                <select id="a-tipo">
                  <option>Horarios de cursada</option>
                  <option>Mesas de examen</option>
                  <option>Inscripciones a materias y mesas</option>
                </select>
              </div>
              <div className="campo">
                <label htmlFor="a-per">Período</label>
                <select id="a-per">
                  <option>1.° cuatrimestre 2027</option>
                  <option>2.° cuatrimestre 2026</option>
                </select>
              </div>
            </div>
            <div className="campo">
              <span style={{ fontWeight: "700" }}>Archivo</span>
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
                <strong>Subí la planilla o el PDF</strong>
                <span>Excel o PDF</span>
              </div>
            </div>
            <button className="boton boton-verde" type="submit">
              Publicar como vigente
            </button>
            <p id="ok-acad" role="status" className={"aviso" + (ok["ok-acad"] ? " visible" : "")}>
              Información publicada. El período anterior pasó al archivo.
            </p>
          </form>
          <div className="caja">
            <h2>Vigente ahora</h2>
            <ul className="actividad">
              <li>
                <span>
                  <strong>Horarios</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    2.° cuatrimestre 2026
                  </span>
                </span>
                <span className="etiqueta et-verde">Vigente</span>
              </li>
              <li>
                <span>
                  <strong>Mesas de examen</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Turno noviembre-diciembre 2026
                  </span>
                </span>
                <span className="etiqueta et-verde">Vigente</span>
              </li>
              <li>
                <span>
                  <strong>Calendario de ingreso</strong>
                  <br />
                  <span style={{ color: "var(--suave)", fontSize: "14px" }}>
                    Ingreso <span>{anio(0)}</span>
                  </span>
                </span>
                <span className="etiqueta et-verde">Vigente</span>
              </li>
            </ul>
            <h2 style={{ marginTop: "24px" }}>Archivo</h2>
            <ul className="actividad">
              <li>
                <span>
                  Calendario de ingreso <span>{anio(-1)}</span>
                </span>
                <span className="etiqueta et-gris">Archivado</span>
              </li>
              <li>
                <span>Horarios 1.° cuatrimestre 2026</span>
                <span className="etiqueta et-gris">Archivado</span>
              </li>
              <li>
                <span>Mesas julio-agosto 2026</span>
                <span className="etiqueta et-gris">Archivado</span>
              </li>
              <li>
                <span>Horarios 2.° cuatrimestre 2025</span>
                <span className="etiqueta et-gris">Archivado</span>
              </li>
            </ul>
          </div>
        </div>
        <form
          className="caja calendario"
          onSubmit={(e) => {
            e.preventDefault();
            setOk((o) => ({ ...o, "ok-cal": true }));
          }}
        >
          <h2>Calendario de ingreso</h2>
          <div className="fila">
            <div className="campo">
              <label htmlFor="c-ciclo">Ciclo lectivo</label>
              <input id="c-ciclo" defaultValue={anio(0)} />
              <span className="ayuda">Se completa con el año del próximo ingreso.</span>
            </div>
            <div className="campo">
              <label htmlFor="c-fuente">Fuente de las fechas</label>
              <input id="c-fuente" defaultValue="Agencia de Habilidades para el Futuro" />
            </div>
          </div>
          <div className="tabla-caja">
            <table>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Preinscripción</td>
                  <td>
                    <input defaultValue="6/11" aria-label="Desde" />
                  </td>
                  <td>
                    <input defaultValue="5/3" aria-label="Hasta" />
                  </td>
                </tr>
                <tr>
                  <td>Curso de preparación</td>
                  <td>
                    <input defaultValue="6/11" aria-label="Desde" />
                  </td>
                  <td>
                    <input defaultValue="7/3" aria-label="Hasta" />
                  </td>
                </tr>
                <tr>
                  <td>Exámenes obligatorios</td>
                  <td>
                    <input defaultValue="3/2" aria-label="Desde" />
                  </td>
                  <td>
                    <input defaultValue="7/3" aria-label="Hasta" />
                  </td>
                </tr>
                <tr>
                  <td>Confirmación de vacante</td>
                  <td>
                    <input defaultValue="12/3" aria-label="Desde" />
                  </td>
                  <td>
                    <input defaultValue="" aria-label="Hasta" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="acciones">
            <button className="boton boton-verde" type="submit">
              Publicar calendario
            </button>
          </div>
          <p id="ok-cal" role="status" className={"aviso" + (ok["ok-cal"] ? " visible" : "")}>
            Calendario publicado. El del año anterior pasó al archivo.
          </p>
        </form>
      </main>
    </div>
  );
}

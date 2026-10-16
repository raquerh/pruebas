import { useState } from "react";
import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";
import { anio } from "../utils";

export default function Alumnos() {
  const [tabAlu, setTabAlu] = useState("h1");

  return (
    <div className="pagina activa">
      <section className="banner velo-suave" style={{ "--foto": `url(${IMGS.B_ALUMNOS})` }}>
        <div className="contenedor">
          <h1>Alumnos</h1>
          <span className="raya" aria-hidden="true" />
          <p>Horarios de cursada, mesas de examen y plataformas del instituto.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <div className="vigente">
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
              Vigente
            </span>
            <strong>2.° cuatrimestre 2026</strong>
            <span style={{ color: "var(--suave)" }}>Actualizado el 10 de agosto de 2026</span>
          </div>
          <div className="pestanas" role="tablist">
            <button role="tab" aria-selected={tabAlu === "h1"} onClick={() => setTabAlu("h1")}>
              Horarios 1.° año
            </button>
            <button role="tab" aria-selected={tabAlu === "h2"} onClick={() => setTabAlu("h2")}>
              Horarios 2.° año
            </button>
            <button role="tab" aria-selected={tabAlu === "h3"} onClick={() => setTabAlu("h3")}>
              Horarios 3.° año
            </button>
            <button role="tab" aria-selected={tabAlu === "m1"} onClick={() => setTabAlu("m1")}>
              Mesas de examen
            </button>
            <button role="tab" aria-selected={tabAlu === "i1"} onClick={() => setTabAlu("i1")}>
              Inscripciones
            </button>
          </div>
          <div id="h1" className={"panel-tab" + (tabAlu === "h1" ? " activa" : "")}>
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Día (18 a 22 h)</th>
                    <th>Materia</th>
                    <th>Aula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lunes</td>
                    <td>Introducción a la Gastronomía</td>
                    <td>Aula 2</td>
                  </tr>
                  <tr>
                    <td>Martes</td>
                    <td>Elaboraciones a base de vegetales, cereales y huevos</td>
                    <td>Cocina 1</td>
                  </tr>
                  <tr>
                    <td>Miércoles</td>
                    <td>Principios de Economía</td>
                    <td>Aula 2</td>
                  </tr>
                  <tr>
                    <td>Jueves</td>
                    <td>Seguridad e higiene en la Gastronomía</td>
                    <td>Aula 3</td>
                  </tr>
                  <tr>
                    <td>Viernes</td>
                    <td>Industria de la hospitalidad</td>
                    <td>Aula 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="h2" className={"panel-tab" + (tabAlu === "h2" ? " activa" : "")}>
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Día (18 a 22 h)</th>
                    <th>Materia</th>
                    <th>Aula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lunes</td>
                    <td>Elaboraciones a base de carnes</td>
                    <td>Cocina 1</td>
                  </tr>
                  <tr>
                    <td>Martes</td>
                    <td>Elementos de Administración y Contabilidad</td>
                    <td>Aula 4</td>
                  </tr>
                  <tr>
                    <td>Miércoles</td>
                    <td>Pastelería básica</td>
                    <td>Cocina 2</td>
                  </tr>
                  <tr>
                    <td>Jueves</td>
                    <td>Comercialización</td>
                    <td>Aula 3</td>
                  </tr>
                  <tr>
                    <td>Viernes</td>
                    <td>Elaboraciones de buffet</td>
                    <td>Cocina 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="h3" className={"panel-tab" + (tabAlu === "h3" ? " activa" : "")}>
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Día (18 a 22 h)</th>
                    <th>Materia</th>
                    <th>Aula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lunes</td>
                    <td>Organización de eventos gastronómicos</td>
                    <td>Aula 4</td>
                  </tr>
                  <tr>
                    <td>Martes</td>
                    <td>Servicios de catering</td>
                    <td>Cocina 2</td>
                  </tr>
                  <tr>
                    <td>Miércoles</td>
                    <td>Recursos humanos</td>
                    <td>Aula 3</td>
                  </tr>
                  <tr>
                    <td>Jueves</td>
                    <td>Práctica Profesional 3</td>
                    <td>Cocina 1</td>
                  </tr>
                  <tr>
                    <td>Viernes</td>
                    <td>Inglés técnico</td>
                    <td>Aula 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="m1" className={"panel-tab" + (tabAlu === "m1" ? " activa" : "")}>
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Introducción a la Gastronomía</td>
                    <td>Lunes 30 de noviembre</td>
                    <td>18 h</td>
                  </tr>
                  <tr>
                    <td>Principios de Economía</td>
                    <td>Martes 1 de diciembre</td>
                    <td>18 h</td>
                  </tr>
                  <tr>
                    <td>Elaboraciones a base de carnes</td>
                    <td>Miércoles 2 de diciembre</td>
                    <td>18 h</td>
                  </tr>
                  <tr>
                    <td>Comercialización</td>
                    <td>Jueves 3 de diciembre</td>
                    <td>19 h</td>
                  </tr>
                  <tr>
                    <td>Organización de eventos gastronómicos</td>
                    <td>Viernes 4 de diciembre</td>
                    <td>18 h</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="i1" className={"panel-tab" + (tabAlu === "i1" ? " activa" : "")}>
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Trámite</th>
                    <th>Fechas</th>
                    <th>Dónde</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Inscripción a mesas del turno noviembre-diciembre</td>
                    <td>Del 16 al 20 de noviembre</td>
                    <td>SIU Guaraní</td>
                  </tr>
                  <tr>
                    <td>
                      Inscripción a materias del 1.° cuatrimestre <span>{anio(0)}</span>
                    </td>
                    <td>
                      Marzo de <span>{anio(0)}</span> (a confirmar)
                    </td>
                    <td>SIU Guaraní</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="acciones">
            <Link className="boton boton-linea" to="/alumnos">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <path d="M14 3v6h6M8 13h8M8 17h5" />
              </svg>
              Descargar horarios (PDF)
            </Link>
          </div>
        </div>
      </section>
      <section className="seccion seccion-alt">
        <div className="contenedor">
          <div className="cabecera">
            <h2>Enlaces útiles</h2>
            <span className="raya" aria-hidden="true" />
            <p>Las plataformas que usás durante la cursada, en un solo lugar.</p>
          </div>
          <ul className="enlaces dos-col">
            <li>
              <Link to="/alumnos">
                <span>
                  <strong>SIU Guaraní: alumnos</strong>
                  <span>Inscripción a materias y exámenes, historia académica</span>
                  <span className="externo">Sitio externo</span>
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
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/alumnos">
                <span>
                  <strong>SIU Guaraní: gestión académica</strong>
                  <span>Acceso para profesores y Secretaría Académica</span>
                  <span className="externo">Sitio externo</span>
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
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/alumnos">
                <span>
                  <strong>Aulas virtuales</strong>
                  <span>Campus Moodle del instituto</span>
                  <span className="externo">Sitio externo</span>
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
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/alumnos">
                <span>
                  <strong>Mi Argentina</strong>
                  <span>Título digital para egresados</span>
                  <span className="externo">Sitio externo</span>
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
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

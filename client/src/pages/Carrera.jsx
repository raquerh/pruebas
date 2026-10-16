import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMGS } from "../imagenes";
import { irA } from "../utils";

export default function Carrera() {
  const [tabPlan, setTabPlan] = useState("p1");
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  const abrirPlan = (e, id) => {
    e.preventDefault();
    setTabPlan(id);
    irA("plan-estudios");
  };

  return (
    <div className="pagina activa">
      <section className="banner velo-medio" style={{ "--foto": `url(${IMGS.B_CARRERA})` }}>
        <div className="contenedor">
          <h1>La carrera</h1>
          <span className="raya" aria-hidden="true" />
          <p>
            Técnico/a Superior en Emprendimientos Gastronómicos. Tres años de formación en cocina,
            gestión y emprendimiento.
          </p>
        </div>
      </section>
      <nav className="subnav" aria-label="En esta página">
        <div className="contenedor">
          <button type="button" onClick={() => irA("perfil")}>
            Perfil del egresado
          </button>
          <button type="button" onClick={() => irA("aprender")}>
            ¿Qué vas a aprender?
          </button>
          <button type="button" onClick={() => irA("plan-estudios")}>
            Plan de estudios
          </button>
          <button type="button" onClick={() => irA("autoridades")}>
            Autoridades y tutoría
          </button>
        </div>
      </nav>
      <section className="seccion" id="perfil">
        <div className="contenedor dos">
          <div className="texto-largo">
            <h2>Perfil del egresado</h2>
            <span className="raya" aria-hidden="true" />
            <p>
              Al egresar vas a estar capacitado/a para diseñar y gestionar emprendimientos
              gastronómicos, y para realizar tareas de planificación de la producción y de
              elaboración de productos alimenticios aptos para el consumo, conforme a las
              condiciones exigidas de higiene, seguridad y calidad.
            </p>
            <p>
              El instituto forma emprendedores gastronómicos desde hace 18 años, promoviendo la
              inserción laboral y los proyectos productivos que impactan en la comunidad.
            </p>
            <div className="acciones">
              <Link className="boton boton-verde" to="/carrera#plan-estudios">
                Ver plan de estudios
              </Link>
              <Link className="enlace" to="/contacto">
                Consultar por la inscripción
              </Link>
            </div>
          </div>
          <div className="tarjeta-simple">
            <h3 style={{ marginBottom: "16px" }}>Datos de la carrera</h3>
            <ul className="enlaces">
              <li>
                <Link to="/carrera#plan-estudios">
                  <span>
                    <strong>Título</strong>
                    <span>Técnico/a Superior en Emprendimientos Gastronómicos</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/carrera#plan-estudios">
                  <span>
                    <strong>Duración y carga horaria</strong>
                    <span>3 años, 2758 horas cátedra</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/carrera#plan-estudios">
                  <span>
                    <strong>Requisito</strong>
                    <span>Secundario completo</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/contacto">
                  <span>
                    <strong>Cursada</strong>
                    <span>Presencial, de lunes a viernes de 18 a 22 h</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="seccion seccion-alt" id="aprender">
        <div className="contenedor">
          <div className="cabecera">
            <h2>¿Qué vas a aprender?</h2>
            <span className="raya" aria-hidden="true" />
            <p>Cuatro áreas formativas que combinan cocina, gestión y práctica profesional.</p>
          </div>
          <ul className="areas">
            <li>
              <a
                className="area area-verde"
                href="#plan-estudios"
                onClick={(e) => abrirPlan(e, "p2")}
              >
                <div className="area-cab">
                  <span className="icono ic-verde">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 3v7a2 2 0 0 0 2 2v9M5 3v5M9 3v5M17 3c-2 1.5-3 4-3 7h3v11" />
                    </svg>
                  </span>
                  <h3>Producción gastronómica</h3>
                </div>
                <p>
                  Talleres de carnes, vegetales, pizzas y pastas, panadería, pastelería, buffet,
                  catering y cocina nacional e internacional.
                </p>
                <span className="base-area">
                  <span className="cuenta">11 materias y talleres</span>
                  <span className="ver-mat">Ver materias</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="area area-naranja"
                href="#plan-estudios"
                onClick={(e) => abrirPlan(e, "p3")}
              >
                <div className="area-cab">
                  <span className="icono ic-naranja">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 21h18M6 17v-5M11 17V7M16 17v-8M20 6l-4 3-5-2-5 4" />
                    </svg>
                  </span>
                  <h3>Gestión y administración</h3>
                </div>
                <p>
                  Microempresa, contabilidad, comercialización, recursos humanos, compras y
                  organización de eventos gastronómicos.
                </p>
                <span className="base-area">
                  <span className="cuenta">8 materias</span>
                  <span className="ver-mat">Ver materias</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="area area-verde"
                href="#plan-estudios"
                onClick={(e) => abrirPlan(e, "p1")}
              >
                <div className="area-cab">
                  <span className="icono ic-verde">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="M20.5 20.5l-4.8-4.8" />
                    </svg>
                  </span>
                  <h3>Análisis del sector</h3>
                </div>
                <p>
                  Introducción a la gastronomía, industria de la hospitalidad, economía y
                  organización empresarial.
                </p>
                <span className="base-area">
                  <span className="cuenta">5 materias</span>
                  <span className="ver-mat">Ver materias</span>
                </span>
              </a>
            </li>
            <li>
              <a
                className="area area-naranja"
                href="#plan-estudios"
                onClick={(e) => abrirPlan(e, "p4")}
              >
                <div className="area-cab">
                  <span className="icono ic-naranja">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 9l1.6-5h14.8L21 9M4 9h16v11H4zM9.5 20v-5.5h5V20" />
                    </svg>
                  </span>
                  <h3>Prácticas profesionales</h3>
                </div>
                <p>
                  Tres prácticas: observación organizacional, organización de la producción y diseño
                  de emprendimientos gastronómicos.
                </p>
                <span className="base-area">
                  <span className="cuenta">3 prácticas</span>
                  <span className="ver-mat">Ver materias</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className="seccion" id="plan-estudios">
        <div className="contenedor">
          <div className="cabecera">
            <h2>Plan de estudios</h2>
            <span className="raya" aria-hidden="true" />
            <p>
              Materias, régimen y carga horaria de la tecnicatura, según la Resolución N.°
              1202/MEGC/2007.
            </p>
          </div>
          <div className="pestanas" role="tablist">
            <button role="tab" aria-selected={tabPlan === "p1"} onClick={() => setTabPlan("p1")}>
              Análisis del sector
            </button>
            <button role="tab" aria-selected={tabPlan === "p2"} onClick={() => setTabPlan("p2")}>
              Producción gastronómica
            </button>
            <button role="tab" aria-selected={tabPlan === "p3"} onClick={() => setTabPlan("p3")}>
              Gestión y administración
            </button>
            <button role="tab" aria-selected={tabPlan === "p4"} onClick={() => setTabPlan("p4")}>
              Prácticas profesionales
            </button>
          </div>
          <div
            id="p1"
            role="tabpanel"
            className={"panel-tab" + (tabPlan === "p1" ? " activa" : "")}
          >
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Régimen</th>
                    <th>Horas cátedra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Introducción a la Gastronomía</td>
                    <td>Materia cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Industria de la hospitalidad</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Principios de Economía</td>
                    <td>Materia cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Herramientas de Investigación</td>
                    <td>Materia cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Organización empresarial</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="p2"
            role="tabpanel"
            className={"panel-tab" + (tabPlan === "p2" ? " activa" : "")}
          >
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Régimen</th>
                    <th>Horas cátedra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Elaboraciones a base de vegetales, cereales y huevos</td>
                    <td>Taller cuatrimestral</td>
                    <td>144</td>
                  </tr>
                  <tr>
                    <td>Elaboraciones a base de carnes</td>
                    <td>Taller cuatrimestral</td>
                    <td>144</td>
                  </tr>
                  <tr>
                    <td>Elaboración de pizzas y pastas</td>
                    <td>Taller cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Elaboraciones de buffet</td>
                    <td>Taller cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Servicios de catering</td>
                    <td>Taller cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Cocina nacional e internacional</td>
                    <td>Taller cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Elaboraciones de Panadería</td>
                    <td>Materia cuatrimestral</td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <td>Pastelería básica</td>
                    <td>Taller cuatrimestral</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Repostería</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Seguridad e higiene en la Gastronomía</td>
                    <td>Materia anual</td>
                    <td>96</td>
                  </tr>
                  <tr>
                    <td>Nutrición</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="p3"
            role="tabpanel"
            className={"panel-tab" + (tabPlan === "p3" ? " activa" : "")}
          >
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Régimen</th>
                    <th>Horas cátedra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Introducción general a la microempresa</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Elementos de Administración y Contabilidad</td>
                    <td>Materia anual</td>
                    <td>128</td>
                  </tr>
                  <tr>
                    <td>Comercialización</td>
                    <td>Materia cuatrimestral</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <td>Recursos humanos</td>
                    <td>Materia cuatrimestral</td>
                    <td>64</td>
                  </tr>
                  <tr>
                    <td>Compras y gestión de stock</td>
                    <td>Materia cuatrimestral</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <td>Organización de eventos gastronómicos</td>
                    <td>Materia cuatrimestral</td>
                    <td>80</td>
                  </tr>
                  <tr>
                    <td>Taller de comunicación escrita</td>
                    <td>Taller cuatrimestral</td>
                    <td>72</td>
                  </tr>
                  <tr>
                    <td>Inglés técnico</td>
                    <td>Taller cuatrimestral</td>
                    <td>48</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="p4"
            role="tabpanel"
            className={"panel-tab" + (tabPlan === "p4" ? " activa" : "")}
          >
            <div className="tabla-caja">
              <table>
                <thead>
                  <tr>
                    <th>Materia</th>
                    <th>Régimen</th>
                    <th>Horas cátedra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Práctica Profesional 1: Observación organizacional</td>
                    <td>Taller cuatrimestral</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <td>Práctica Profesional 2: Organización de la producción</td>
                    <td>Taller cuatrimestral</td>
                    <td>48</td>
                  </tr>
                  <tr>
                    <td>Práctica Profesional 3: Diseño de Emprendimientos Gastronómicos</td>
                    <td>Taller cuatrimestral</td>
                    <td>160</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="acciones">
            <Link className="boton boton-verde" to="/carrera#plan-estudios">
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
              Régimen de correlatividades (PDF)
            </Link>
            <Link className="boton boton-linea" to="/carrera#plan-estudios">
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
              Resolución oficial del plan
            </Link>
          </div>
        </div>
      </section>
      <section
        className="seccion seccion-autoridades"
        id="autoridades"
        style={{ "--foto": `url(${IMGS.AUTORIDADES})` }}
      >
        <div className="contenedor">
          <div className="cabecera">
            <h2>Autoridades y tutoría</h2>
            <span className="raya" aria-hidden="true" />
            <p>Equipo de conducción del instituto y acompañamiento a los estudiantes.</p>
          </div>
          <div className="personas">
            <div className="tarjeta-simple persona">
              <span className="avatar">CD</span>
              <div>
                <strong>Cecilia C. Dipiazza</strong>
                <span>Rectora</span>
              </div>
            </div>
            <div className="tarjeta-simple persona">
              <span className="avatar">JS</span>
              <div>
                <strong>Prof. Julia Sboro</strong>
                <span>Tutora institucional: acompaña a los estudiantes durante la cursada</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

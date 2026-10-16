import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";
import { anio } from "../utils";

export default function Ingreso() {
  const bajarPdf = () => {
    const a = document.createElement("a");
    a.href = "/docs/guia-de-preingreso.pdf";
    a.download = "Guia-de-preingreso.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="pagina activa">
      <section className="banner velo-fuerte" style={{ "--foto": `url(${IMGS.B_PLAN})` }}>
        <div className="contenedor">
          <h1>Ingreso</h1>
          <span className="raya" aria-hidden="true" />
          <p>Cómo inscribirte en la Tecnicatura Superior en Emprendimientos Gastronómicos.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor">
          <div className="cabecera">
            <h2>
              Ingreso <span>{anio(0)}</span>
            </h2>
            <span className="raya" aria-hidden="true" />
            <p>
              Inscripción para el primer cuatrimestre. El preingreso a las carreras de Técnica
              Superior lo organiza la Agencia de Habilidades para el Futuro del Gobierno de la
              Ciudad.
            </p>
          </div>
          <div className="vigente">
            <span className="etiqueta et-naranja">Fechas a confirmar</span>
            <span style={{ color: "var(--suave)" }}>
              Se publican cuando la Agencia de Habilidades para el Futuro las comunica.
            </span>
          </div>
          <ol className="cronograma">
            <li>
              <span className="paso-num">1</span>
              <span className="paso-fecha">
                Del 6 de noviembre de <span>{anio(-1)}</span> al 5 de marzo de{" "}
                <span>{anio(0)}</span>
              </span>
              <h3>Preinscripción</h3>
              <p>
                En SIU Guaraní: cargás tus datos, elegís la carrera, el instituto y el horario, y
                subís tu DNI y el título secundario.
              </p>
            </li>
            <li>
              <span className="paso-num">2</span>
              <span className="paso-fecha">
                Del 6 de noviembre de <span>{anio(-1)}</span> al 7 de marzo de{" "}
                <span>{anio(0)}</span>
              </span>
              <h3>Curso de preparación</h3>
              <p>
                Virtual y autoasistido, en el aula Moodle. No es obligatorio, pero te prepara para
                los exámenes.
              </p>
            </li>
            <li>
              <span className="paso-num">3</span>
              <span className="paso-fecha">
                Del 3 de febrero al 7 de marzo de <span>{anio(0)}</span>
              </span>
              <h3>Exámenes obligatorios</h3>
              <p>ECOPE e IPEMAT, en Moodle. Tenés un solo intento y dos horas para cada examen.</p>
            </li>
            <li>
              <span className="paso-num">4</span>
              <span className="paso-fecha">
                Desde el 12 de marzo de <span>{anio(0)}</span>
              </span>
              <h3>Confirmación de vacante</h3>
              <p>
                Las vacantes se asignan por orden de mérito, según la suma de los puntajes de ambos
                exámenes.
              </p>
            </li>
          </ol>
          <div className="acciones">
            <a
              className="boton boton-naranja"
              href="https://guarani-autogestionagencia.bue.edu.ar/preinscripcion/SSAALV/acceso"
              target="_blank"
              rel="noopener"
            >
              Ir a la preinscripción
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
            </a>
            <a
              className="boton boton-linea"
              href="https://www.buenosaires.gob.ar/educacion/estudiantes/sistema-educativo/terciario/formacion-tecnica-superior"
              target="_blank"
              rel="noopener"
            >
              Ver la oferta educativa
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
            </a>
          </div>
          <details className="archivo">
            <summary>
              Ingresos anteriores{" "}
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
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="lista">
              <Link to="/ingreso">
                <strong>
                  Ingreso <span>{anio(-1)}</span>
                </strong>
                <span>Cronograma y material de preingreso</span>
              </Link>
              <Link to="/ingreso">
                <strong>
                  Ingreso <span>{anio(-2)}</span>
                </strong>
                <span>Cronograma y material de preingreso</span>
              </Link>
            </div>
          </details>
        </div>
      </section>
      <section className="seccion seccion-alt">
        <div className="contenedor dos">
          <div>
            <div className="cabecera">
              <h2>Preguntas frecuentes</h2>
              <span className="raya" aria-hidden="true" />
            </div>
            <details className="faq">
              <summary>
                ¿Qué necesito para inscribirme?
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p>
                Tener el secundario completo y cargar en SIU Guaraní tu DNI y el título. Si tenés
                más de 25 años y no terminaste el secundario, escribí a preingreso.ifts@bue.edu.ar.
              </p>
            </details>
            <details className="faq">
              <summary>
                ¿Puedo anotarme en más de una carrera?
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p>
                No. En la preinscripción elegís una sola tecnicatura y el instituto donde querés
                cursar.
              </p>
            </details>
            <details className="faq">
              <summary>
                ¿Cómo entro al curso de preparación?
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p>
                Unos 7 días después de preinscribirte te llega un correo con el usuario y la
                contraseña del aula virtual.
              </p>
            </details>
            <details className="faq">
              <summary>
                ¿Qué se evalúa en los exámenes?
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p>
                Los contenidos de Estrategias de Comprensión y Producción Escrita (ECOPE) e
                Introducción al Pensamiento Matemático (IPEMAT). Los módulos de Pensamiento
                Computacional e Introducción a la Técnica Superior no tienen examen.
              </p>
            </details>
            <details className="faq">
              <summary>
                ¿Cómo se asignan las vacantes?
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
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p>
                Por orden de mérito, según el puntaje total de los dos exámenes. La confirmación se
                comunica a partir de mediados de marzo.
              </p>
            </details>
          </div>
          <aside className="material">
            <img src="/img/img-47d91167.jpg" alt="Portada de la guía de preingreso" />
            <div className="material-cuerpo">
              <span className="etiqueta et-verde">Material de preingreso</span>
              <h3>Guía de preingreso a Técnica Superior</h3>
              <p>Presentación de la Agencia de Habilidades para el Futuro. PDF de 6 páginas.</p>
              <div className="acciones">
                <button
                  className="boton boton-verde boton-chico"
                  type="button"
                  id="ver-pdf"
                  onClick={() => window.open("/docs/guia-de-preingreso.pdf", "_blank")}
                >
                  Ver la guía
                </button>
                <button
                  className="boton boton-linea boton-chico"
                  type="button"
                  id="bajar-pdf"
                  onClick={bajarPdf}
                >
                  Descargar
                </button>
              </div>
              <p className="nota-material">
                Consultas sobre el preingreso: <strong>preingreso.ifts@bue.edu.ar</strong>
                <br />
                Consultas sobre el instituto:{" "}
                <Link className="enlace" to="/contacto" style={{ minHeight: "0" }}>
                  escribile a Bedelía
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

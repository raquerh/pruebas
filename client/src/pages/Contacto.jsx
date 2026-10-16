import { useState } from "react";
import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";

export default function Contacto() {
  const [ok, setOk] = useState({});

  return (
    <div className="pagina activa">
      <section className="banner velo-suave" style={{ "--foto": `url(${IMGS.B_CONTACTO})` }}>
        <div className="contenedor">
          <h1>Contacto</h1>
          <span className="raya" aria-hidden="true" />
          <p>Escribinos y te responde Bedelía por correo.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor dos">
          <form
            className="tarjeta-simple"
            onSubmit={(e) => {
              e.preventDefault();
              setOk((o) => ({ ...o, "ok-contacto": true }));
            }}
          >
            <div className="fila">
              <div className="campo">
                <label htmlFor="c-nombre">Nombre y apellido</label>
                <input id="c-nombre" autoComplete="name" placeholder="Ej.: Lucía Fernández" />
              </div>
              <div className="campo">
                <label htmlFor="c-mail">Correo electrónico</label>
                <input
                  id="c-mail"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@correo.com"
                />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="c-motivo">Motivo de la consulta</label>
              <select id="c-motivo">
                <option>Inscripción a la carrera</option>
                <option>Horarios y mesas de examen</option>
                <option>Trámites y certificados</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="c-msj">Mensaje</label>
              <textarea id="c-msj" placeholder="Escribí tu consulta" />
            </div>
            <label className="captcha">
              <input type="checkbox" /> No soy un robot
            </label>
            <button className="boton boton-naranja" type="submit">
              Enviar consulta
            </button>
            <p
              id="ok-contacto"
              role="status"
              className={"aviso" + (ok["ok-contacto"] ? " visible" : "")}
            >
              Tu consulta fue enviada. Bedelía te va a responder a tu correo.
            </p>
          </form>
          <div className="tarjeta-simple">
            <h3 style={{ marginBottom: "18px" }}>Dónde y cuándo</h3>
            <ul className="enlaces">
              <li>
                <Link to="/contacto">
                  <span>
                    <strong>Cañada de Gómez 3850</strong>
                    <span>Villa Lugano, Ciudad de Buenos Aires</span>
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
                      <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/contacto">
                  <span>
                    <strong>Lunes a viernes, de 18 a 22 h</strong>
                    <span>Cursada presencial</span>
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
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/contacto">
                  <span>
                    <strong>Instagram</strong>
                    <span>@ifts_2_ok</span>
                  </span>
                  <span className="flecha">
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
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

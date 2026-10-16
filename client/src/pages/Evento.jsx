import { useState } from "react";
import { Link } from "react-router-dom";
import { IMGS } from "../imagenes";

export default function Evento() {
  const [foto, setFoto] = useState("PLATO");

  return (
    <div className="pagina activa">
      <section className="banner" style={{ "--foto": `url(${IMGS.PLATO})` }}>
        <div className="contenedor">
          <p className="migas">
            <Link to="/eventos">Galería de eventos</Link>
          </p>
          <h1>Mateada Patria</h1>
          <span className="raya" aria-hidden="true" />
          <p>Encuentro por el 25 de Mayo con estudiantes, docentes y familias.</p>
        </div>
      </section>
      <section className="seccion">
        <div className="contenedor detalle">
          <div className="galeria">
            <div className="principal">
              <img id="foto-principal" alt="Foto principal del evento" src={IMGS[foto]} />
            </div>
            <div className="miniaturas">
              <button
                type="button"
                aria-pressed={foto === "PLATO"}
                onClick={() => setFoto("PLATO")}
              >
                <img src={IMGS.PLATO} alt="Foto 1 del evento" />
              </button>
              <button
                type="button"
                aria-pressed={foto === "VERDURAS"}
                onClick={() => setFoto("VERDURAS")}
              >
                <img src={IMGS.VERDURAS} alt="Foto 2 del evento" />
              </button>
              <button
                type="button"
                aria-pressed={foto === "MORRON"}
                onClick={() => setFoto("MORRON")}
              >
                <img src={IMGS.MORRON} alt="Foto 3 del evento" />
              </button>
              <button
                type="button"
                aria-pressed={foto === "ESTUDIO"}
                onClick={() => setFoto("ESTUDIO")}
              >
                <img src={IMGS.ESTUDIO} alt="Foto 4 del evento" />
              </button>
              <button type="button" aria-pressed={foto === "HERO"} onClick={() => setFoto("HERO")}>
                <img src={IMGS.HERO} alt="Foto 5 del evento" />
              </button>
            </div>
          </div>
          <div className="info-evento">
            <div className="meta">
              <span className="etiqueta et-naranja">Mayo 2026</span>
              <span className="etiqueta et-gris">6 fotos</span>
            </div>
            <h2>Mateada Patria</h2>
            <p>
              Para celebrar el 25 de Mayo, estudiantes de todos los años prepararon pastelitos,
              tortas fritas y mate cocido para compartir con docentes, familias y vecinos del
              barrio.
            </p>
            <p>
              Fue también una práctica real de organización de eventos: planificación de compras,
              producción y atención del público.
            </p>
            <div className="caja-ig">
              <strong style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <svg
                  width="22"
                  height="22"
                  style={{ color: "var(--naranja)" }}
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
                Publicado desde Instagram
              </strong>
              <p>Esta publicación llegó al sitio con el hashtag #IFTSEventos.</p>
              <Link className="enlace" to="/evento">
                Ver la publicación en Instagram
              </Link>
            </div>
            <div className="acciones">
              <Link className="boton boton-linea" to="/eventos">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                Volver a eventos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

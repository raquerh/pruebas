import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMGS } from "../imagenes";

const ITEMS = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/carrera", texto: "La carrera" },
  { ruta: "/ingreso", texto: "Ingreso" },
  { ruta: "/alumnos", texto: "Alumnos" },
  { ruta: "/eventos", texto: "Eventos", base: ["/eventos", "/evento"] },
  { ruta: "/contacto", texto: "Contacto", destacado: true },
];

export default function Header() {
  const { pathname } = useLocation();
  const [abierto, setAbierto] = useState(false);
  const [fijo, setFijo] = useState(false);

  useEffect(() => {
    const revisar = () => setFijo(window.scrollY > 40);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, []);

  useEffect(() => setAbierto(false), [pathname]);

  const actual = (item) => (item.base || [item.ruta]).includes(pathname);

  return (
    <header className={"encabezado" + (fijo ? " fijo" : "")} id="encabezado">
      <div className="contenedor">
        <Link className="marca" to="/">
          <img src={IMGS.LOGO} alt="Logo del IFTS N.° 2" />
          <span>
            <strong>IFTS N.° 2</strong>
            <small>D.E. 20, Villa Lugano</small>
          </span>
        </Link>
        <nav aria-label="Principal">
          <button
            className="boton-menu"
            aria-expanded={abierto}
            aria-controls="menu"
            aria-label="Abrir menú"
            id="boton-menu"
            onClick={() => setAbierto(!abierto)}
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
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <ul className={"menu" + (abierto ? " abierto" : "")} id="menu">
            {ITEMS.map((item) => (
              <li key={item.ruta} className={item.destacado ? "destacado" : undefined}>
                <Link
                  to={item.ruta}
                  className={actual(item) ? "actual" : undefined}
                  aria-current={actual(item) ? "page" : undefined}
                >
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

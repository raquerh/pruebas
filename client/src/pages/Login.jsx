import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMGS } from "../imagenes";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const intentos = useRef(0);
  const bloqueadoHasta = useRef(0);
  const INTENTOS_MAX = 5;

  const enviar = (e) => {
    e.preventDefault();
    const ahora = Date.now();
    if (ahora < bloqueadoHasta.current) {
      setError("Demasiados intentos fallidos. Probá de nuevo en 15 minutos.");
      return;
    }
    const mail = e.currentTarget.elements["l-mail"].value.trim();
    const pass = e.currentTarget.elements["l-pass"].value;
    if (!mail || pass.length < 8) {
      intentos.current += 1;
      if (intentos.current >= INTENTOS_MAX) {
        bloqueadoHasta.current = ahora + 15 * 60 * 1000;
        intentos.current = 0;
        setError("Demasiados intentos fallidos. Probá de nuevo en 15 minutos.");
      } else {
        const quedan = INTENTOS_MAX - intentos.current;
        setError(
          "Usuario o contraseña incorrectos. Te " +
            (quedan === 1 ? "queda 1 intento." : "quedan " + quedan + " intentos."),
        );
      }
      return;
    }
    intentos.current = 0;
    setError("");
    login(mail);
    navigate("/admin");
  };

  return (
    <div className="login activa">
      <div className="lado-foto">
        <Link className="volver-foto" to="/">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Volver al sitio
        </Link>
        <div>
          <h2>Panel de administración</h2>
          <p>Gestión de eventos, horarios y contenido del sitio.</p>
        </div>
      </div>
      <div className="lado-form">
        <form id="form-login" noValidate onSubmit={enviar}>
          <Link className="marca" to="/">
            <img src={IMGS.LOGO} alt="Logo del IFTS N.° 2" />
            <span>
              <strong>IFTS N.° 2</strong>
              <small>Volver al sitio</small>
            </span>
          </Link>
          <h1>Iniciar sesión</h1>
          <p className="sub">Ingresá con el usuario que te asignó el instituto.</p>
          <div className="campo">
            <label htmlFor="l-mail">Correo electrónico</label>
            <input
              id="l-mail"
              type="email"
              autoComplete="username"
              defaultValue="matias.pelaez@ifts2.edu.ar"
            />
          </div>
          <div className="campo">
            <label htmlFor="l-pass">Contraseña</label>
            <input
              id="l-pass"
              type="password"
              autoComplete="current-password"
              defaultValue="contraseña"
            />
          </div>
          <p className={"aviso" + (error ? " visible error" : "")} id="error-login" role="alert">
            {error}
          </p>
          <button className="boton boton-verde" type="submit" style={{ width: "100%" }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

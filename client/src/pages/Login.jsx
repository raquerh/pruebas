import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMGS } from "../imagenes";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    setEnviando(true);
    try {
      await login(f.elements["l-mail"].value.trim(), f.elements["l-pass"].value);
      setError("");
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
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
            <input id="l-mail" type="email" autoComplete="username" />
          </div>
          <div className="campo">
            <label htmlFor="l-pass">Contraseña</label>
            <input id="l-pass" type="password" autoComplete="current-password" />
          </div>
          <p className={"aviso" + (error ? " visible error" : "")} id="error-login" role="alert">
            {error}
          </p>
          <button
            className="boton boton-verde"
            type="submit"
            disabled={enviando}
            style={{ width: "100%" }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminUsuarios() {
  const { usuario } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [okUsuario, setOkUsuario] = useState(false);

  const cargar = () =>
    api("/usuarios")
      .then((d) => setUsuarios(d.usuarios))
      .catch((e) => setError(e.message));

  useEffect(() => {
    cargar();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    setOkUsuario(false);
    const f = e.currentTarget;
    try {
      await api("/usuarios", {
        metodo: "POST",
        cuerpo: {
          nombre: f.elements["u-nombre"].value,
          mail: f.elements["u-mail"].value,
          rol: f.elements["u-rol"].value,
          password: f.elements["u-pass"].value,
        },
      });
      setError("");
      f.reset();
      setOkUsuario(true);
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

  const quitar = async (u) => {
    if (!window.confirm("¿Eliminar a " + u.nombre + "?")) return;
    try {
      await api("/usuarios/" + u.id, { metodo: "DELETE" });
      setError("");
      cargar();
    } catch (err) {
      setError(err.message);
    }
  };

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
            <h1>Usuarios</h1>
            <p>
              Quién puede entrar al panel y qué puede hacer. Quien administra registra a cada
              persona y le asigna su rol.
            </p>
          </div>
        </div>
        <div className="caja" style={{ marginBottom: "24px" }}>
          <h2>Roles</h2>
          <ul className="actividad">
            <li>
              <span>
                <strong>Administrador</strong>: acceso total (eventos, información académica,
                contenido institucional y usuarios).
              </span>
            </li>
            <li>
              <span>
                <strong>Bedelía</strong>: solo información académica (horarios, mesas de examen,
                ingresantes y alumnos en curso).
              </span>
            </li>
          </ul>
        </div>
        <div className="caja" style={{ marginBottom: "24px" }}>
          <h2>Agregar un usuario</h2>
          <form id="form-usuario" noValidate onSubmit={agregar}>
            <div className="fila">
              <div className="campo">
                <label htmlFor="u-nombre">Nombre y apellido</label>
                <input id="u-nombre" autoComplete="off" />
              </div>
              <div className="campo">
                <label htmlFor="u-mail">Correo electrónico</label>
                <input id="u-mail" type="email" autoComplete="off" />
              </div>
            </div>
            <div className="fila">
              <div className="campo">
                <label htmlFor="u-rol">Rol</label>
                <select id="u-rol">
                  <option value="admin">Administrador</option>
                  <option value="bedelia">Bedelía</option>
                </select>
              </div>
              <div className="campo">
                <label htmlFor="u-pass">Contraseña inicial</label>
                <input id="u-pass" type="password" autoComplete="new-password" />
              </div>
            </div>
            <p style={{ color: "var(--suave)", fontSize: "14px" }}>
              La contraseña debe tener al menos 8 caracteres, con letras y números.
            </p>
            <p
              className={"aviso" + (error ? " visible error" : "")}
              id="error-usuario"
              role="alert"
            >
              {error}
            </p>
            <button className="boton boton-verde" type="submit">
              Agregar usuario
            </button>
            <p className={"aviso" + (okUsuario ? " visible" : "")} id="ok-usuario" role="status">
              Usuario agregado. Al iniciar sesión va a ver solo las secciones de su rol.
            </p>
          </form>
        </div>
        <div className="tabla-caja">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-usuarios">
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.nombre}</strong>
                  </td>
                  <td>{u.mail}</td>
                  <td>
                    <span className={"etiqueta " + (u.rol === "admin" ? "et-verde" : "et-naranja")}>
                      {u.rol === "admin" ? "Administrador" : "Bedelía"}
                    </span>
                  </td>
                  <td>
                    <div className="acciones-fila">
                      <button
                        className="boton boton-linea boton-chico"
                        type="button"
                        onClick={() => quitar(u)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: "var(--suave)", fontSize: "14px", marginTop: "12px" }}>
          Las cuentas (tres con acceso total y dos de Bedelía) las informa el instituto. Quien
          administra las da de alta desde acá.
        </p>
      </main>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import AdminLateral from "../components/AdminLateral.jsx";

export default function AdminUsuarios() {
  const { usuario } = useAuth();

  const [usuarios, setUsuarios] = useState([
    { nombre: "Matías Peláez", mail: "matias.pelaez@ifts2.edu.ar", rol: "Administrador" },
  ]);
  const [error, setError] = useState("");
  const [okUsuario, setOkUsuario] = useState(false);

  const agregar = (e) => {
    e.preventDefault();
    setOkUsuario(false);
    const f = e.currentTarget;
    const nombre = f.elements["u-nombre"].value.trim();
    const mail = f.elements["u-mail"].value.trim();
    const rol = f.elements["u-rol"].value;
    const pass = f.elements["u-pass"].value;
    let msj = "";
    if (!nombre || !mail) msj = "Completá el nombre y el correo.";
    else if (usuarios.some((u) => u.mail.toLowerCase() === mail.toLowerCase()))
      msj = "Ya hay un usuario con ese correo.";
    else if (pass.length < 8 || !/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass))
      msj = "La contraseña debe tener al menos 8 caracteres, con letras y números.";
    setError(msj);
    if (msj) return;
    setUsuarios([...usuarios, { nombre, mail, rol }]);
    f.reset();
    setOkUsuario(true);
  };

  const quitar = (u) => {
    if (window.confirm("¿Eliminar a " + u.nombre + "?"))
      setUsuarios(usuarios.filter((x) => x !== u));
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
                  <option value="Administrador">Administrador</option>
                  <option value="Bedelía">Bedelía</option>
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
                <tr key={u.mail}>
                  <td>
                    <strong>{u.nombre}</strong>
                  </td>
                  <td>{u.mail}</td>
                  <td>
                    <span
                      className={
                        "etiqueta " + (u.rol === "Administrador" ? "et-verde" : "et-naranja")
                      }
                    >
                      {u.rol}
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
          Los datos de las cuentas (tres con acceso total y dos de Bedelía) los completa el
          instituto; esta lista es de ejemplo.
        </p>
      </main>
    </div>
  );
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, guardarToken, leerToken } from "../api.js";

const AuthContext = createContext(null);

const SIN_USUARIO = { nombre: "", iniciales: "", saludo: "" };

// Datos para mostrar en el panel a partir del usuario que devuelve la API.
function conDatosDePantalla(u) {
  const palabras = u.nombre.trim().split(/\s+/);
  const iniciales = palabras.length > 1 ? palabras[0][0] + palabras[1][0] : palabras[0].slice(0, 2);
  return { ...u, iniciales: iniciales.toUpperCase(), saludo: palabras[0] };
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(() => !!leerToken());

  // Si hay un token guardado, se verifica con el servidor al abrir la página.
  useEffect(() => {
    if (!leerToken()) return;
    api("/auth/yo")
      .then(({ usuario: u }) => setUsuario(conDatosDePantalla(u)))
      .catch(() => guardarToken(null))
      .finally(() => setCargando(false));
  }, []);

  const login = useCallback(async (mail, password) => {
    const { token, usuario: u } = await api("/auth/login", {
      metodo: "POST",
      cuerpo: { mail, password },
    });
    guardarToken(token);
    setUsuario(conDatosDePantalla(u));
  }, []);

  const logout = useCallback(() => {
    guardarToken(null);
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({
      usuario: usuario || SIN_USUARIO,
      autenticado: !!usuario,
      esAdmin: !!usuario && usuario.rol === "admin",
      cargando,
      login,
      logout,
    }),
    [usuario, cargando, login, logout],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Sesión simulada en el navegador. Cuando exista la API (server/), login() y
// logout() pasan a llamar a /api/auth y el rol viene del servidor.
const AuthContext = createContext(null);
const CLAVE = "ifts2-sesion";

const PERFILES = {
  admin: { rol: "admin", nombre: "Matías Peláez", iniciales: "MP", saludo: "Matías" },
  bedelia: { rol: "bedelia", nombre: "Bedelía", iniciales: "BD", saludo: "Bedelía" },
};

function leer() {
  try {
    const rol = sessionStorage.getItem(CLAVE);
    return PERFILES[rol] || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leer);

  const login = useCallback((mail) => {
    const perfil = /^bedel/i.test(mail) ? PERFILES.bedelia : PERFILES.admin;
    try {
      sessionStorage.setItem(CLAVE, perfil.rol);
    } catch {
      /* sin almacenamiento: la sesión dura lo que dure la pestaña abierta */
    }
    setUsuario(perfil);
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(CLAVE);
    } catch {
      /* nada que limpiar */
    }
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({
      usuario: usuario || PERFILES.admin,
      autenticado: !!usuario,
      esAdmin: !!usuario && usuario.rol === "admin",
      login,
      logout,
    }),
    [usuario, login, logout],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

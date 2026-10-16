// Acceso a la API del servidor. El token de sesión se guarda en sessionStorage
// (se pierde al cerrar la pestaña).
const CLAVE = "ifts2-token";

export function leerToken() {
  try {
    return sessionStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

export function guardarToken(token) {
  try {
    if (token) sessionStorage.setItem(CLAVE, token);
    else sessionStorage.removeItem(CLAVE);
  } catch {
    /* sin almacenamiento: la sesión dura lo que dure la pestaña abierta */
  }
}

// Llama a /api/<ruta>. Si el servidor responde con error, lanza un Error con su mensaje.
export async function api(ruta, { metodo = "GET", cuerpo } = {}) {
  const headers = {};
  const token = leerToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (cuerpo !== undefined) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(`/api${ruta}`, {
      method: metodo,
      headers,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Probá de nuevo en unos minutos.");
  }

  let datos = null;
  if (res.status !== 204) {
    try {
      datos = await res.json();
    } catch {
      /* respuesta sin cuerpo JSON */
    }
  }
  if (!res.ok) {
    const error = new Error(datos?.error || "No se pudo completar la operación.");
    error.estado = res.status;
    throw error;
  }
  return datos;
}

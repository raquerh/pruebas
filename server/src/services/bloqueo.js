// Cuenta los intentos fallidos por clave (el correo de la cuenta) y bloquea al llegar al máximo.
// Está en memoria: en un servidor con varias instancias (Vercel) cada una lleva su cuenta.
export function crearBloqueo({ max = 5, duracionMs = 15 * 60 * 1000, ahora = Date.now } = {}) {
  const registro = new Map();

  const vigente = (clave) => {
    const r = registro.get(clave);
    if (r && r.hasta && r.hasta <= ahora()) {
      registro.delete(clave);
      return null;
    }
    return r || null;
  };

  return {
    estaBloqueado(clave) {
      const r = vigente(clave);
      return !!(r && r.hasta);
    },
    // Suma un fallo. Devuelve si quedó bloqueado y cuántos intentos quedan.
    registrarFallo(clave) {
      const r = vigente(clave) || { fallos: 0, hasta: 0 };
      r.fallos += 1;
      if (r.fallos >= max) r.hasta = ahora() + duracionMs;
      registro.set(clave, r);
      return { bloqueado: r.fallos >= max, quedan: Math.max(max - r.fallos, 0) };
    },
    limpiar(clave) {
      registro.delete(clave);
    },
  };
}

import jwt from "jsonwebtoken";

// Exige un token válido y que el usuario siga existiendo (si se lo elimina, pierde el acceso).
export function autenticar({ config, usuarios }) {
  return async (req, res, next) => {
    const cabecera = req.headers.authorization || "";
    const token = cabecera.startsWith("Bearer ") ? cabecera.slice(7) : "";
    if (!token) return res.status(401).json({ error: "Tenés que iniciar sesión." });
    try {
      const { sub } = jwt.verify(token, config.jwtSecret);
      const usuario = await usuarios.buscarPorId(sub);
      if (!usuario) return res.status(401).json({ error: "La sesión ya no es válida." });
      req.usuario = usuario;
      next();
    } catch (e) {
      if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
        return res.status(401).json({ error: "La sesión venció. Iniciá sesión de nuevo." });
      }
      next(e);
    }
  };
}

// Permite el paso solo a los roles indicados.
export const requiereRol =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.usuario?.rol)
      ? next()
      : res.status(403).json({ error: "No tenés permiso para hacer esto." });

import { Router } from "express";
import jwt from "jsonwebtoken";
import { comparar, HASH_FALSO } from "../services/passwords.js";
import { autenticar } from "../middleware/auth.js";

const MSJ_BLOQUEO = "Demasiados intentos fallidos. Probá de nuevo en 15 minutos.";

export function crearRutasAuth({ config, usuarios, bloqueo }) {
  const router = Router();

  router.post("/login", async (req, res, next) => {
    try {
      const mail = String(req.body?.mail || "").trim().toLowerCase();
      const password = String(req.body?.password || "");
      // Se cuenta por correo y no por IP: la IP se puede falsear con el encabezado X-Forwarded-For.
      const clave = mail;

      if (bloqueo.estaBloqueado(clave)) return res.status(429).json({ error: MSJ_BLOQUEO });

      const usuario = mail ? await usuarios.buscarPorMail(mail) : null;
      const coincide = await comparar(password, usuario ? usuario.passwordHash : HASH_FALSO);

      if (!usuario || !coincide) {
        const { bloqueado, quedan } = bloqueo.registrarFallo(clave);
        if (bloqueado) return res.status(429).json({ error: MSJ_BLOQUEO });
        const texto = quedan === 1 ? "queda 1 intento." : `quedan ${quedan} intentos.`;
        return res.status(401).json({ error: `Usuario o contraseña incorrectos. Te ${texto}` });
      }

      bloqueo.limpiar(clave);
      const token = jwt.sign({ sub: usuario.id, rol: usuario.rol }, config.jwtSecret, {
        expiresIn: config.jwtDuracion,
      });
      res.json({
        token,
        usuario: { id: usuario.id, nombre: usuario.nombre, mail: usuario.mail, rol: usuario.rol },
      });
    } catch (e) {
      next(e);
    }
  });

  router.get("/yo", autenticar({ config, usuarios }), (req, res) => {
    res.json({ usuario: req.usuario });
  });

  return router;
}

import { Router } from "express";
import { hashear, validarPassword } from "../services/passwords.js";
import { autenticar, requiereRol } from "../middleware/auth.js";

const ROLES = ["admin", "bedelia"];
const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Gestión de usuarios: solo el perfil Administrador.
export function crearRutasUsuarios({ config, usuarios }) {
  const router = Router();
  router.use(autenticar({ config, usuarios }), requiereRol("admin"));

  router.get("/", async (req, res, next) => {
    try {
      res.json({ usuarios: await usuarios.listar() });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const nombre = String(req.body?.nombre || "").trim();
      const mail = String(req.body?.mail || "").trim().toLowerCase();
      const rol = req.body?.rol;
      const password = req.body?.password;

      if (!nombre || !mail) return res.status(400).json({ error: "Completá el nombre y el correo." });
      if (!MAIL.test(mail)) return res.status(400).json({ error: "El correo no tiene un formato válido." });
      if (!ROLES.includes(rol)) return res.status(400).json({ error: "El rol tiene que ser admin o bedelia." });
      const errorPass = validarPassword(password);
      if (errorPass) return res.status(400).json({ error: errorPass });
      if (await usuarios.buscarPorMail(mail)) {
        return res.status(409).json({ error: "Ya hay un usuario con ese correo." });
      }

      const nuevo = await usuarios.crear({
        nombre,
        mail,
        rol,
        passwordHash: await hashear(password, config.bcryptCosto),
      });
      res.status(201).json({ usuario: nuevo });
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id === req.usuario.id) {
        return res.status(400).json({ error: "No podés eliminar tu propio usuario." });
      }
      const objetivo = await usuarios.buscarPorId(id);
      if (!objetivo) return res.status(404).json({ error: "El usuario no existe." });
      if (objetivo.rol === "admin" && (await usuarios.contarPorRol("admin")) <= 1) {
        return res.status(400).json({ error: "Tiene que quedar al menos un administrador." });
      }
      await usuarios.eliminar(id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  });

  return router;
}

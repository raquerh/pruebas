import express from "express";
import cors from "cors";
import helmet from "helmet";
import { leerConfig } from "./config.js";
import { crearBloqueo } from "./services/bloqueo.js";
import { crearRepoUsuariosMemoria } from "./repos/usuarios.memoria.js";
import { crearRutasAuth } from "./routes/auth.js";
import { crearRutasUsuarios } from "./routes/usuarios.js";

// Las dependencias se reciben por parámetro: en producción son las de MongoDB,
// en desarrollo y en las pruebas pueden ser las de memoria.
export function crearApp({
  config = leerConfig(),
  usuarios = crearRepoUsuariosMemoria(),
  bloqueo = crearBloqueo({ max: config.intentosMax, duracionMs: config.bloqueoMs }),
} = {}) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.clientUrl }));
  app.use(express.json());

  app.get("/api/salud", (req, res) => {
    res.json({ estado: "ok" });
  });

  app.use("/api/auth", crearRutasAuth({ config, usuarios, bloqueo }));
  app.use("/api/usuarios", crearRutasUsuarios({ config, usuarios }));

  // Faltan montar: /api/eventos, /api/academica, /api/contenido, /api/contacto, /api/instagram

  app.use("/api", (req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "El cuerpo de la petición no es JSON válido." });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  });

  return app;
}

import express from "express";
import cors from "cors";
import helmet from "helmet";

export function crearApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
  app.use(express.json());

  app.get("/api/salud", (req, res) => {
    res.json({ estado: "ok" });
  });

  // Acá se montan las rutas a medida que se implementan:
  // /api/auth, /api/usuarios, /api/eventos, /api/academica, /api/contenido, /api/contacto, /api/instagram

  app.use("/api", (req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  });

  return app;
}

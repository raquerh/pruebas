import "dotenv/config";
import { crearApp } from "./app.js";
import { conectarDB } from "./db.js";

const puerto = process.env.PORT || 4000;
const app = crearApp();

try {
  await conectarDB();
  console.log("Conectado a MongoDB");
} catch (e) {
  console.warn("Sin base de datos:", e.message);
}

app.listen(puerto, () => console.log(`API escuchando en http://localhost:${puerto}`));

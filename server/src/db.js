import mongoose from "mongoose";

// Se reutiliza la conexión entre ejecuciones (necesario en Vercel, donde el servidor
// corre como función y puede arrancar muchas veces).
let conexion = null;

export async function conectarDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Falta MONGODB_URI en las variables de entorno");
  }
  if (!conexion) {
    conexion = mongoose.connect(process.env.MONGODB_URI);
  }
  return conexion;
}

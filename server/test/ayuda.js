import request from "supertest";
import { crearApp } from "../src/app.js";
import { leerConfig } from "../src/config.js";
import { crearRepoUsuariosMemoria } from "../src/repos/usuarios.memoria.js";
import { crearBloqueo } from "../src/services/bloqueo.js";
import { hashear } from "../src/services/passwords.js";

export const ADMIN = { nombre: "Matías Peláez", mail: "matias@ifts2.edu.ar", password: "Clave1234" };
export const BEDELIA = { nombre: "Bedelía", mail: "bedelia@ifts2.edu.ar", password: "Bedel1234" };

// App con repositorio en memoria y dos usuarios cargados (costo de bcrypt bajo para que las pruebas sean rápidas).
export async function appDePrueba({ ahora } = {}) {
  const config = { ...leerConfig({}), bcryptCosto: 4 };
  const usuarios = crearRepoUsuariosMemoria();
  await usuarios.crear({ ...ADMIN, rol: "admin", passwordHash: await hashear(ADMIN.password, 4) });
  await usuarios.crear({ ...BEDELIA, rol: "bedelia", passwordHash: await hashear(BEDELIA.password, 4) });
  const bloqueo = crearBloqueo({ max: config.intentosMax, duracionMs: config.bloqueoMs, ahora });
  const app = crearApp({ config, usuarios, bloqueo });
  return { app, usuarios, config };
}

export async function tokenDe(app, { mail, password }) {
  const res = await request(app).post("/api/auth/login").send({ mail, password });
  return res.body.token;
}

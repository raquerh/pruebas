import { hashear } from "./passwords.js";

// Si no hay ningún usuario, crea el primer administrador con los datos de la configuración.
export async function asegurarAdminInicial({ usuarios, config }) {
  if ((await usuarios.listar()).length > 0) return false;
  if (!config.seedMail || !config.seedPassword) {
    console.warn("No hay usuarios y faltan SEED_ADMIN_MAIL y SEED_ADMIN_PASSWORD: nadie va a poder entrar al panel.");
    return false;
  }
  await usuarios.crear({
    nombre: config.seedNombre,
    mail: config.seedMail,
    rol: "admin",
    passwordHash: await hashear(config.seedPassword, config.bcryptCosto),
  });
  return true;
}

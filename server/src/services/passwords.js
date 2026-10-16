import bcrypt from "bcryptjs";

// Devuelve el mensaje de error, o null si la contraseña cumple la regla.
export function validarPassword(pass) {
  if (typeof pass !== "string" || pass.length < 8 || !/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass)) {
    return "La contraseña debe tener al menos 8 caracteres, con letras y números.";
  }
  return null;
}

export const hashear = (pass, costo = 10) => bcrypt.hash(pass, costo);
export const comparar = (pass, hash) => bcrypt.compare(pass, hash);

// Hash de relleno: el login compara contra este cuando el correo no existe, para que la demora
// no delate si el correo está registrado.
export const HASH_FALSO = bcrypt.hashSync("relleno-sin-uso", 10);

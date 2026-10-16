import mongoose from "mongoose";
import { Usuario } from "../models/Usuario.js";

// Repositorio con MongoDB. Expone la misma interfaz que el repositorio en memoria.
const aPlano = (doc) =>
  doc ? { id: String(doc._id), nombre: doc.nombre, mail: doc.mail, rol: doc.rol } : null;

export function crearRepoUsuariosMongo() {
  return {
    async buscarPorMail(mail) {
      const doc = await Usuario.findOne({ mail: mail.toLowerCase() });
      return doc ? { ...aPlano(doc), passwordHash: doc.passwordHash } : null;
    },
    async buscarPorId(id) {
      if (!mongoose.isValidObjectId(id)) return null;
      return aPlano(await Usuario.findById(id));
    },
    async listar() {
      return (await Usuario.find().sort({ createdAt: 1 })).map(aPlano);
    },
    async crear({ nombre, mail, rol, passwordHash }) {
      return aPlano(await Usuario.create({ nombre, mail, rol, passwordHash }));
    },
    async eliminar(id) {
      if (!mongoose.isValidObjectId(id)) return false;
      return !!(await Usuario.findByIdAndDelete(id));
    },
    async contarPorRol(rol) {
      return Usuario.countDocuments({ rol });
    },
  };
}

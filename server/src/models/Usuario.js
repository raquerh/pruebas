import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    mail: { type: String, required: true, unique: true, lowercase: true, trim: true },
    rol: { type: String, enum: ["admin", "bedelia"], required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

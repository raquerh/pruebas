import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { ADMIN, BEDELIA, appDePrueba, tokenDe } from "./ayuda.js";

const nuevo = { nombre: "Ana Test", mail: "ana@ifts2.edu.ar", rol: "bedelia", password: "Clave1234" };
const con = (req, token) => req.set("Authorization", `Bearer ${token}`);

test("sin sesión no se puede listar usuarios", async () => {
  const { app } = await appDePrueba();
  assert.equal((await request(app).get("/api/usuarios")).status, 401);
});

test("Bedelía no puede ver ni crear usuarios (403)", async () => {
  const { app } = await appDePrueba();
  const token = await tokenDe(app, BEDELIA);
  assert.equal((await con(request(app).get("/api/usuarios"), token)).status, 403);
  assert.equal((await con(request(app).post("/api/usuarios").send(nuevo), token)).status, 403);
});

test("el administrador lista usuarios sin exponer los hashes", async () => {
  const { app } = await appDePrueba();
  const res = await con(request(app).get("/api/usuarios"), await tokenDe(app, ADMIN));
  assert.equal(res.status, 200);
  assert.equal(res.body.usuarios.length, 2);
  assert.ok(res.body.usuarios.every((u) => u.passwordHash === undefined));
});

test("alta de usuario: se guarda con hash y el nuevo usuario puede iniciar sesión", async () => {
  const { app, usuarios } = await appDePrueba();
  const res = await con(request(app).post("/api/usuarios").send(nuevo), await tokenDe(app, ADMIN));
  assert.equal(res.status, 201);
  const guardado = await usuarios.buscarPorMail(nuevo.mail);
  assert.notEqual(guardado.passwordHash, nuevo.password);
  const login = await request(app).post("/api/auth/login").send({ mail: nuevo.mail, password: nuevo.password });
  assert.equal(login.status, 200);
  assert.equal(login.body.usuario.rol, "bedelia");
});

test("alta con correo repetido (aunque cambien las mayúsculas) devuelve 409", async () => {
  const { app } = await appDePrueba();
  const token = await tokenDe(app, ADMIN);
  const res = await con(request(app).post("/api/usuarios").send({ ...nuevo, mail: ADMIN.mail.toUpperCase() }), token);
  assert.equal(res.status, 409);
  assert.match(res.body.error, /Ya hay un usuario/);
});

test("alta con datos inválidos devuelve 400 y el mensaje", async () => {
  const { app } = await appDePrueba();
  const token = await tokenDe(app, ADMIN);
  const casos = [
    [{ ...nuevo, nombre: "" }, /Completá el nombre/],
    [{ ...nuevo, mail: "sin-arroba" }, /formato válido/],
    [{ ...nuevo, rol: "dios" }, /rol/],
    [{ ...nuevo, password: "corta" }, /al menos 8/],
  ];
  for (const [cuerpo, esperado] of casos) {
    const res = await con(request(app).post("/api/usuarios").send(cuerpo), token);
    assert.equal(res.status, 400);
    assert.match(res.body.error, esperado);
  }
});

test("baja de usuario y el usuario eliminado pierde el acceso con su token", async () => {
  const { app } = await appDePrueba();
  const tokenAdmin = await tokenDe(app, ADMIN);
  const tokenBedelia = await tokenDe(app, BEDELIA);
  const lista = await con(request(app).get("/api/usuarios"), tokenAdmin);
  const bedelia = lista.body.usuarios.find((u) => u.mail === BEDELIA.mail);
  const baja = await con(request(app).delete(`/api/usuarios/${bedelia.id}`), tokenAdmin);
  assert.equal(baja.status, 204);
  assert.equal((await con(request(app).get("/api/auth/yo"), tokenBedelia)).status, 401);
});

test("no se puede eliminar el propio usuario ni un id inexistente", async () => {
  const { app } = await appDePrueba();
  const token = await tokenDe(app, ADMIN);
  const yo = (await con(request(app).get("/api/auth/yo"), token)).body.usuario;
  assert.equal((await con(request(app).delete(`/api/usuarios/${yo.id}`), token)).status, 400);
  assert.equal((await con(request(app).delete("/api/usuarios/999"), token)).status, 404);
});

test("un administrador puede eliminar a otro administrador, pero no a sí mismo", async () => {
  const { app } = await appDePrueba();
  const tokenAdmin = await tokenDe(app, ADMIN);
  await con(request(app).post("/api/usuarios").send({ ...nuevo, rol: "admin", mail: "otro@ifts2.edu.ar" }), tokenAdmin);
  const tokenOtro = await tokenDe(app, { mail: "otro@ifts2.edu.ar", password: nuevo.password });
  const lista = (await con(request(app).get("/api/usuarios"), tokenOtro)).body.usuarios;
  const primero = lista.find((u) => u.mail === ADMIN.mail);
  const otro = lista.find((u) => u.mail === "otro@ifts2.edu.ar");
  assert.equal((await con(request(app).delete(`/api/usuarios/${primero.id}`), tokenOtro)).status, 204);
  // queda un solo administrador (el que está logueado) y no puede borrarse a sí mismo
  assert.equal((await con(request(app).delete(`/api/usuarios/${otro.id}`), tokenOtro)).status, 400);
});

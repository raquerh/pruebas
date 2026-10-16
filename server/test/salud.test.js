import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { crearApp } from "../src/app.js";

test("GET /api/salud responde ok", async () => {
  const res = await request(crearApp()).get("/api/salud");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { estado: "ok" });
});

test("una ruta de la API que no existe devuelve 404 en JSON", async () => {
  const res = await request(crearApp()).get("/api/no-existe");
  assert.equal(res.status, 404);
  assert.equal(res.body.error, "Ruta no encontrada");
});

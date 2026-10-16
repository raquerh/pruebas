import test from "node:test";
import assert from "node:assert/strict";
import { crearBloqueo } from "../src/services/bloqueo.js";

test("bloquea al quinto fallo y avisa cuántos intentos quedan", () => {
  const b = crearBloqueo({ max: 5 });
  assert.deepEqual(b.registrarFallo("a"), { bloqueado: false, quedan: 4 });
  b.registrarFallo("a");
  b.registrarFallo("a");
  assert.deepEqual(b.registrarFallo("a"), { bloqueado: false, quedan: 1 });
  assert.deepEqual(b.registrarFallo("a"), { bloqueado: true, quedan: 0 });
  assert.equal(b.estaBloqueado("a"), true);
});

test("el bloqueo vence a los 15 minutos", () => {
  let t = 1000;
  const b = crearBloqueo({ max: 2, duracionMs: 15 * 60 * 1000, ahora: () => t });
  b.registrarFallo("a");
  b.registrarFallo("a");
  assert.equal(b.estaBloqueado("a"), true);
  t += 15 * 60 * 1000 + 1;
  assert.equal(b.estaBloqueado("a"), false);
});

test("las claves se cuentan por separado y limpiar reinicia la cuenta", () => {
  const b = crearBloqueo({ max: 2 });
  b.registrarFallo("a");
  b.registrarFallo("b");
  assert.equal(b.estaBloqueado("a"), false);
  b.limpiar("a");
  assert.deepEqual(b.registrarFallo("a"), { bloqueado: false, quedan: 1 });
});

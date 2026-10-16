// A partir de octubre el año de ingreso pasa al año siguiente.
export function anioIngreso() {
  const d = new Date();
  return d.getMonth() >= 9 ? d.getFullYear() + 1 : d.getFullYear();
}

export function anio(sumar = 0) {
  return anioIngreso() + sumar;
}

export function irA(id) {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducido ? "auto" : "smooth" });
}

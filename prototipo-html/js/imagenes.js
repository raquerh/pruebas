var IMGS = {
  AUTORIDADES: "img/autoridades.jpg",
  B_CARRERA: "img/b-carrera.jpg",
  B_PLAN: "img/b-plan.jpg",
  B_ALUMNOS: "img/b-alumnos.jpg",
  B_EVENTOS: "img/b-eventos.jpg",
  B_CONTACTO: "img/b-contacto.jpg",
  HERO: "img/hero.jpg",
  LOGO: "img/logo.png",
  VERDURAS: "img/verduras.jpg",
  PLATO: "img/plato.jpg",
  MORRON: "img/morron.jpg",
  ESTUDIO: "img/b-contacto.jpg",
};
document.querySelectorAll("[data-img]").forEach(function (e) {
  e.src = IMGS[e.getAttribute("data-img")];
});
document.querySelectorAll("[data-fondo]").forEach(function (e) {
  e.style.setProperty("--foto", "url(" + IMGS[e.getAttribute("data-fondo")] + ")");
});

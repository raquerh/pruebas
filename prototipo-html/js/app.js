(function () {
  var rol = "admin";
  var SOLO_ADMIN = ["admin-eventos", "admin-evento-nuevo", "admin-contenido", "admin-usuarios"];
  var INTENTOS_MAX = 5,
    intentos = 0,
    bloqueadoHasta = 0;
  var enc = document.getElementById("encabezado"),
    pie = document.getElementById("pie");
  var PUB = ["inicio", "carrera", "plan", "alumnos", "eventos", "evento", "contacto", "ingreso"];
  function ruta() {
    var r = (location.hash || "#/inicio").replace("#/", "") || "inicio";
    return r;
  }
  function mostrar() {
    var r = ruta(),
      ancla = null;
    if (r === "plan") {
      r = "carrera";
      ancla = "plan-estudios";
    }
    if (rol === "bedelia" && SOLO_ADMIN.indexOf(r) > -1) {
      location.hash = "#/admin";
      return;
    }
    if (!document.querySelector('[data-pagina="' + r + '"]')) r = "inicio";
    document.querySelectorAll("[data-pagina]").forEach(function (p) {
      p.classList.toggle("activa", p.getAttribute("data-pagina") === r);
    });
    var pub = PUB.indexOf(r) > -1;
    enc.style.display = pub ? "" : "none";
    pie.style.display = pub ? "" : "none";
    var base = r === "evento" ? "eventos" : r;
    document.querySelectorAll(".menu a").forEach(function (a) {
      var s = a.getAttribute("data-ruta") === base;
      a.classList.toggle("actual", s);
      if (s) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
    if (ancla) {
      var el = document.getElementById(ancla);
      if (el) el.scrollIntoView();
    }
    revisar();
    document.getElementById("menu").classList.remove("abierto");
  }
  function revisar() {
    enc.classList.toggle("fijo", window.scrollY > 40);
  }
  window.addEventListener("scroll", revisar, { passive: true });
  window.addEventListener("hashchange", mostrar);
  var b = document.getElementById("boton-menu"),
    m = document.getElementById("menu");
  b.addEventListener("click", function () {
    var a = m.classList.toggle("abierto");
    b.setAttribute("aria-expanded", a);
  });
  document.querySelectorAll(".pestanas").forEach(function (g) {
    g.addEventListener("click", function (e) {
      var t = e.target.closest("button");
      if (!t) return;
      g.querySelectorAll("button").forEach(function (x) {
        x.setAttribute("aria-selected", x === t);
      });
      var id = t.getAttribute("data-tab");
      if (!id) return;
      var cont = g.parentElement;
      cont.querySelectorAll(":scope > .panel-tab").forEach(function (p) {
        p.classList.toggle("activa", p.id === id);
      });
    });
  });
  document.querySelectorAll(".miniaturas button").forEach(function (x) {
    x.addEventListener("click", function () {
      document.getElementById("foto-principal").src = IMGS[x.getAttribute("data-foto")];
      document.querySelectorAll(".miniaturas button").forEach(function (y) {
        y.setAttribute("aria-pressed", y === x);
      });
    });
  });
  document.querySelectorAll(".secciones-lista button").forEach(function (x) {
    x.addEventListener("click", function () {
      document.querySelectorAll(".secciones-lista button").forEach(function (y) {
        y.setAttribute("aria-pressed", y === x);
      });
    });
  });
  var c = document.getElementById("carrusel");
  function paso() {
    var li = c.querySelector("li");
    return li ? li.getBoundingClientRect().width + 24 : 300;
  }
  function mover(d) {
    var max = c.scrollWidth - c.clientWidth - 4;
    if (d > 0 && c.scrollLeft >= max) {
      c.scrollTo({ left: 0 });
      return;
    }
    if (d < 0 && c.scrollLeft <= 0) {
      c.scrollTo({ left: max });
      return;
    }
    c.scrollBy({ left: d * paso() });
  }
  document.querySelectorAll("[data-car]").forEach(function (x) {
    x.addEventListener("click", function () {
      mover(+x.getAttribute("data-car"));
    });
  });
  var quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    pausa = false;
  ["mouseenter", "focusin"].forEach(function (ev) {
    c.addEventListener(ev, function () {
      pausa = true;
    });
  });
  ["mouseleave", "focusout"].forEach(function (ev) {
    c.addEventListener(ev, function () {
      pausa = false;
    });
  });
  if (!quieto)
    setInterval(function () {
      if (!pausa && !document.hidden && ruta() === "inicio") mover(1);
    }, 5000);
  var vb = document.querySelectorAll(".vista button"),
    vw = document.querySelector(".vista"),
    ge = document.querySelector('[data-pagina="eventos"] .grilla-eventos');
  vb.forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-vista") === "lista";
      ge.classList.toggle("lista", l);
      vw.classList.toggle("es-lista", l);
      vb.forEach(function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
    });
  });
  document.querySelectorAll("[data-abrir]").forEach(function (a) {
    a.addEventListener("click", function () {
      var t = document.querySelector(
        '.pestanas[data-grupo="plan"] [data-tab="' + a.getAttribute("data-abrir") + '"]',
      );
      if (t) t.click();
    });
  });

  function anioIngreso() {
    var d = new Date();
    return d.getMonth() >= 9 ? d.getFullYear() + 1 : d.getFullYear();
  }
  var AI = anioIngreso();
  document.querySelectorAll("[data-anio]").forEach(function (e) {
    e.textContent = AI + parseInt(e.getAttribute("data-anio"), 10);
  });
  document.querySelectorAll("[data-anio-valor]").forEach(function (e) {
    e.value = AI + parseInt(e.getAttribute("data-anio-valor"), 10);
  });
  var urlGuia = "docs/guia-de-preingreso.pdf";
  function guia() {
    return urlGuia;
  }
  document.getElementById("ver-pdf").addEventListener("click", function () {
    window.open(guia(), "_blank");
  });
  document.getElementById("bajar-pdf").addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = guia();
    a.download = "Guia-de-preingreso.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
  var suave = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.querySelectorAll("[data-ir]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.getElementById(b.getAttribute("data-ir")).scrollIntoView({ behavior: suave });
    });
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href="#/plan"]');
    if (a && ruta() === "carrera") {
      e.preventDefault();
      document.getElementById("plan-estudios").scrollIntoView({ behavior: suave });
    }
  });
  document.querySelectorAll(".secciones-lista button").forEach(function (b) {
    b.addEventListener("click", function () {
      var p = b.getAttribute("data-panel") || "autoridades";
      document.querySelectorAll(".panel-cont").forEach(function (f) {
        f.hidden = f.getAttribute("data-panel") !== p;
      });
    });
  });
  /* ---- Roles: administrador (acceso total) y Bedelía (solo información académica) ---- */
  function aplicarRol(r) {
    rol = r;
    document.body.setAttribute("data-rol", r);
    var esBed = r === "bedelia";
    document.querySelectorAll("[data-usuario]").forEach(function (u) {
      u.innerHTML = esBed
        ? '<span class="avatar">BD</span>Bedelía'
        : '<span class="avatar">MP</span>Matías Peláez';
    });
    var s = document.getElementById("saludo-admin");
    if (s) s.textContent = esBed ? "Hola, Bedelía" : "Hola, Matías";
  }
  aplicarRol("admin");
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-rol]");
    if (a) aplicarRol(a.getAttribute("data-rol"));
  });

  /* ---- Login: acceso con límite de intentos y contraseña de 8+ caracteres (simulado) ---- */
  var fl = document.getElementById("form-login"),
    el = document.getElementById("error-login");
  function errorLogin(t) {
    el.textContent = t;
    el.classList.add("visible", "error");
  }
  fl.addEventListener("submit", function (e) {
    e.preventDefault();
    var ahora = Date.now();
    if (ahora < bloqueadoHasta) {
      errorLogin("Demasiados intentos fallidos. Probá de nuevo en 15 minutos.");
      return;
    }
    var mail = document.getElementById("l-mail").value.trim(),
      pass = document.getElementById("l-pass").value;
    if (!mail || pass.length < 8) {
      intentos++;
      if (intentos >= INTENTOS_MAX) {
        bloqueadoHasta = ahora + 15 * 60 * 1000;
        intentos = 0;
        errorLogin("Demasiados intentos fallidos. Probá de nuevo en 15 minutos.");
      } else {
        errorLogin(
          "Usuario o contraseña incorrectos. Te " +
            (INTENTOS_MAX - intentos === 1
              ? "queda 1 intento."
              : "quedan " + (INTENTOS_MAX - intentos) + " intentos."),
        );
      }
      return;
    }
    intentos = 0;
    el.classList.remove("visible", "error");
    aplicarRol(/^bedel/i.test(mail) ? "bedelia" : "admin");
    location.hash = "#/admin";
  });

  /* ---- Descarga de eventos archivados (simulada) ---- */
  var dAlc = document.getElementById("d-alcance"),
    dPer = document.getElementById("d-periodo"),
    ok = document.getElementById("ok-descarga");
  var PERIODOS = {
    "Por año": ["2025", "2026"],
    "Por cuatrimestre": ["1.° cuatrimestre 2026", "2.° cuatrimestre 2025", "1.° cuatrimestre 2025"],
    "Un evento": ["Noche de los Museos"],
  };
  dAlc.addEventListener("change", function () {
    dPer.innerHTML = PERIODOS[dAlc.value]
      .map(function (p) {
        return "<option>" + p + "</option>";
      })
      .join("");
  });
  document.getElementById("d-boton").addEventListener("click", function () {
    ok.textContent =
      "Se preparó la descarga: " + dAlc.value.toLowerCase() + ", " + dPer.value + ".";
    ok.classList.add("visible");
  });
  document.querySelectorAll("[data-descargar-evento]").forEach(function (b) {
    b.addEventListener("click", function () {
      ok.textContent = "Se preparó la descarga del evento Noche de los Museos.";
      ok.classList.add("visible");
    });
  });

  /* ---- Gestión de usuarios (simulada) ---- */
  var fu = document.getElementById("form-usuario"),
    eu = document.getElementById("error-usuario"),
    oku = document.getElementById("ok-usuario"),
    tu = document.getElementById("tabla-usuarios");
  fu.addEventListener("submit", function (e) {
    e.preventDefault();
    oku.classList.remove("visible");
    var n = document.getElementById("u-nombre").value.trim(),
      m = document.getElementById("u-mail").value.trim(),
      r = document.getElementById("u-rol").value,
      p = document.getElementById("u-pass").value,
      msg = "";
    var repetido = Array.prototype.some.call(tu.querySelectorAll("td:nth-child(2)"), function (c) {
      return c.textContent.toLowerCase() === m.toLowerCase();
    });
    if (!n || !m) msg = "Completá el nombre y el correo.";
    else if (repetido) msg = "Ya hay un usuario con ese correo.";
    else if (p.length < 8 || !/[A-Za-z]/.test(p) || !/[0-9]/.test(p))
      msg = "La contraseña debe tener al menos 8 caracteres, con letras y números.";
    if (msg) {
      eu.textContent = msg;
      eu.classList.add("visible", "error");
      return;
    }
    eu.classList.remove("visible", "error");
    var tr = document.createElement("tr");
    [n, m].forEach(function (t, i) {
      var td = document.createElement("td");
      if (i === 0) {
        var s = document.createElement("strong");
        s.textContent = t;
        td.appendChild(s);
      } else td.textContent = t;
      tr.appendChild(td);
    });
    var tdr = document.createElement("td"),
      et = document.createElement("span");
    et.className = "etiqueta " + (r === "Administrador" ? "et-verde" : "et-naranja");
    et.textContent = r;
    tdr.appendChild(et);
    tr.appendChild(tdr);
    var tda = document.createElement("td");
    tda.innerHTML =
      '<div class="acciones-fila"><button class="boton boton-linea boton-chico" type="button" data-quitar-usuario>Eliminar</button></div>';
    tr.appendChild(tda);
    tu.appendChild(tr);
    fu.reset();
    oku.classList.add("visible");
  });
  tu.addEventListener("click", function (e) {
    var b = e.target.closest("[data-quitar-usuario]");
    if (!b) return;
    var fila = b.closest("tr");
    if (window.confirm("¿Eliminar a " + fila.querySelector("strong").textContent + "?"))
      fila.remove();
  });

  mostrar();
})();

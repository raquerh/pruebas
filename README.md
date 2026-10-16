# Prototipo del sitio del IFTS N.° 2

Prototipo navegable del nuevo sitio institucional del IFTS N.° 2 (D.E. 20) y de su panel de administración. Lo desarrolla el equipo 404-Solutions (IFTS N.° 29) como proyecto integrador de Práctica Profesionalizante IV.

Es solo frontend: HTML, CSS y JavaScript sin frameworks. No tiene backend ni base de datos, así que los formularios y el panel simulan sus respuestas y nada se guarda al recargar la página.

## Estructura

```
index.html      Todas las pantallas (sitio público y panel), cada una dentro de su <div data-pagina="...">
styles.css      Estilos
js/app.js       Navegación por rutas (#/inicio, #/admin...), roles, login, descargas y usuarios simulados
js/imagenes.js  Lista de imágenes que usa el sitio (apuntan a img/)
img/            Imágenes
docs/           Guía de preingreso en PDF
```

Las pantallas se cambian con el hash de la URL (por ejemplo `#/eventos` o `#/admin-usuarios`).

## Pantallas

Sitio público: inicio, la carrera, ingreso, alumnos, eventos, detalle de un evento y contacto.

Panel de administración: inicio de sesión, inicio del panel, eventos, cargar un evento, información académica, contenido institucional y usuarios.

El acceso al panel no está en el menú superior. Está en el pie de página ("Acceso institucional") y en la ruta `#/login`.

## Cambios de la 2.ª reunión con el instituto (7/10/2026)

Salen del acta de la reunión. El estado indica si ya está en el prototipo.

### Hechos en el prototipo (simulados)

- **Acceso oculto.** El login se sacó del menú superior. Tiene un límite de 5 intentos fallidos (después se bloquea 15 minutos) y pide contraseñas de 8 o más caracteres.
- **Dos roles.** Administrador, con acceso total, y Bedelía, que solo ve Información académica. Si Bedelía intenta entrar a otra pantalla escribiendo la ruta, vuelve al inicio del panel. En el login, un correo que empieza con "bedel" entra como Bedelía; el resto, como administrador. Desde el menú de pantallas se puede ver cada rol.
- **Gestión de usuarios.** Pantalla nueva, solo para administradores: alta con rol, validación de campos vacíos, de correo repetido y de contraseña (8 o más caracteres, con letras y números), y baja con confirmación. La lista es de ejemplo; el instituto va a completar los datos de las cuentas.
- **Descarga de eventos archivados.** En Eventos hay una barra para descargar por año, por cuatrimestre o por evento, y un botón en cada evento archivado. Por ahora solo muestra el aviso de que se preparó la descarga.

### Pendientes: dependen de una respuesta del instituto

- **Archivo en el sitio público.** Falta saber si los eventos de años anteriores se ven en el sitio o solo en el panel.
- **Aprobación previa de Instagram.** Falta saber si la quieren. Si no, se saca la pestaña "Para revisar", los botones Aprobar y Descartar y el indicador de publicaciones para revisar.
- **Ingreso y cuatrimestre.** Hoy el ingreso figura como 2027. Faltan los datos reales y saber si hay ingreso a mitad de año.
- **Autoridades.** Hoy figuran la rectora y la tutora. Falta saber si se suman la secretaría académica o el asesor pedagógico.
- **Plan de estudios.** Falta el PDF del régimen de correlatividades, si lo tienen, y la información de cada materia.

### Pendientes: trabajo del equipo

- **Formulario de contacto por motivo.** El formulario ya tiene el campo "Motivo de la consulta". Falta derivar cada motivo a un correo distinto (Bedelía, institucional, tutoría). El plan gratuito de los servicios de formularios admite un solo destino por formulario, así que hay que investigar la alternativa.
- **Más de una carrera.** El menú y las secciones "La carrera" y "Plan de estudios" asumen una sola. Hay que preparar la estructura para sumar otras.
- **Detalle de la vista mobile del panel.** Menor. Miguel ya lo había corregido en Figma.

### Compromisos abiertos de la reunión

- El instituto completa los datos de las cuentas: tres con acceso total y dos de Bedelía.
- El instituto comparte la clave de Instagram y acepta la invitación de solo lectura.
- Raquel prueba la integración con una cuenta de Instagram de prueba antes de usar la del instituto.
- Valeria investiga si N8N sirve para automatizar Instagram con el sitio.
- El equipo investiga qué pasa cuando una publicación no lleva el hashtag.

### Preguntas que no se le hicieron al instituto

- Videos: si prefieren subirlos o dejarlos como enlace a Instagram.
- Dominio .edu.ar y qué pasa con el Google Site durante la transición.
- Si el teléfono y el correo institucional del sitio actual siguen vigentes.
- Enlaces de preinscripción y de Mi Argentina.
- Si tienen fotos oficiales (el prototipo usa las del sitio actual y algunas generadas con IA).
- Nombre exacto de la cuenta de Instagram y hashtag definitivo.

## Lo que este prototipo no hace

- No guarda datos: no hay base de datos ni servidor.
- El login es una simulación; no verifica usuarios reales.
- Las publicaciones de Instagram son de ejemplo y no hay conexión con la API.
- El formulario de contacto no envía correos.
- Las descargas del panel solo muestran un aviso.

Para la Etapa 3 hay que construir el backend con su base de datos, la autenticación real y las pruebas.

## Equipo

404-Solutions, IFTS N.° 29: Miguel Angel Flores Meehan, Valeria Thomas, Mario David González Benítez, Mariana Aiello y Raquel Rodriguez Herlein.

# Registro de cambios hacia la Etapa 3

Acá se anota, en orden cronológico, qué se cambió en el proyecto y por qué. Cada entrada dice qué se hizo, en qué archivos, cómo se comprobó y qué quedó pendiente.

## 2026-10-16: migración del prototipo a React y estructura del servidor

**Punto de partida.** El prototipo era una página HTML con CSS y JavaScript sueltos (rama `separar-codigo-y-mejoras-reunion2` del repo de Mario), con los cambios pedidos en la 2.ª reunión con el IFTS 2 ya simulados: perfiles Administrador y Bedelía, pantalla de usuarios, descarga de archivados, login fuera del menú superior y límite de intentos. No tenía backend ni base de datos, y la sesión y los datos eran simulados en el navegador. El botón flotante "Pantallas del prototipo" se había quitado antes.

**Motivo.** La Etapa 2 define una arquitectura de tres capas (React, Node con Express, MongoDB con servicios externos). El prototipo no seguía esa arquitectura y la Etapa 3 pide una aplicación con base de datos y CRUD.

**Qué se hizo**
- Se movió el prototipo original a `prototipo-html/`, sin modificarlo, para tenerlo de referencia.
- Se creó `client/` con React 18, Vite y React Router. Las 14 pantallas del prototipo pasaron a un componente cada una en `client/src/pages/`. El HTML se convirtió con un script de una sola vez y después se ajustó a mano.
- Los estilos (`styles.css`) se copiaron sin cambios, salvo las rutas de las imágenes, que ahora apuntan a `/img/` (carpeta `public/`).
- El comportamiento que antes estaba en `js/app.js` se reescribió como código de React:
  - Menú móvil y encabezado fijo: `components/Header.jsx`.
  - Pestañas de Carrera y Alumnos, vista de eventos en grilla o lista, miniaturas del detalle de evento, carrusel del inicio, avisos de los formularios y descarga de la guía en PDF: dentro de cada página.
  - Login con límite de 5 intentos, alta y baja de usuarios con las mismas validaciones, y descarga de archivados: en `Login.jsx`, `AdminUsuarios.jsx` y `AdminEventos.jsx`.
- La sesión y el rol pasaron a un contexto de React (`context/AuthContext.jsx`). Se agregaron rutas protegidas: sin sesión, el panel redirige a `/login`; con el perfil Bedelía, Eventos, Contenido y Usuarios redirigen al inicio del panel.
- El menú lateral del panel, que estaba repetido en seis pantallas, quedó en un solo componente (`components/AdminLateral.jsx`).
- Los enlaces internos dejaron de usar `#/` y pasaron a rutas normales (`/carrera`, `/admin-eventos`, etc.). Se agregó `client/vercel.json` para que las rutas directas funcionen al desplegar.
- Se creó `server/` con Express: `app.js` (seguridad con helmet, CORS, ruta `/api/salud`, respuestas de error en JSON), `db.js` (conexión a MongoDB reutilizable, pensada para Vercel), `index.js` y `.env.example` con las variables previstas.
- Se escribió el `README.md` de la raíz con la arquitectura, cómo ejecutarlo y qué es simulado.

**Cómo se comprobó**
- Compilación con `vite build`, sin errores.
- Comparación de capturas contra el prototipo original: las 8 pantallas públicas y 5 de las 6 del panel salieron idénticas. La sexta (inicio del panel) difiere en un par de píxeles de un texto.
- 25 verificaciones de comportamiento en un navegador automatizado: redirecciones del panel, mensajes del login y bloqueo, menú de Bedelía, alta con correo repetido y contraseña débil, baja con confirmación, descargas, pestañas, vista lista, miniaturas, carrusel, menú móvil y enlace del pie a `/carrera#plan-estudios`. Todas dieron OK.
- 2 pruebas del servidor con `node --test` y supertest (`/api/salud` y ruta inexistente). Pasan.
- Todo se probó en un entorno de pruebas aparte, no en la compu de Raquel. Falta correr `npm install` y `npm run dev` en `client/` en la máquina local.

**Pendiente después de este cambio**
- La sesión, los roles, los usuarios, los eventos y los horarios siguen siendo datos del navegador o de ejemplo.
- No hay rutas de la API, modelos de MongoDB, subida de fotos a Cloudinary, correo del formulario ni integración con Instagram.
- No hay pruebas del cliente ni manuales (Etapa 3).

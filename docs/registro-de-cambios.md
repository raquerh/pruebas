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

## 2026-10-16: login real, permisos por rol y CRUD de usuarios en el servidor

**Motivo.** Era el primer paso de la Etapa 3 sobre el servidor: reemplazar la sesión simulada del navegador por autenticación real (RF08, RNF04) y empezar con un CRUD completo que pudiera probarse de punta a punta.

**Qué se hizo en `server/`**
- Contraseñas guardadas con bcrypt (`services/passwords.js`). La regla es de 8 caracteres como mínimo, con letras y números.
- Login `POST /api/auth/login` que devuelve un token JWT de 8 horas, y `GET /api/auth/yo` para verificar la sesión. Si el correo no existe, se compara igual contra un hash de relleno para que la demora no delate si el correo está registrado.
- Bloqueo tras 5 intentos fallidos durante 15 minutos (`services/bloqueo.js`). Se cuenta por correo y no por IP, porque la IP se puede falsear con el encabezado `X-Forwarded-For` (se detectó probando y se corrigió antes de cerrar este cambio). El contador está en memoria: con varias instancias del servidor, cada una lleva su propia cuenta.
- Middleware `autenticar` (token válido y usuario existente: si se elimina un usuario, su token deja de servir) y `requiereRol`.
- CRUD de usuarios `GET/POST/DELETE /api/usuarios`, solo para el rol Administrador. Valida nombre y correo obligatorios, formato de correo, rol válido, contraseña, correo repetido (409, sin distinguir mayúsculas), que nadie se elimine a sí mismo y que quede al menos un administrador.
- Dos repositorios con la misma interfaz: `usuarios.memoria.js` (desarrollo y pruebas) y `usuarios.mongo.js` con su modelo `models/Usuario.js`. El servidor usa Mongo si existe `MONGODB_URI` y, si no, el modo memoria. En producción exige la base y `JWT_SECRET`.
- Creación del primer administrador al arrancar si no hay usuarios (`services/seed.js`), con los datos de `SEED_ADMIN_*`. En desarrollo hay valores por defecto (documentados en el README).
- Las dependencias se reciben por parámetro en `crearApp(...)`, lo que permite probar la lógica sin base de datos.

**Qué se hizo en `client/`**
- `src/api.js`: función `api()` que agrega el token y traduce los errores del servidor en mensajes.
- `AuthContext` ahora llama a la API (`login`, `logout`) y, al abrir la página, verifica el token guardado en `sessionStorage`. Las rutas protegidas esperan esa verificación antes de decidir.
- `Login.jsx`: se sacó el contador de intentos del navegador (ahora lo lleva el servidor) y los valores precargados del formulario del prototipo.
- `AdminUsuarios.jsx`: la tabla se carga desde la API y el alta y la baja la llaman. Los mensajes de error son los del servidor.

**Cómo se comprobó**
- 28 pruebas automáticas del servidor (`npm test`, con node:test y supertest, repositorio en memoria): validación de contraseñas, hash, bloqueo y su vencimiento, login (correcto, incorrecto, correo inexistente, mayúsculas, token alterado, bloqueo que no se saltea con otra IP), permisos por rol (403 para Bedelía), alta con hash, duplicados, datos inválidos, baja y pérdida de acceso del usuario eliminado.
- 14 verificaciones en un navegador automatizado con el servidor y el cliente corriendo juntos: login y bloqueo, sesión que sobrevive a la recarga, alta con duplicado y contraseña débil, Bedelía con menú restringido y 403 en la API, baja de un usuario y pérdida de su sesión.
- No se probó contra MongoDB: desde el entorno de pruebas no se pudo levantar una base. El código de `usuarios.mongo.js` y del modelo queda sin verificar hasta correrlo con una base real (Atlas o una local).

**Pendiente después de este cambio**
- Probar el servidor con MongoDB.
- Eventos, información académica y contenido institucional siguen como datos de ejemplo en el cliente y no tienen rutas en la API.
- Subida de fotos, correo del formulario, archivado, Instagram y despliegue.

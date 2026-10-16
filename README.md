# Portal web IFTS N.° 2

Proyecto de 404-Solutions para la Práctica Profesionalizante IV (IFTS N.° 29). Reemplaza el Google Site del IFTS N.° 2 por un sitio público y un panel de administración.

Esta rama sigue la arquitectura de tres capas definida en la Etapa 2 (sección 5.7):

| Capa | Tecnología | Carpeta | Estado |
|---|---|---|---|
| Presentación | React (Vite) y React Router | `client/` | Prototipo migrado; login y usuarios conectados a la API, el resto con datos simulados |
| Lógica | Node.js y Express | `server/` | Login con JWT, permisos por rol y CRUD de usuarios; faltan eventos, información académica, contenido, contacto e Instagram |
| Datos y servicios | MongoDB Atlas, Cloudinary, API de Instagram, correo de Bedelía | | Sin conectar |

El prototipo original en HTML, CSS y JavaScript quedó en `prototipo-html/` como referencia.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```
cd client
npm install
npm run dev
```

Se abre en http://localhost:5173. El panel necesita el servidor corriendo:

```
cd server
npm install
npm run dev
```

El servidor escucha en el puerto 4000 y el cliente le reenvía las llamadas a `/api` (ver `client/vite.config.js`). Sin `MONGODB_URI` el servidor arranca en modo memoria: los datos se pierden al reiniciarlo, pero sirve para desarrollar. En ese modo crea un administrador inicial:

- Correo: `matias.pelaez@ifts2.edu.ar`
- Contraseña: `Cambiar1234`

Estos valores son solo para desarrollo. En producción hay que definir `MONGODB_URI`, `JWT_SECRET`, `SEED_ADMIN_MAIL` y `SEED_ADMIN_PASSWORD` (ver `server/.env.example`). Para entrar como Bedelía, crear antes ese usuario desde Usuarios.

Pruebas del servidor:

```
cd server
npm test
```

## Estructura

```
client/
  public/            imágenes (img/) y guía de preingreso (docs/)
  src/
    pages/           una pantalla por archivo (sitio público y panel)
    components/      Header, Footer, AdminLateral, Layout, rutas protegidas
    context/         AuthContext: sesión y rol
    api.js           llamadas a la API con el token de sesión
    styles.css       estilos del prototipo, sin cambios
server/
  src/               app de Express: rutas, middleware, servicios, repositorios y modelo de Mongo
  test/              pruebas con node:test y supertest
prototipo-html/      versión original en HTML puro
```

## Qué es real y qué es simulado

Funciona de verdad contra el servidor:

- Inicio de sesión con contraseñas guardadas con bcrypt y token JWT de 8 horas.
- Bloqueo de 15 minutos tras 5 intentos fallidos, contado por correo.
- Permisos por rol validados en la API: Bedelía recibe 403 en la gestión de usuarios, y las rutas del panel también están protegidas en el cliente.
- Alta y baja de usuarios, con validación de campos, correo repetido y contraseña (8 caracteres como mínimo, con letras y números).

Sigue simulado o sin conectar:

- Eventos, información académica, contenido institucional y descarga de archivados: datos de ejemplo en el cliente.
- Subida de fotos, formulario de contacto e integración con Instagram.
- Con la base MongoDB: el código existe (`server/src/repos/usuarios.mongo.js`) pero todavía no se probó contra una base real; las pruebas usan el repositorio en memoria.

## Lo que falta para cumplir la arquitectura

1. Probar el servidor contra MongoDB Atlas y crear el administrador inicial en producción.
2. Rutas de la API y modelos para eventos, información académica y contenido institucional (CRUD con validaciones).
3. Subida de fotos a Cloudinary, con compresión y máximo de 20 por evento.
4. Archivado automático y descarga de lo archivado.
5. Formulario de contacto con envío real de correo y reCAPTCHA.
6. Integración con Instagram (Graph API, hashtag acordado, renovación del token con tarea programada).
7. Reemplazar los datos fijos de `client/src/pages/` por llamadas a la API.
8. Despliegue en Vercel con variables de entorno.
9. Pruebas del cliente, manual técnico y manual de usuario (Etapa 3).

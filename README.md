# Portal web IFTS N.° 2

Proyecto de 404-Solutions para la Práctica Profesionalizante IV (IFTS N.° 29). Reemplaza el Google Site del IFTS N.° 2 por un sitio público y un panel de administración.

Esta rama sigue la arquitectura de tres capas definida en la Etapa 2 (sección 5.7):

| Capa | Tecnología | Carpeta | Estado |
|---|---|---|---|
| Presentación | React (Vite) y React Router | `client/` | Prototipo migrado, con datos simulados |
| Lógica | Node.js y Express | `server/` | Estructura base, falta implementar las rutas |
| Datos y servicios | MongoDB Atlas, Cloudinary, API de Instagram, correo de Bedelía | | Sin conectar |

El prototipo original en HTML, CSS y JavaScript quedó en `prototipo-html/` como referencia.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```
cd client
npm install
npm run dev
```

El sitio queda en http://localhost:5173. Para el panel, ir a `/login` e ingresar con cualquier correo y una contraseña de 8 caracteres o más. Si el correo empieza con `bedel`, entra con el perfil Bedelía; con cualquier otro, entra como Administrador.

El servidor (todavía sin rutas de negocio):

```
cd server
npm install
cp .env.example .env
npm run dev
npm test
```

En desarrollo, el cliente reenvía las llamadas a `/api` al servidor en el puerto 4000 (ver `client/vite.config.js`).

## Estructura

```
client/
  public/            imágenes (img/) y guía de preingreso (docs/)
  src/
    pages/           una pantalla por archivo (sitio público y panel)
    components/      Header, Footer, AdminLateral, Layout, rutas protegidas
    context/         AuthContext: sesión y rol
    styles.css       estilos del prototipo, sin cambios
server/
  src/               app de Express, conexión a MongoDB
  test/              pruebas con supertest
prototipo-html/      versión original en HTML puro
```

## Qué es real y qué es simulado

- La sesión y los roles (Administrador y Bedelía) se guardan en el navegador. Las rutas del panel están protegidas en el cliente: sin sesión redirigen a `/login`, y Bedelía no entra a eventos, contenido ni usuarios.
- El límite de 5 intentos fallidos del login y la gestión de usuarios funcionan solo en memoria.
- Los eventos, horarios, contenido institucional y la descarga de archivados son datos de ejemplo.
- Instagram, el formulario de contacto y la subida de fotos todavía no están conectados.

## Lo que falta para cumplir la arquitectura

1. Modelos de MongoDB y rutas de la API: autenticación con bcrypt y JWT, permisos por rol en el servidor, CRUD de contenido estanco, información académica, eventos y usuarios.
2. Subida de fotos a Cloudinary, con compresión y máximo de 20 por evento.
3. Archivado automático y descarga de lo archivado.
4. Formulario de contacto con envío real de correo y reCAPTCHA.
5. Integración con Instagram (Graph API, hashtag acordado, renovación del token con tarea programada).
6. Reemplazar los datos fijos de `client/src/pages/` por llamadas a la API.
7. Despliegue en Vercel con variables de entorno.
8. Pruebas unitarias y de integración, manual técnico y manual de usuario (Etapa 3).

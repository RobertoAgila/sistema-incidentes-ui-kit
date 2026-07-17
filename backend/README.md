# Actividad 8 - Backend y Base de Datos (API REST)

API REST para el **Sistema de Gestión de Incidentes**, desarrollada con Node.js, Express, MongoDB y Mongoose. Permite crear, consultar, actualizar y eliminar tickets.

## Tecnologías

- Node.js
- Express
- MongoDB Community Server o MongoDB Atlas
- Mongoose
- Postman

## Estructura

```text
backend/
├── postman/
│   └── Actividad8_Tickets_API.postman_collection.json
├── src/
│   ├── config/database.js
│   ├── controllers/ticketController.js
│   ├── middlewares/errorHandler.js
│   ├── models/Ticket.js
│   ├── routes/ticketRoutes.js
│   ├── app.js
│   ├── seed.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Modelo de Ticket

| Campo | Valores / reglas |
|---|---|
| titulo | Obligatorio, 4 a 120 caracteres |
| descripcion | Obligatorio, 10 a 1000 caracteres |
| categoria | Red, Hardware o Software |
| prioridad | Alta, Media o Baja |
| estado | Abierto, En Progreso o Cerrado |
| fechaCreacion | Generada automáticamente |
| fechaActualizacion | Generada automáticamente |

MongoDB genera automáticamente el campo `_id` como identificador único.

## Instalación local

1. Instale Node.js, MongoDB Community Server, MongoDB Compass y Postman.
2. Abra una terminal dentro de esta carpeta.
3. Instale las dependencias:

```bash
npm install
```

4. Copie `.env.example` y cambie el nombre de la copia a `.env`.
5. Para MongoDB local, deje la conexión así:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/helpdesk_incidentes
NODE_ENV=development
```

6. Inicie el servidor en modo desarrollo:

```bash
npm run dev
```

7. Debe aparecer:

```text
MongoDB conectado: 127.0.0.1/helpdesk_incidentes
Servidor activo en http://localhost:3000
```

## Datos de prueba opcionales

Con el servidor detenido, ejecute:

```bash
npm run seed
```

Este comando limpia la colección e inserta cuatro tickets de ejemplo.

## Endpoints

| Método | Ruta | Acción |
|---|---|---|
| GET | `/api/health` | Verifica que la API esté activa |
| GET | `/api/tickets` | Lista todos los tickets |
| GET | `/api/tickets/:id` | Busca un ticket por su ID |
| POST | `/api/tickets` | Crea un ticket |
| PUT | `/api/tickets/:id` | Actualiza un ticket |
| DELETE | `/api/tickets/:id` | Elimina un ticket |

También se puede filtrar el listado con parámetros como:

```text
GET /api/tickets?estado=Abierto&prioridad=Alta
```

## Ejemplo para POST

```json
{
  "titulo": "Falla de conexión WiFi",
  "descripcion": "El computador no logra conectarse a la red inalámbrica institucional.",
  "categoria": "Red",
  "prioridad": "Alta",
  "estado": "Abierto"
}
```

## Pruebas en Postman

1. Abra Postman.
2. Seleccione **Import**.
3. Importe `postman/Actividad8_Tickets_API.postman_collection.json`.
4. Ejecute primero **Crear ticket - POST**. La colección guarda automáticamente el `_id` recibido en la variable `ticketId`.
5. Ejecute GET, PUT y DELETE en el orden indicado.

## Variables de entorno y seguridad

- Las credenciales o cadenas de conexión se guardan en `.env`.
- El archivo `.env` no debe subirse a GitHub.
- `.env.example` sí se publica, pero no contiene contraseñas reales.
- La API usa Helmet, CORS, validación de Mongoose y límite para el cuerpo JSON.

### MongoDB Atlas

Para usar Atlas, sustituya el valor de `MONGODB_URI` por la cadena entregada por el clúster. No publique el usuario ni la contraseña en el repositorio.

## GitHub: rama solicitada

Desde la raíz del repositorio:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/backend-api
git add backend
git commit -m "feat: agregar API REST de tickets con MongoDB"
git push -u origin feature/backend-api
```

Después de revisar la rama:

```bash
git checkout develop
git pull origin develop
git merge feature/backend-api
git push origin develop
```

## Comprobación del código

```bash
npm run check
```

## Referencias oficiales

- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/docs/
- Postman: https://learning.postman.com/docs/

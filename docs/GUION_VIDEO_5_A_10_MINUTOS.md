# Guion para la sustentación

## 0:00 - 0:40 | Presentación

- Mostrar el rostro.
- Indicar nombre completo, asignatura y actividad.
- Explicar que se demostrará una aplicación Full Stack desplegada.

## 0:40 - 2:00 | Arquitectura

- Vercel aloja el frontend React.
- Render ejecuta la API Node.js/Express.
- MongoDB Atlas almacena la colección `tickets`.
- Las tres capas se comunican por HTTPS y JSON.

## 2:00 - 4:30 | Código fuente

- Mostrar `frontend/src/components`.
- Explicar `Dashboard`, `TicketForm`, `TicketList` y `Navigation`.
- Mostrar `frontend/src/services/api.js`.
- Mostrar `backend/src/controllers/ticketController.js` y `Ticket.js`.
- Explicar variables de entorno, CORS y validaciones.

## 4:30 - 7:30 | Demostración en vivo

- Abrir la URL pública.
- Crear un ticket.
- Mostrarlo en el listado y en el dashboard.
- Actualizar su estado.
- Eliminar el ticket.
- Mostrar el documento en MongoDB Atlas.

## 7:30 - 8:30 | Despliegue y cierre

- Mostrar Vercel, Render y Atlas.
- Mostrar el repositorio y las ramas.
- Resumir aprendizajes y despedirse.

Verifique que el enlace del video esté configurado como público o accesible mediante enlace.

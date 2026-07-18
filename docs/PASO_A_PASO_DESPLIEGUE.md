# Paso a paso de despliegue

## Orden recomendado

1. Crear la rama `feature/frontend-fullstack` desde `develop`.
2. Copiar `frontend/`, actualizar `backend/` y agregar `render.yaml`.
3. Probar localmente el backend y el frontend.
4. Crear MongoDB Atlas, usuario de base de datos y acceso de red.
5. Copiar la cadena `mongodb+srv://...` y guardarla como variable en Render.
6. Desplegar el backend en Render con Root Directory `backend`.
7. Probar `https://TU-BACKEND.onrender.com/api/health`.
8. Desplegar el frontend en Vercel con Root Directory `frontend`.
9. Configurar `VITE_API_URL=https://TU-BACKEND.onrender.com`.
10. Volver a Render y configurar `CLIENT_URLS=https://TU-FRONTEND.vercel.app`.
11. Ejecutar en la web: crear, listar, actualizar y eliminar.
12. Tomar capturas, subir video y completar el PDF final.

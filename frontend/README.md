# Frontend - Sistema de Gestión de Incidentes

SPA desarrollada con React y Vite. Consume la API REST de la Actividad 8 para listar, crear, actualizar y eliminar tickets.

## Componentes principales

- `Navigation`: navegación SPA sin recargar la página.
- `Dashboard`: métricas y actividad reciente.
- `TicketForm`: registro y desinfección básica de datos.
- `TicketList`: filtros, actualización de estado y eliminación.

## Ejecución local

```bash
npm install
copy .env.example .env
npm run dev
```

Configure `.env`:

```env
VITE_API_URL=http://localhost:3000
```

## Producción

```bash
npm run build
npm run preview
```

En Vercel configure la raíz del proyecto como `frontend` y agregue `VITE_API_URL` con la URL pública de Render, sin `/api` al final.

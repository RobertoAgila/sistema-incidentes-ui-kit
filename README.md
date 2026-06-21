# Actividad #5 - UI Kit para Sistema de Gestión de Incidentes

## Descripción
Este proyecto presenta una biblioteca de componentes visuales reutilizables creada con HTML5 y CSS3 puro. El objetivo es establecer una línea gráfica base para un sistema Help Desk o sistema de gestión de incidentes.

## Componentes incluidos
- Variables CSS en `:root` para colores, tipografía, radios, sombras y medidas.
- Regla global `box-sizing: border-box`.
- Botones: primario, secundario, peligro y fantasma.
- Formularios: `input`, `select` y `textarea` con estados de foco.
- Cards: tarjetas para representar tickets de soporte.
- Badges: etiquetas para prioridad alta, media, baja y estado cerrado.
- Alertas: mensajes de éxito, advertencia y error.
- Diseño responsive para escritorio, tablet y móvil.

## Estructura del proyecto
```text
actividad5_ui_kit/
├── index.html
├── style.css
└── README.md
```

## Uso básico
1. Abrir `index.html` en el navegador.
2. Revisar los componentes visuales disponibles.
3. Reutilizar las clases CSS en las páginas del sistema de gestión de incidentes.

## Clases principales
```html
<button class="btn btn--primary">Registrar incidente</button>
<button class="btn btn--secondary">Ver historial</button>
<button class="btn btn--danger">Eliminar ticket</button>
<span class="badge badge--high">Alta</span>
<article class="ticket-card" data-priority="alta">...</article>
```

## Control de versiones sugerido
```bash
git checkout develop
git pull origin develop
git checkout -b feature/ui-kit
git add index.html style.css README.md
git commit -m "Crear UI Kit base para sistema de incidentes"
git push -u origin feature/ui-kit
```

Luego se debe crear un Pull Request desde `feature/ui-kit` hacia `develop` y fusionarlo.

## Repositorio
Reemplazar con el enlace real del repositorio de GitHub:

`https://github.com/usuario/repositorio/tree/feature/ui-kit`

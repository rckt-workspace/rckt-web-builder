# Diferenciar fugas y adaptar manchas por altura

## Cambios
- Convertir “Qué le duele” en un encabezado horizontal seguido de bloques de fuga en grid, conservando todos los textos actuales.
- Añadir icono, numeración, resolución separada y animación escalonada; adaptar columnas según haya tres o cuatro dolores.
- Sustituir la regla global fija de dos manchas por una clasificación automática: dos en secciones largas y una alternada potente/suave en secciones cortas.
- Excluir de las manchas los encabezados fotográficos, cierres fotográficos y secciones que integren una banda naranja.

## Detalles técnicos
- Medir cada sección con `ResizeObserver`, usando 700 px en escritorio y 600 px en móvil, y recalcular al cambiar el tamaño.
- Marcar cada sección elegible como larga, corta-potente o corta-suave según su orden dentro de la página.
- Mantener las animaciones con umbral 0.15, una sola vez y sin movimiento cuando el sistema reduzca animaciones.

## Verificación
- Revisar Inicio, Demand System, Nosotros, Salud e Industria a 1280 y 390 px, en claro y oscuro.
- Confirmar número y alternancia de manchas, diferencias entre “Qué le duele” y “Lo que hacemos”, ausencia de desplazamiento horizontal y compilación correcta.

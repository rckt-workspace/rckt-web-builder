# Unificar las páginas de Sectores

## Cambios
- Añadir el párrafo de contexto indicado al héroe del índice y de las seis páginas de sector.
- Mostrar la parte naranja de todos los títulos con la misma tipografía del título, sin cursiva ni rotación.
- Sustituir los encabezados tipo cápsula por el encabezado compartido del Home, conservando cada título de sección.
- Unificar los fondos y eliminar la decoración exclusiva de Sectores.
- Convertir “Qué le duele” al estilo de tarjetas de capacidades, sin iconos.
- Convertir “Lo que hacemos” en la banda naranja compartida, manteniendo contenido y enlaces.
- Reemplazar “Casos del sector” por “El método” en Salud y Servicios B2B, usando la ficha compartida con los datos facilitados.

## Alcance técnico
- Ampliar `SectorPage` con `context` y los datos de la ficha del método.
- Reutilizar `SectionHeader`, `MethodCard` y los estilos compartidos existentes; añadir solo la variante sin icono necesaria para las tarjetas de dolor.
- Mantener intactos navegación, agente conversacional, textos no solicitados y páginas ajenas a Sectores.

## Verificación
- Revisar `/sectores/`, Salud, Servicios B2B y Educación a 1280 y 390 px, en claro y oscuro.
- Confirmar legibilidad, fondos alternados, ausencia de adornos antiguos y desplazamiento horizontal, y compilación correcta.

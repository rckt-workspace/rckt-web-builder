# Landings Revenue Engine B2B Madrid

## Alcance
- Crear `/lp/revenue-engine-b2b-madrid` y `/lp/revenue-engine-b2b-madrid-b` como páginas independientes, sin navegación ni pie globales.
- Compartir un componente visual propio con estilo de tablero comercial; la versión B solo acortará visualmente el formulario mediante CSS aislado.
- Reutilizar `QualificationForm` y el mismo `onSubmit` de Revenue Diagnostic, sin modificar el formulario ni ningún servicio.
- Ocultar el lanzador global del agente únicamente mientras estas landings estén montadas, sin modificar el agente.

## Diseño y contenido
- Construir cabecera mínima sobre la foto B2B, diagnóstico en filas, pipeline de cinco etapas, hitos 30/60/90, prueba, integraciones, filtro, FAQ, formulario, cierre naranja y línea legal.
- Reproducir literalmente los textos entregados y aplicar identidad RCKT, fondos alternados con manchas y modo oscuro.
- Aplicar entradas una sola vez con umbral 0.15 y respetar movimiento reducido.
- En la versión B, ocultar solo los campos indicados con selectores CSS sobre sus identificadores y mantener visibles privacidad y envío.

## Metadatos y validación
- Añadir metadatos únicos en ambas rutas: título, descripción, Open Graph, Twitter, canonical y `noindex, follow`.
- Verificar el build, la versión A a 1280 y 390 px, y el formulario de la versión B a 390 px.

## Archivos previstos
- Nuevo componente visual en `src/components/rckt/RevenueEngineB2BLanding.tsx`.
- Nuevas rutas en `src/routes/lp.revenue-engine-b2b-madrid.tsx` y `src/routes/lp.revenue-engine-b2b-madrid-b.tsx`.
- Estilos aislados `.b2b-lp` en `src/styles.css`.
- Ajuste mínimo en `src/routes/__root.tsx` para ocultar el lanzador en estas dos rutas.
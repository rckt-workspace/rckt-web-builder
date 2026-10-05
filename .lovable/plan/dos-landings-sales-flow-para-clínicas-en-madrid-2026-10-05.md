# Dos landings Sales Flow para clínicas en Madrid

## Alcance
- Crear `/lp/sales-flow-clinicas-madrid` y `/lp/sales-flow-clinicas-madrid-b` como páginas independientes, sin navegación ni pie globales.
- Compartir un componente visual propio entre ambas versiones; la única diferencia será el titular del hero.
- Mantener intactos `QualificationForm`, su configuración y su envío; insertarlo con el mismo `onSubmit` que usa Revenue Diagnostic.

## Diseño y contenido
- Construir cabecera mínima sobre la foto clínica, hero completo, calculadora local, recorrido vertical sticky, hitos 30/60/90, prueba, integraciones, filtro, FAQ, formulario, cierre y línea legal.
- Reproducir literalmente los textos entregados y aplicar la identidad visual existente, modo oscuro, fondos alternados y manchas.
- Añadir animaciones de entrada una sola vez con umbral 0.15 y respeto por movimiento reducido.
- Ocultar el lanzador global del agente únicamente mientras una de estas landings esté montada, sin modificar su componente.

## Metadatos y validación
- Añadir a ambas rutas el título indicado, descripción propia, Open Graph, Twitter, canonical y `noindex, follow`.
- Verificar con una captura de la versión A a 1280 px y otra a 390 px, además del build.

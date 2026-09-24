# Rediseñar la plantilla de las seis páginas de sector

## Alcance
- Mantener sin cambios los seis héroes, el índice `/sectores/`, la navegación, el chat y los textos actuales no mencionados.
- Aplicar la nueva estructura solo a las seis páginas construidas con `SectorPage`.

## Implementación
1. **Recorrido de venta con fotografía**
   - Asociar a cada sector su imagen existente y crear el bloque 40/60 en escritorio, apilado con foto primero en móvil.
   - Adaptar `SectorJourney` a un recorrido vertical compacto, con círculos de hasta 44 px, fugas existentes y animación secuencial de estela y etapas.
2. **Dolores e indicador**
   - Conservar `CapabilityCards` y ajustar sus medidas al máximo indicado.
   - Añadir la franja naranja a ancho completo con indicador, sistema recomendado y una sola mancha clara.
3. **Lo que hacemos y ficha sticky**
   - Crear el bloque 60/40 con cinco filas descriptivas y ficha clara sticky en escritorio, siempre visible también en las variantes cortas.
   - Incorporar exactamente los nuevos contenidos de Construcción, Educación, Ecommerce e Industria; preservar las filas actuales de Salud y B2B.
4. **Cómo empezamos**
   - Reutilizar `AcceptanceSteps` con los tres recorridos indicados y la nota adicional de Construcción.
5. **Método y cierre**
   - Mantener `MethodCard` sin cambios y mostrarlo solo en Salud y Servicios B2B.
   - Conservar el CTA final actual.
6. **Estilo y comportamiento**
   - Alternar fondos sólidos y `SectionBlobs`, completar modo oscuro, limitar tamaños y respetar animación única, umbral 0.15 y movimiento reducido.

## Verificación
- Comparar el héroe antes/después para confirmar que no cambió.
- Revisar Salud, Servicios B2B, Industria y Ecommerce a 1280, 1024 y 390 px, en claro y oscuro.
- Confirmar sticky en escritorio, ausencia de desplazamiento horizontal, orden correcto y compilación sin errores.

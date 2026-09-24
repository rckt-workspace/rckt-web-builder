# Redistribuir las manchas naranjas globales

## Resultado
- Asignar 1, 2 o 3 manchas según la altura real de cada sección, con umbrales adaptados a escritorio y móvil.
- Hacer que las manchas sean claramente visibles dentro de la sección, incluyendo una posición interior cuando haya dos o más.
- Mantener tamaños, desenfoques, intensidades y exclusiones actuales.

## Implementación
- Ampliar `GlobalSectionBlobs` para crear elementos decorativos independientes por sección; así podrán existir tres manchas y posicionarse sin depender solo de dos pseudo-elementos.
- Clasificar alturas con estos umbrales: escritorio 450/1100 px; móvil 360/880 px.
- Alternar varios patrones entre secciones: una mancha interior y las demás en laterales distintos, con sus centros mayoritariamente dentro de los límites.
- Detectar si la mancha interior coincide con un titular o párrafo largo y, en ese caso, usar el núcleo reducido solicitado.
- Mantener `ResizeObserver`, las exclusiones de héroes, CTA finales y secciones con `.band--orange`, además de `overflow: clip`.
- Retirar únicamente las reglas antiguas de pseudo-elementos que queden sustituidas por el nuevo sistema.

## Verificación
- Revisar Home, Nosotros, Demand System, Captación y cierre y Salud a 1280 y 390 px, en claro y oscuro.
- Informar el recuento por sección y confirmar posición interior en secciones con dos o tres manchas.
- Comprobar legibilidad del texto, ausencia de desplazamiento horizontal, errores de consola y errores de compilación.
- No modificar navegación, agente conversacional ni ningún otro contenido.

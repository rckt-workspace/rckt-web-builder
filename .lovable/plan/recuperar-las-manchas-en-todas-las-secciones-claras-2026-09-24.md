# Recuperar las manchas en todas las secciones claras

## Cambios
- Ampliar la detección desde las secciones hijas directas de `main` a todas las secciones de contenido claras, incluidas las creadas por componentes o dentro de contenedores.
- Mantener fuera únicamente los títulos principales, cierres fotográficos, bandas naranjas y secciones cuyo único contenido real sea una tarjeta naranja.
- Corregir la exclusión actual para que una tarjeta naranja integrada no elimine las manchas del resto de su sección.
- Incluir la última sección de contenido antes del cierre, conservando la regla actual de 1, 2 o 3 manchas por altura y una posición interior cuando haya dos o más.
- Ajustar los selectores visuales al nuevo alcance sin cambiar tamaños, intensidad ni colores, y conservar `overflow: clip` para no afectar elementos fijos durante el desplazamiento.

## Verificación
- Registrar a 1280 px el antes y después, sección por sección, en las seis páginas de Sistemas.
- Revisar el resto de páginas solicitado en escritorio y detectar cualquier sección clara elegible sin manchas.
- Verificar las páginas representativas a 1280 y 390 px, en claro y oscuro, confirmando visibilidad, lectura, posiciones interiores y ausencia de desplazamiento horizontal.
- Entregar una tabla por página con secciones sin manchas antes, después y causa; confirmar compilación correcta.

## Alcance
- Solo se modificarán el detector global y sus estilos asociados. No se tocarán textos, navegación, agente conversacional ni contenido de páginas.

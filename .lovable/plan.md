# Corregir manchas globales y FAQ cerradas

## Cambios
- Aplicar las manchas a todas las secciones claras detectadas dentro de `main`, excluyendo únicamente heros, CTA finales, bandas naranjas y envolventes solo naranjas.
- Usar los umbrales 450/1100 px y dos patrones deterministas por índice: potente y suave en las posiciones indicadas; añadir una tercera suave interior al superar 1100 px.
- Garantizar que las manchas queden visibles sobre fondos internos sin tapar el contenido y mantener `overflow: clip`.
- Iniciar todas las preguntas frecuentes cerradas, conservando una sola abierta al interactuar.
- Garantizar que las cuatro cards «Qué no incluye» permanezcan visibles sobre las manchas, sin separarlas de su sección.
- Limitar las capas de contenido a un máximo inferior al menú y reforzar el fondo visible del header fijo, sin cambiar su diseño ni lógica.

## Verificación
- Ejecutar el build y una única pasada a 1280 px, modo claro, en Home, Demand System, Captación y cierre, Sales Flow y Operations System.
- Confirmar recuentos por altura, exclusiones correctas, visibilidad, FAQ cerradas, cards naranjas, menú durante scroll y ausencia de desplazamiento horizontal.

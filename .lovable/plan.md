# Eliminar por completo el grano de los fondos

## Qué cambiaré
- Auditaré toda la carpeta `src` para retirar filtros, imágenes embebidas, capas, pseudoelementos y clases asociadas a grano, ruido, papel o texturas de puntos.
- Dejaré cada fondo de sección como color sólido de marca o alterno; las bandas naranjas conservarán únicamente su degradado limpio.
- Mantendré como única decoración de fondo las manchas difuminadas reutilizables, hechas solo con degradado radial y desenfoque.
- Eliminaré estilos de textura que queden sin uso, sin cambiar textos, composición, navegación ni el agente conversacional.

## Comprobación
- Revisaré Home, Demand System, Captación y cierre, Salud/estética/odontología y Nosotros a 1280 px.
- Comprobaré cada página en claro y oscuro, incluyendo fondos, bandas y CTA final.
- Confirmaré que no hay puntos o grano, que no aparece desplazamiento horizontal y que la compilación termina sin errores.

## Detalles técnicos
- Se conservarán solamente `#f5f2ed`, `#f7ebe1`, `#212121`, `#282625` y el degradado naranja `#fc5c1f → #e04d14` como fondos de sección.
- Los `SectionBlobs` seguirán usando exclusivamente `radial-gradient` y `blur(60px)`.

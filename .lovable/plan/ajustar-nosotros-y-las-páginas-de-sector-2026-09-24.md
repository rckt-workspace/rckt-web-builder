# Ajustar Nosotros y las páginas de sector

## Alcance
- Mantener intactos todos los héroes, la navegación y el asesor conversacional.
- Aplicar únicamente los tres cambios solicitados en `/nosotros/` y en la plantilla compartida de las seis páginas de sector.

## Implementación
1. **Nosotros**
   - Convertir los cinco pilares en una composición editorial sin tarjetas: cinco columnas en escritorio, 3+2 en tablet y una columna en móvil, con separadores adaptados.
   - Mantener “En la práctica” como bloque abierto sin tarjeta.
   - Presentar el manifiesto en una tarjeta premium con tipografía Newsreader, énfasis naranja, firma, degradado y mancha interna; completar su variante oscura.
2. **Cómo vende hoy**
   - Hacer sticky la foto del sector desde 900 px, con `top: 120px` y contenedores compatibles con sticky.
   - Mantener la foto normal en móvil y aumentar a 28 px el espacio vertical del recorrido en escritorio.
3. **Qué le duele**
   - Sustituir las tarjetas por un layout editorial 35/65 con encabezado sticky a la izquierda y filas numeradas a la derecha.
   - Añadir `doloresDetalle` a la plantilla e incorporar exactamente los títulos, descripciones y soluciones indicados en las seis páginas.
   - Añadir el nuevo título con “el dinero” en naranja, separadores, pills, interacción sutil y modo oscuro.
   - Retirar únicamente los estilos específicos de las antiguas tarjetas de dolor que ya no tengan uso.
4. **Verificación**
   - Revisar `/nosotros/`, Salud, Servicios B2B e Industria a 1280, 1024 y 390 px, en claro y oscuro.
   - Confirmar los dos comportamientos sticky en escritorio, su ausencia en móvil, ausencia de scroll horizontal y compilación sin errores.

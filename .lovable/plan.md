# Unificación de palabra destacada en todos los títulos principales

## Implementación
- Crear un tratamiento compartido `hero-hand` exclusivamente para la palabra destacada de los títulos principales: Homemade Apple, `#fc5c1f`, peso 400, tamaño `0.98em`, sin cursiva y rotación de `-2deg`.
- Actualizar Home y todas las páginas interiores indicadas para envolver solo la palabra final destacada con ese tratamiento. Cuando el fragmento naranja actual tenga más de dos palabras, conservar las anteriores con la tipografía normal del título y aplicar Homemade Apple únicamente a la última palabra.
- Mantener intactos textos, imágenes, estructura, navegación, agente y estilos fuera de los títulos principales.
- Sustituir todos los usos restantes de Homemade Apple fuera de esos títulos por la tipografía que ya corresponda a cada bloque, de modo que la fuente manuscrita no aparezca en ningún otro lugar.

## Detalles técnicos
- Centralizar el estilo para evitar variaciones entre títulos y asegurar `display: inline-block`, altura de línea compatible y espacio de seguridad para que la rotación no provoque cortes.
- Revisar títulos compartidos por la plantilla de sectores y títulos definidos directamente en cada página.

## Verificación
- Recorrer todos los títulos solicitados a 1280 y 390 px, en claro y oscuro.
- Comprobar que la palabra manuscrita existe una sola vez por portada, no desborda horizontalmente y no queda recortada.
- Buscar en todo `src/` que Homemade Apple solo permanezca asociada a `hero-hand` y confirmar compilación sin errores.

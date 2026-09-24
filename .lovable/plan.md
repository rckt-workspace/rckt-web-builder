# Ajustar textos y crear el panel People & Culture

## Resultado
- Sustituir únicamente el texto indicado en `/casos/` y actualizar los plazos de aceptación de Demand System y Sales Flow; revisar Ecommerce y cambiarlo solo si presenta ese plazo como pill.
- Crear `/rckt-equipo` como una vista administrativa aislada, sin navegación, pie, agente conversacional, datos persistentes ni conexiones externas.
- Mantener los heros y el resto de páginas sin cambios.

## Panel local
- Cabecera propia con logo RCKT, aviso de datos temporales y tres pestañas: Vacantes, Postulaciones y Blog.
- Vacantes: ejemplos iniciales, alta/edición local, cierre/reapertura y eliminación confirmada.
- Postulaciones: filtros, ejemplos claramente ficticios, detalle modal, cambio de estado y eliminación local; CV deshabilitado.
- Blog: ejemplos iniciales, alta/edición local, publicación/despublicación, eliminación y portada local con validación de tipo, tamaño y orientación.
- Todo se gestionará con estado local de React y comentarios pendientes de conexión en cada acción.

## Diseño y privacidad
- Aplicar los colores, tipografías, tarjetas y modo oscuro existentes, con tamaños moderados y adaptación a 1280 y 390 px.
- Añadir metadatos propios con `noindex, nofollow`; no añadir la ruta a navegación, pie ni sitemap.
- Ocultar el lanzador global del agente en esta ruta sin modificar sus componentes.

## Verificación
- Probar pestañas, formularios, filtros, modal, confirmaciones, estados y previsualización local.
- Confirmar que ninguna interacción genera solicitudes de red, que no hay desplazamiento horizontal y que la compilación termina sin errores.
# Nosotros, Cómo trabajamos y Mercados

## Objetivo
Unificar `/nosotros/` y `/nosotros/como-trabajamos` con el sistema visual actual, y crear `/mercados/` y `/mercados/madrid` sin modificar la navegación superior ni el agente conversacional.

## Cambios
- Actualizar `/nosotros/`: contexto del hero, Manifiesto, cinco pilares, bloque práctico, perfil de cliente sin tabla ni rango de empleados, enlaces finales a Cómo trabajamos y Mercados, y metadatos.
- Actualizar `/nosotros/como-trabajamos`: nuevo contexto del hero y sustituir los tratamientos manuscritos por Switzer semibold naranja.
- Crear `/mercados/`: hero general, mapa simplificado de España con Madrid activa, card de Madrid, enlace externo a Latinoamérica, cierre fotográfico y metadatos propios.
- Crear `/mercados/madrid`: cinco secciones con encabezados compartidos, enlaces a sectores y casos, contacto centralizado, cierre fotográfico, metadatos y JSON-LD `ProfessionalService`.
- Añadir únicamente “Mercados” después de “Nosotros” en la columna Navegar del footer.
- Usar fondos sólidos alternos, manchas existentes, cards claras, naranja de marca y modo oscuro completo.

## Detalles técnicos
- Reutilizar `SystemPageHero`, `SectionHeader`, los tokens globales y la foto del cierre existente.
- Mantener una sola ruta por URL y dejar el comentario pendiente solicitado en Madrid.
- El mapa será SVG accesible y decorativo, con pulso desactivado cuando el sistema pide reducir movimiento.
- Los datos de Madrid se leerán desde la configuración central de contacto; no se tocará lógica de servidor.

## Verificación
- Revisar las cuatro páginas a 1280, 1024 y 390 px en claro y oscuro.
- Confirmar ausencia de “entre 10 y 100”, tipografía manuscrita y scroll horizontal.
- Confirmar mapa visible, Madrid resaltada, enlaces correctos, metadatos y compilación sin errores.

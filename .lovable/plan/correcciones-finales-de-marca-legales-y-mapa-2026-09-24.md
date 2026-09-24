# Correcciones finales de marca, legales y mapa

## Objetivo
Aplicar únicamente las cinco correcciones solicitadas, preservando los heros salvo el texto indicado de Contacto, la navegación salvo su incorporación en legales, el agente conversacional y la página de Recursos.

## Cambios
1. **Páginas legales**
   - Envolver el contenido legal con la navegación y el pie compartidos.
   - Añadir a cada ruta canonical propio, `og:url`, título, descripción completa, `og:title`, `og:description`, `og:type` y `twitter:card`.
   - Retirar “Los términos definitivos se publicarán próximamente.” y comprobar que no quede “próximamente” en las tres páginas.

2. **Textos puntuales**
   - Cambiar “INDICADOR QUE MANDA” por “INDICADOR” en Ecommerce rentable, conservando su valor.
   - Sustituir solo el párrafo contextual del hero de Contacto por el texto exacto indicado.

3. **Mapa real de España**
   - Sustituir la silueta actual por un componente estático reutilizable `SpainMap`, generado desde geometría pública de Natural Earth y sin dependencias ni peticiones en ejecución.
   - Incluir península, Baleares y Canarias en un recuadro separado.
   - Proyectar Madrid desde 40.4168 N, 3.7038 O con la misma fórmula, con punto de 12 px, halo pulsante y etiqueta “Madrid · activo”.
   - Mantener el tamaño máximo actual y usar el componente en Mercados y Madrid.

4. **Paleta global cerrada**
   - Normalizar todos los colores escritos en `src/` a estas bases: `#f5f2ed`, `#212121`, `#fc5c1f`, `#f7ebe1`, permitiendo únicamente transparencias de ellas.
   - Sustituir blancos, negros, grises, marrones y naranjas derivados en CSS, estilos JSX, SVG, sombras, degradados, estados y modo oscuro.
   - Mantener las fotografías sin modificación y no cambiar textos ni estructura fuera de lo pedido.
   - En oscuro, usar `#212121` y el alterno `rgba(245,242,237,0.04)`.

## Verificación
- Escaneo automático de todo `src/` para confirmar que no quede ningún color literal fuera de la lista permitida.
- Revisión con Playwright de Home, un sistema, un sector, Mercados, Madrid, Contacto y las tres páginas legales a 1280 y 390 px, en claro y oscuro.
- Comprobar navegación/pie legales, metadatos, mapa y Madrid, ausencia de desbordamiento, errores de consola y recursos fallidos.
- Confirmar la última compilación automática sin errores.

## Supuestos técnicos
- Se conservarán `noindex` en las páginas legales porque no se pidió retirarlo.
- Los colores internos de archivos de imagen no entran en la auditoría, tal como se indicó.
- La URL canonical solicitada prevalece para estas tres rutas, aunque el contexto técnico general indique otro dominio por defecto.

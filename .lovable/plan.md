# Nueva base visual global RCKT

## Objetivo
Aplicar el manual de marca a todo el sitio sin cambiar textos, rutas, composiciones ni lógica, y sin tocar el agente conversacional.

## Cambios
1. **Tokens globales y tipografía**
   - Sustituir la paleta anterior por naranja `#fc5c1f`, estado `#e04a12`, fondos `#f5f2ed` / `#f7ebe1`, charcoal `#212121` y sus equivalentes oscuros.
   - Eliminar tokens azules, duraznos y Caveat.
   - Cargar Inter Tight y Homemade Apple; aplicar Inter Tight exclusivamente a los `h1` de hero y Homemade Apple exclusivamente a sus frases destacadas.

2. **Lenguaje único de fondos**
   - Crear un adorno reutilizable de manchas radiales naranjas difuminadas, con variantes de posición y versión oscura al 60%.
   - Reemplazar puntos, cuadrículas, rayado, ruido, blobs sólidos, anillos, sellos, marcas de agua y texturas de bandas por esas manchas.
   - Mantener las bandas naranjas con el nuevo degradado limpio.

3. **Secciones y superficies**
   - Alternar automáticamente las secciones de contenido entre fondo base y alterno, preservando el tratamiento propio de heroes y cierres fotográficos.
   - Unificar cards a fondo blanco translúcido y borde charcoal suave; conservar formas y distribución actuales.
   - Cambiar contenedores decorativos a `overflow: clip` para no afectar elementos fijos.

4. **Limpieza de componentes**
   - Retirar `HandNote` de todas las páginas de Sistemas y `HandUnderline` donde siga usado, dejando el texto con Switzer cuando corresponda.
   - Eliminar sus archivos y estilos si no quedan referencias.
   - Adaptar los adornos existentes a la nueva pieza reutilizable sin cambiar la estructura funcional de cada página.

5. **Verificación**
   - Revisar Home, Revenue Engine, Captación y cierre, Salud/Estética/Odontología y Nosotros en 1280 y 390 px, claro y oscuro.
   - Comprobar ausencia de naranja antiguo, peach, azul, Caveat, texturas prohibidas y desplazamiento horizontal en todo `src`.
   - Confirmar compilación y reportar cualquier excepción concreta que no haya podido reemplazarse.

## Nota técnica
La alternancia se resolverá mediante clases globales sobre las secciones de contenido y variantes existentes; los heroes y CTA con foto quedarán excluidos. Los elementos decorativos actuales podrán permanecer en el marcado cuando quitarlos altere estructura, pero sus clases se neutralizarán o convertirán visualmente en manchas para que no rendericen la textura anterior.

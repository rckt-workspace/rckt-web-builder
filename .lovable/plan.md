# Corregir el hueco bajo el hero de Sistemas

## Cambios
- Sustituir la detección local del diagrama por el hook compartido con `threshold 0.15`, `rootMargin: 0px 0px -5% 0px`, ejecución única y detección inmediata si ya está visible.
- Añadir un respaldo de 1,2 segundos y mostrar todo desde el inicio cuando el dispositivo prefiera movimiento reducido.
- Aplicar el mismo criterio a otros componentes altos que aún usen un umbral superior, sin alterar su contenido ni diseño.
- Mantener el hero con altura automática, confirmar que no hay bloques vacíos y conservar el espaciado normal de Arquitectura.

## Verificación
- Comprobar `/sistemas/` a 1280, 1024 y 390 px, en claro y oscuro.
- Confirmar que Arquitectura aparece inmediatamente tras el hero, que la animación funciona al desplazarse y que no existe desplazamiento horizontal.
- Revisar el estado final de compilación y explicar la causa exacta.

## Alcance
- No se cambiarán textos, el diseño del diagrama, la barra de navegación ni el agente conversacional.

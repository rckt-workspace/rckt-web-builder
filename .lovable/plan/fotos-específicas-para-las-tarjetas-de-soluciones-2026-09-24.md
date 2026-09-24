# Fotos específicas para las tarjetas de Soluciones

## Resultado
- Procesar las tres imágenes adjuntas con un ajuste selectivo que reduzca fuertemente azules y cianes, conservando naranjas, negros y cremas.
- Exportarlas como JPG reales a 1600 px de ancho y calidad 85 con los nombres solicitados.
- Asignar cada foto a su tarjeta exacta en `/soluciones/`.

## Implementación
- Transformar únicamente los tonos aproximados entre 170° y 260° mediante Pillow, reduciendo su saturación y desplazando su apariencia hacia un neutro cálido sin alterar el resto de píxeles.
- Importar los tres JPG directamente en la página, sin archivos intermedios ni direcciones externas.
- Mantener `object-fit: cover`, encuadre centrado y sustituir el velo naranja por el degradado oscuro suave usado en las tarjetas de Sectores.
- No modificar textos, títulos principales, navegación ni el agente conversacional.

## Verificación
- Comprobar visualmente `/soluciones/` a 1280 y 390 px, en claro y oscuro.
- Confirmar que aparecen las tres fotos correctas, que no domina el azul y que no hay desbordamiento horizontal.
- Confirmar compilación correcta.

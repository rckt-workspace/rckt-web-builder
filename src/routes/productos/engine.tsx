import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/productos/engine")({
  head: () => productHead("/productos/engine", "Producción creativa con IA y gestión de medios | RCKT", "Creatividad a escala y operación de Meta, Google y TikTok en un solo sistema, con pruebas semanales e informe de control."),
  component: () => (
    <ProductPage
      label="Engine · Comunicación"
      title={<>Producción creativa con IA y gestión de medios pagos en un solo <span className="hero-hand">sistema.</span></>}
      subtitle="Producimos la creatividad al ritmo que la consumen Meta, Google y TikTok, y operamos la pauta con una estructura pensada para cómo reparten hoy la entrega esas plataformas."
      blocks={[
        { kind: "text", label: "Para quién", body: "Empresas que invierten en pauta de forma continua y necesitan más volumen y variedad creativa de la que produce su equipo." },
        { kind: "quotes", label: "Lo que nos dicen", items: ["Nos faltan piezas para probar.", "El rendimiento cae cuando los anuncios se agotan.", "Tardamos semanas en sacar una campaña.", "Tenemos muchas campañas pequeñas que no escalan."] },
        { kind: "text", label: "Qué resolvemos", body: "El rendimiento de la pauta depende hoy del volumen y la variedad de la creatividad. Engine la produce a escala y la conecta con la operación de medios, para que probar y escalar sea semanal." },
        { kind: "list", label: "Qué recibes", items: [
          "Estructura de cuentas consolidada y plan de medios.",
          "Un lote mensual de piezas en imagen y vídeo, con variantes por segmento.",
          "Biblioteca creativa y calendario de pruebas creativas.",
          <>Informe de control semanal, junto con <A href="/productos/signal">Signal</A>.</>,
        ] },
        { kind: "modules", label: "Módulos", items: [
          ["Sistema de medios de performance", "Redes sociales de pago, buscadores y programática, con estructura consolidada y optimización diaria."],
          ["Producción creativa con IA", "Generación, animación y escalado hasta 4K; variantes por segmento y entregas semanales."],
          ["TV conectada, retail media y programática", "Campañas en TV conectada y plataformas de streaming, y pauta en retailers y marketplaces."],
          ["Programas de campaña", "Lanzamientos, campañas de embudo completo y campañas para cuentas objetivo en B2B."],
        ] },
        { kind: "text", label: "Plazo", body: "Puesta en marcha en 2 a 3 semanas. Después, operación continua con un mínimo de seis meses." },
        { kind: "text", label: "Qué necesitamos de ti", body: "Acceso a tus cuentas publicitarias; activos y guía de marca; fotos o muestras de producto; aprobación de piezas en 48 horas; presupuesto de medios." },
        { kind: "text", label: "Qué no incluye", body: <>La inversión en medios, que pagas tú en tus propias cuentas; rodajes y producción física; cambios de oferta o precio (eso es <A href="/productos/blueprint">Blueprint</A>).</> },
        { kind: "proof", label: "Prueba", items: [
          { name: "La Cuisine", text: "Producción creativa con IA para varias marcas premium y venta por WhatsApp.", href: "/casos/la-cuisine" },
          { name: "NewBody", text: "Operación de pauta en tres ciudades con venta por WhatsApp.", href: "/casos/newbody" },
        ] },
        { kind: "text", label: "Qué sigue", body: <>Engine trabaja siempre junto a <A href="/productos/signal">Signal</A>. <A href="/productos/visibility">Visibility</A> como siguiente paso para aparecer donde te buscan.</> },
      ]}
    />
  ),
});

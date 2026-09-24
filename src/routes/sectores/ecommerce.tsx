import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import sectorImage from "@/assets/sector-ecommerce.jpg";

export const Route = createFileRoute("/sectores/ecommerce")({
  head: () => ({
    meta: [
      { title: "Revenue Systems para ecommerce con volumen | RCKT.es" },
      {
        name: "description",
        content:
          "Demand System para ecommerce consolidado: creatividad, conversión y WhatsApp medidos por margen de contribución tras adquisición.",
      },
      { property: "og:title", content: "Revenue Systems para ecommerce con volumen" },
      {
        property: "og:description",
        content: "Cómo vende hoy el ecommerce consolidado, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/ecommerce" }],
  }),
  component: EcommercePage,
});

function EcommercePage() {
  return (
    <SectorPage
      variant="short"
      label="ECOMMERCE CONSOLIDADO"
      title={
        <>
          Revenue Systems para{" "}
          ecommerce con <span className="hero-hand">volumen.</span>
        </>
      }
      context="Tiendas con volumen donde el coste de adquisición sube más rápido que el ticket medio. Medimos por margen de contribución tras adquisición."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Preparación de pedidos de una tienda ecommerce"
      funnelStages={["Anuncios", "Tienda", "Compra", "Recompra"]}
      funnelLeaks={[
        { afterStage: 1, label: "CAC alto" },
        { afterStage: 2, label: "Conversión baja" },
        { afterStage: 3, label: "WhatsApp sin medir" },
      ]}
      doloresDetalle={[
        { titulo: "CAC alto", descripcion: "Cada cliente nuevo cuesta más que el del mes anterior.", resuelve: "Medios optimizados por margen" },
        { titulo: "Conversión baja", descripcion: "El tráfico llega a la tienda, pero no compra.", resuelve: "CRO de la tienda" },
        { titulo: "Creatividad agotada", descripcion: "Los mismos anuncios desde hace meses y un rendimiento que va a la baja.", resuelve: "Creative Performance" },
        { titulo: "WhatsApp sin medir dentro del funnel", descripcion: "Parte de la venta pasa por WhatsApp y nadie la atribuye.", resuelve: "WhatsApp integrado y medido" },
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Demand System.</em>
        </>
      }
      sistemaTexto="Demand System, con Sales Flow si WhatsApp pesa en la conversión."
      sistemaFilas={[
        { nombre: "Creative Performance", detalle: "Producción y testing creativo con IA, con iteración semanal" },
        { nombre: "Medios por margen", detalle: "Meta, Google y PMax optimizados por margen, no solo por ROAS" },
        { nombre: "CRO", detalle: "Mejoras de conversión en la tienda, siempre con tracking conectado" },
        { nombre: "WhatsApp medido", detalle: "Atención con IA integrada al embudo, si WhatsApp pesa en la venta" },
        { nombre: "Medición por margen", detalle: "Margen de contribución tras adquisición, cada semana" },
      ]}
      sectorFacts={[
        { label: "Puerta de entrada", value: "Ecommerce rentable" },
        { label: "Sistema recomendado", value: "Demand System (+ Sales Flow si WhatsApp pesa)" },
        { label: "Componente que más pesa", value: "Creative Performance, CRO y atención con IA" },
        { label: "Indicadores", value: "Margen de contribución tras adquisición" },
        { label: "Compromiso mínimo", value: "3 meses" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base" },
        { hito: "2", label: "Puesta en marcha", texto: "Tracking validado, campañas activas y primer reporte en máximo 21 días" },
        { hito: "3", label: "Operación", texto: "Revisión semanal de rendimiento, mensual con decisores y trimestral de estrategia" },
      ]}
      primaryLink={{ label: "Ver Demand System →", href: "/sistemas/demand-system" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
    />
  );
}

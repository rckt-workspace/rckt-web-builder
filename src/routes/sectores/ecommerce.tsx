import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

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
          <span className="font-display text-orange" style={{ fontSize: "1.15em" }}>
            ecommerce con volumen.
          </span>
        </>
      }
      ctaLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Anuncios", "Tienda", "Compra", "Recompra"]}
      funnelLeaks={[
        { afterStage: 1, label: "CAC alto" },
        { afterStage: 2, label: "Conversión baja" },
        { afterStage: 3, label: "WhatsApp sin medir" },
      ]}
      dolores={["CAC alto", "Conversión baja", "Creatividad agotada", "WhatsApp sin medir dentro del funnel"]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Demand System.</em>
        </>
      }
      sistemaTexto="Demand System, con Sales Flow si WhatsApp pesa en la conversión."
      indicadoresLabel="Indicador del sector"
      indicadores={["Margen de contribución tras adquisición"]}
      primaryLink={{ label: "Ver Demand System →", href: "/sistemas/demand-system" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
    />
  );
}

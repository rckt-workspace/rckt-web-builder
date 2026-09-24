import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

export const Route = createFileRoute("/sectores/industria-distribucion")({
  head: () => ({
    meta: [
      { title: "Revenue Systems para industria y distribución | RCKT.es" },
      {
        name: "description",
        content:
          "Operations System para industria y distribución: cotizaciones, documentos y sincronización CRM ↔ ERP con aprobación humana.",
      },
      { property: "og:title", content: "Revenue Systems para industria y distribución" },
      {
        property: "og:description",
        content: "Cómo vende hoy la industria y la distribución, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/industria-distribucion" }],
  }),
  component: IndustriaDistribucionPage,
});

function IndustriaDistribucionPage() {
  return (
    <SectorPage
      variant="short"
      label="INDUSTRIA Y DISTRIBUCIÓN"
      title={
        <>
          Revenue Systems para{" "}
          <span className="font-serif-accent text-orange">
            industria y distribución.
          </span>
        </>
      }
      ctaLabel="Solicitar diagnóstico →"
      ctaFinalLabel="Solicitar diagnóstico →"
      funnelStages={["Cotización", "Pedido", "Documento", "Entrega", "Soporte"]}
      funnelLeaks={[
        { afterStage: 1, label: "Cotizaciones manuales" },
        { afterStage: 2, label: "CRM y ERP desconectados" },
        { afterStage: 3, label: "Documentos manuales" },
      ]}
      dolores={["Cotizaciones manuales", "Documentos manuales", "CRM y ERP desconectados"]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Operations System.</em>
        </>
      }
      sistemaTexto="Operations System: cotizaciones, documentos y sincronización CRM ↔ ERP."
      indicadoresLabel="Indicadores del sector"
      indicadores={["Coste por ejecución correcta", "Tiempo de ciclo"]}
      primaryLink={{ label: "Ver Operations System →", href: "/sistemas/operations-system" }}
    />
  );
}

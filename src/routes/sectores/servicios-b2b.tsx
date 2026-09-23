import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

export const Route = createFileRoute("/sectores/servicios-b2b")({
  head: () => ({
    meta: [
      { title: "Revenue Systems para servicios profesionales B2B | RCKT.es" },
      {
        name: "description",
        content:
          "Revenue Engine para firmas de servicios B2B: demanda en Google y LinkedIn, CRM con scoring y medición hasta la venta.",
      },
      { property: "og:title", content: "Revenue Systems para servicios profesionales B2B" },
      {
        property: "og:description",
        content:
          "Cómo vende hoy el sector de servicios profesionales B2B, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/servicios-b2b" }],
  }),
  component: ServiciosB2BPage,
});

function ServiciosB2BPage() {
  return (
    <SectorPage
      label="SERVICIOS B2B"
      title={
        <>
          Revenue Systems para{" "}
          <span className="font-script text-orange" style={{ fontSize: "1.15em" }}>
            servicios profesionales B2B.
          </span>
        </>
      }
      ctaLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Google / LinkedIn", "Lead", "Reunión", "Propuesta", "Cierre"]}
      funnelLeaks={[
        { afterStage: 1, label: "Depende de referidos" },
        { afterStage: 2, label: "Pipeline corto" },
        { afterStage: 3, label: "CRM mal usado" },
      ]}
      dolores={["Pipeline corto", "Depende de referidos", "CRM mal usado"]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
        </>
      }
      sistemaTexto="Revenue Engine, con Demand (Google, LinkedIn) y CRM con scoring como el componente que más pesa."
      sistemaFilas={[
        { nombre: "Google Search", detalle: "Captura de la demanda que ya busca tu servicio" },
        { nombre: "LinkedIn selectivo B2B", detalle: "Llegar a quien decide, no solo a quien hace clic" },
        { nombre: "Lead scoring", detalle: "Cada lead calificado antes de llegar a tu equipo comercial" },
        { nombre: "CRM & RevOps", detalle: "Pipeline, etapas y seguimiento que tu equipo sí usa" },
        {
          nombre: "Medición hasta la venta",
          detalle: "Coste por oportunidad aceptada por ventas, no por lead",
        },
      ]}
      indicadoresLabel="Indicadores del sector"
      indicadores={["Coste por SQL", "Reunión → propuesta"]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Demand System →", href: "/sistemas/demand-system" }}
    />
  );
}

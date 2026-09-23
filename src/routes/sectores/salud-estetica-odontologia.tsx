import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

export const Route = createFileRoute("/sectores/salud-estetica-odontologia")({
  head: () => ({
    meta: [
      { title: "Salud, estética y odontología — Revenue Systems | RCKT.es" },
      {
        name: "description",
        content:
          "Campañas, WhatsApp, agenda y CRM conectados para clínicas y centros de estética: respuesta rápida, gestión de no-show y coste por paciente que compra.",
      },
      { property: "og:title", content: "Revenue Systems para clínicas y centros de estética" },
      {
        property: "og:description",
        content: "Cómo vende hoy el sector salud y estética, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/salud-estetica-odontologia" }],
  }),
  component: SaludEsteticaOdontologiaPage,
});

function SaludEsteticaOdontologiaPage() {
  return (
    <SectorPage
      label="Salud, estética y odontología"
      title={
        <>
          Revenue Systems para{" "}
          <span className="font-script text-orange" style={{ fontSize: "1.15em" }}>
            clínicas y centros de estética.
          </span>
        </>
      }
      ctaLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Meta / Google", "WhatsApp", "Asesor", "Cita", "Venta"]}
      funnelLeaks={[
        { afterStage: 2, label: "Respuesta lenta" },
        { afterStage: 4, label: "No-show" },
        { afterStage: 5, label: "Sin saber qué campaña trajo al paciente" },
      ]}
      dolores={[
        "Seguimiento inconsistente",
        "Respuesta lenta",
        "No-show",
        "No saber qué campaña trajo al paciente",
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
        </>
      }
      sistemaTexto="Revenue Engine, con Sales Flow como el componente que más pesa: respuesta, agenda y gestión de no-show."
      indicadoresLabel="Indicadores del sector"
      indicadores={["Coste por paciente que compra", "% de citas realizadas"]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
    />
  );
}

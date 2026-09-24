import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

export const Route = createFileRoute("/sectores/construccion-inmobiliario")({
  head: () => ({
    meta: [
      { title: "Revenue Systems para constructoras e inmobiliarias | RCKT.es" },
      {
        name: "description",
        content:
          "Revenue Engine + Operations para constructoras e inmobiliarias: scoring, asignación multi-asesor y presupuestos automatizados.",
      },
      { property: "og:title", content: "Revenue Systems para constructoras e inmobiliarias" },
      {
        property: "og:description",
        content:
          "Cómo vende hoy el sector de construcción e inmobiliario, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/construccion-inmobiliario" }],
  }),
  component: ConstruccionInmobiliarioPage,
});

function ConstruccionInmobiliarioPage() {
  return (
    <SectorPage
      variant="short"
      label="CONSTRUCCIÓN E INMOBILIARIO"
      title={
        <>
          Revenue Systems para{" "}
          <span className="text-orange">
            constructoras e inmobiliarias.
          </span>
        </>
      }
      context="Constructoras e inmobiliarias con varios asesores, ciclos largos y presupuestos hechos a mano. Ordenamos la captación y automatizamos lo repetitivo, medido por visita realizada."
      ctaLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Anuncios", "Landing", "Asesor", "Visita", "Presupuesto", "Cierre"]}
      funnelLeaks={[
        { afterStage: 2, label: "Leads de baja calidad" },
        { afterStage: 3, label: "Varios asesores, el mismo contacto" },
        { afterStage: 5, label: "Presupuestos a mano" },
        { afterStage: 6, label: "Ciclos largos" },
      ]}
      dolores={[
        "Leads de baja calidad",
        "Varios asesores compitiendo por el mismo contacto",
        "Ciclos de venta largos",
        "Presupuestos hechos a mano",
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine + Operations.</em>
        </>
      }
      sistemaTexto="Scoring y asignación multi-asesor, y presupuestos automatizados."
      indicadoresLabel="Indicadores del sector"
      indicadores={["Coste por visita realizada", "Ciclo de cierre"]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Operations System →", href: "/sistemas/operations-system" }}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";

export const Route = createFileRoute("/sectores/educacion")({
  head: () => ({
    meta: [
      { title: "Revenue Systems para colegios, universidades y academias | RCKT.es" },
      {
        name: "description",
        content:
          "Revenue Engine para educación privada: Sales Flow, secuencias por temporada de matrícula y medición hasta la matrícula.",
      },
      { property: "og:title", content: "Revenue Systems para colegios, universidades y academias" },
      {
        property: "og:description",
        content:
          "Cómo vende hoy el sector de educación privada, dónde se pierde y qué sistema lo corrige.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/sectores/educacion" }],
  }),
  component: EducacionPage,
});

function EducacionPage() {
  return (
    <SectorPage
      variant="short"
      label="EDUCACIÓN PRIVADA"
      title={
        <>
          Revenue Systems para{" "}
          <span className="font-display text-orange" style={{ fontSize: "1.15em" }}>
            colegios, universidades y academias.
          </span>
        </>
      }
      ctaLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Google / Meta", "Lead", "WhatsApp o llamada", "Asesor", "Matrícula"]}
      funnelLeaks={[
        { afterStage: 2, label: "Volumen sin calificación" },
        { afterStage: 4, label: "Picos por temporada" },
        { afterStage: 5, label: "Sin medición hasta la matrícula" },
      ]}
      dolores={["Volumen sin calificación", "Picos de demanda por temporada", "Sin medición hasta la matrícula"]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
        </>
      }
      sistemaTexto="Revenue Engine, con Sales Flow y secuencias por temporada de matrícula."
      indicadoresLabel="Indicadores del sector"
      indicadores={["Coste por matrícula", "Lead → matrícula"]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
    />
  );
}

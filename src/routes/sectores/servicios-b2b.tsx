import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import { FICHA_B2B } from "@/components/rckt/MethodCard";
import sectorImage from "@/assets/sector-b2b.jpg";
import { faqJsonLd } from "@/components/rckt/FaqSection";
import { SERVICIOS_B2B_FAQS } from "@/content/faqs";

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
    scripts: [faqJsonLd(SERVICIOS_B2B_FAQS)],
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
          servicios profesionales <span className="hero-hand">B2B.</span>
        </>
      }
      context="Firmas de servicios profesionales que dependen de referidos y de un pipeline corto. Captamos demanda en Google y LinkedIn y medimos por oportunidad aceptada por ventas, no por lead."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Reunión de un equipo de servicios profesionales B2B"
      funnelStages={["Google / LinkedIn", "Lead", "Reunión", "Propuesta", "Cierre"]}
      funnelLeaks={[
        { afterStage: 1, label: "Depende de referidos" },
        { afterStage: 2, label: "Pipeline corto" },
        { afterStage: 3, label: "CRM mal usado" },
      ]}
      doloresDetalle={[
        { titulo: "Pipeline corto", descripcion: "Pocas oportunidades nuevas cada mes y un equipo comercial que espera a que lleguen.", resuelve: "Demand en Google y LinkedIn" },
        { titulo: "Depende de referidos", descripcion: "Cuando los referidos bajan, la facturación baja con ellos.", resuelve: "Captación propia medida hasta la venta" },
        { titulo: "CRM mal usado", descripcion: "El CRM existe, pero nadie lo actualiza ni sabe en qué etapa está cada oportunidad.", resuelve: "CRM & RevOps con scoring" },
      ]}
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
      sectorFacts={[
        { label: "Puerta de entrada", value: "Captación y cierre" },
        { label: "Sistema recomendado", value: "Revenue Engine" },
        { label: "Componente que más pesa", value: "Demand (Google, LinkedIn) + CRM y scoring" },
        { label: "Indicadores", value: "Coste por SQL · Reunión → propuesta" },
        { label: "Compromiso mínimo", value: "6 meses" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base" },
        { hito: "2", label: "Puesta en marcha", texto: "Sistema operativo con fuente de verdad el día 30" },
        { hito: "3", label: "Revisión", texto: "Línea base frente a resultado el día 90" },
      ]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Demand System →", href: "/sistemas/demand-system" }}
      methodFields={FICHA_B2B}
      faqItems={SERVICIOS_B2B_FAQS}
    />
  );
}

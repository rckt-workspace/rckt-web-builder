import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import { FICHA_SALUD } from "@/components/rckt/MethodCard";
import sectorImage from "@/assets/sector-salud.jpg";

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
          <span className="text-orange">
            clínicas y centros de estética.
          </span>
        </>
      }
      context="Clínicas y centros donde la venta pasa por WhatsApp, un asesor y una cita. El dinero se pierde entre la respuesta, la agenda y el no-show, y lo medimos por paciente que compra."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Atención cercana en una clínica de salud y estética"
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
      sistemaFilas={[
        { nombre: "Campañas conectadas", detalle: "Cada paciente vinculado a la campaña que lo trajo" },
        { nombre: "Respuesta por WhatsApp", detalle: "Atención rápida y trazable desde el primer contacto" },
        { nombre: "Agenda y recordatorios", detalle: "Confirmación de citas y seguimiento antes de la visita" },
        { nombre: "Recuperación de no-show", detalle: "Secuencias para retomar citas perdidas sin perder contexto" },
        { nombre: "Medición hasta la compra", detalle: "Coste por paciente que compra, no solo por lead" },
      ]}
      sectorFacts={[
        { label: "Puerta de entrada", value: "Captación y cierre" },
        { label: "Sistema recomendado", value: "Revenue Engine" },
        { label: "Componente que más pesa", value: "Sales Flow: respuesta, agenda y no-show" },
        { label: "Indicadores", value: "Coste por paciente que compra · % de citas realizadas" },
        { label: "Compromiso mínimo", value: "6 meses" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base" },
        { hito: "2", label: "Puesta en marcha", texto: "Sistema operativo con fuente de verdad el día 30" },
        { hito: "3", label: "Revisión", texto: "Línea base frente a resultado el día 90" },
      ]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
      methodFields={FICHA_SALUD}
    />
  );
}

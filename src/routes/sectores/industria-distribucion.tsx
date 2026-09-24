import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import sectorImage from "@/assets/sector-industria.jpg";

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
          <span className="text-orange">
            industria y <span className="hero-hand">distribución.</span>
          </span>
        </>
      }
      context="Empresas con cotizaciones, documentos y datos que se mueven a mano entre CRM y ERP. Automatizamos un proceso a la vez, con aprobación humana."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Operación industrial y de distribución"
      ctaFinalLabel="Solicitar diagnóstico de captación →"
      funnelStages={["Cotización", "Pedido", "Documento", "Entrega", "Soporte"]}
      funnelLeaks={[
        { afterStage: 1, label: "Cotizaciones manuales" },
        { afterStage: 2, label: "CRM y ERP desconectados" },
        { afterStage: 3, label: "Documentos manuales" },
      ]}
      doloresDetalle={[
        { titulo: "Cotizaciones manuales", descripcion: "Cada cotización se prepara a mano y tarda horas.", resuelve: "Cotizaciones desde WhatsApp o correo" },
        { titulo: "Documentos manuales", descripcion: "Datos que se copian de un sistema a otro, con errores y retrabajo.", resuelve: "Documentos generados y verificados" },
        { titulo: "CRM y ERP desconectados", descripcion: "Comercial y operación trabajan con datos distintos.", resuelve: "Sincronización CRM ↔ ERP" },
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Operations System.</em>
        </>
      }
      sistemaTexto="Operations System: cotizaciones, documentos y sincronización CRM ↔ ERP."
      sistemaFilas={[
        { nombre: "Cotizaciones desde WhatsApp o correo", detalle: "El agente extrae la solicitud y la redacta; una persona aprueba el envío" },
        { nombre: "Documentos", detalle: "Generados desde plantillas y verificados antes de firmar" },
        { nombre: "Sincronización CRM ↔ ERP", detalle: "Datos consistentes entre sistemas; los conflictos los resuelve una persona" },
        { nombre: "Post-venta de primer nivel", detalle: "Consultas frecuentes resueltas; reclamaciones escaladas a una persona" },
        { nombre: "Coste por ejecución correcta", detalle: "Medido frente a la línea base del proceso" },
      ]}
      sectorFacts={[
        { label: "Puerta de entrada", value: "Operación" },
        { label: "Sistema recomendado", value: "Operations System" },
        { label: "Componente que más pesa", value: "Cotizaciones, documentos y CRM ↔ ERP" },
        { label: "Indicadores", value: "Coste por ejecución correcta · Tiempo de ciclo" },
        { label: "Compromiso mínimo", value: "Sprint de 6–8 semanas + soporte 6 meses" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "Mapa del proceso: volumen, tiempo, errores y coste" },
        { hito: "2", label: "Sprint", texto: "Criterios de aceptación firmados en la semana 2 y construcción con casos reales" },
        { hito: "3", label: "Piloto y soporte", texto: "Piloto controlado en las semanas 7–8 y soporte mensual" },
      ]}
      primaryLink={{ label: "Ver Operations System →", href: "/sistemas/operations-system" }}
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import sectorImage from "@/assets/sector-educacion.jpg";

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
          colegios, universidades y <span className="hero-hand">academias.</span>
        </>
      }
      context="Colegios, universidades y academias con picos de demanda por temporada de matrícula. Calificamos ese volumen y lo seguimos hasta la matrícula."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Estudiantes en un centro de educación privada"
      funnelStages={["Google / Meta", "Lead", "WhatsApp o llamada", "Asesor", "Matrícula"]}
      funnelLeaks={[
        { afterStage: 2, label: "Volumen sin calificación" },
        { afterStage: 4, label: "Picos por temporada" },
        { afterStage: 5, label: "Sin medición hasta la matrícula" },
      ]}
      doloresDetalle={[
        { titulo: "Volumen sin calificación", descripcion: "Muchas solicitudes en temporada, sin saber cuáles están listas para matricularse.", resuelve: "Respuesta y calificación" },
        { titulo: "Picos de demanda por temporada", descripcion: "El equipo no da abasto en campaña de matrícula y el resto del año baja el ritmo.", resuelve: "Secuencias por temporada" },
        { titulo: "Sin medición hasta la matrícula", descripcion: "Se mide el lead, pero no cuántos terminan matriculados.", resuelve: "Medición hasta la matrícula" },
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine.</em>
        </>
      }
      sistemaTexto="Revenue Engine, con Sales Flow y secuencias por temporada de matrícula."
      sistemaFilas={[
        { nombre: "Respuesta y calificación", detalle: "Cada solicitud respondida y calificada, también en los picos" },
        { nombre: "Secuencias por temporada", detalle: "Seguimiento pensado para cada campaña de matrícula" },
        { nombre: "CRM & RevOps", detalle: "Pipeline, etapas y dashboards del proceso de admisión" },
        { nombre: "Campañas medidas por matrícula", detalle: "Demand optimizado por la matrícula, no por el lead" },
        { nombre: "Medición hasta la matrícula", detalle: "Tasa de lead a matrícula frente a la línea base" },
      ]}
      sectorFacts={[
        { label: "Puerta de entrada", value: "Captación y cierre" },
        { label: "Sistema recomendado", value: "Revenue Engine" },
        { label: "Componente que más pesa", value: "Sales Flow con secuencias por temporada" },
        { label: "Indicadores", value: "Coste por matrícula · Lead → matrícula" },
        { label: "Compromiso mínimo", value: "6 meses" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base" },
        { hito: "2", label: "Puesta en marcha", texto: "Sistema operativo con fuente de verdad el día 30" },
        { hito: "3", label: "Revisión", texto: "Línea base frente a resultado el día 90" },
      ]}
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Sales Flow →", href: "/sistemas/sales-flow" }}
    />
  );
}

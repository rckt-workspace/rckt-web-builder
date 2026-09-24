import { createFileRoute } from "@tanstack/react-router";

import SectorPage from "@/components/rckt/SectorPage";
import sectorImage from "@/assets/sector-construccion.jpg";

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
          constructoras e <span className="hero-hand">inmobiliarias.</span>
        </>
      }
      context="Constructoras e inmobiliarias con varios asesores, ciclos largos y presupuestos hechos a mano. Ordenamos la captación y automatizamos lo repetitivo, medido por visita realizada."
      ctaLabel="Solicitar diagnóstico de captación →"
      sectorImage={sectorImage}
      sectorImageAlt="Proyecto de construcción e inmobiliario"
      funnelStages={["Anuncios", "Landing", "Asesor", "Visita", "Presupuesto", "Cierre"]}
      funnelLeaks={[
        { afterStage: 2, label: "Leads de baja calidad" },
        { afterStage: 3, label: "Varios asesores, el mismo contacto" },
        { afterStage: 5, label: "Presupuestos a mano" },
        { afterStage: 6, label: "Ciclos largos" },
      ]}
      doloresDetalle={[
        { titulo: "Leads de baja calidad", descripcion: "Muchos contactos sin presupuesto ni intención real de compra.", resuelve: "Lead scoring" },
        { titulo: "Varios asesores compitiendo por el mismo contacto", descripcion: "El mismo cliente potencial recibe llamadas de dos asesores y ninguno es su dueño.", resuelve: "Asignación multi-asesor" },
        { titulo: "Ciclos de venta largos", descripcion: "Meses entre la primera visita y la firma, sin un seguimiento ordenado.", resuelve: "CRM para ciclos largos" },
        { titulo: "Presupuestos hechos a mano", descripcion: "Cada presupuesto tarda días y depende de una sola persona.", resuelve: "Presupuestos automáticos con aprobación humana" },
      ]}
      sistemaTitle={
        <>
          Lo que hacemos: <em className="font-serif-accent">Revenue Engine + Operations.</em>
        </>
      }
      sistemaTexto="Scoring y asignación multi-asesor, y presupuestos automatizados."
      sistemaFilas={[
        { nombre: "Lead scoring", detalle: "Cada contacto calificado antes de llegar a un asesor" },
        { nombre: "Asignación multi-asesor", detalle: "Cada lead con un solo dueño, sin asesores compitiendo por él" },
        { nombre: "Presupuestos automáticos", detalle: "El agente los redacta; una persona los aprueba antes de enviarlos" },
        { nombre: "CRM para ciclos largos", detalle: "Seguimiento de cada oportunidad hasta la visita y el cierre" },
        { nombre: "Medición por visita", detalle: "Coste por visita realizada, no por lead" },
      ]}
      sectorFacts={[
        { label: "Puerta de entrada", value: "Captación y cierre → Operación" },
        { label: "Sistema recomendado", value: "Revenue Engine + Operations" },
        { label: "Componente que más pesa", value: "Scoring, asignación multi-asesor y presupuestos automáticos" },
        { label: "Indicadores", value: "Coste por visita realizada · Ciclo de cierre" },
        { label: "Compromiso mínimo", value: "6 meses + Sprint de 6–8 semanas" },
      ]}
      acceptanceSteps={[
        { hito: "1", label: "Revenue Diagnostic", texto: "2 a 3 semanas para medir dónde se pierde el dinero y fijar la línea base" },
        { hito: "2", label: "Puesta en marcha", texto: "Sistema operativo con fuente de verdad el día 30" },
        { hito: "3", label: "Revisión", texto: "Línea base frente a resultado el día 90" },
      ]}
      acceptanceNote="Operations se suma con un Sprint de 6–8 semanas cuando hay un proceso manual de alto volumen."
      primaryLink={{ label: "Ver Revenue Engine →", href: "/sistemas/revenue-engine" }}
      secondaryLink={{ label: "Ver Operations System →", href: "/sistemas/operations-system" }}
    />
  );
}

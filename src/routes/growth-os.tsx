import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/growth-os")({
  head: () => productHead("/growth-os", "Operación continua de marketing y crecimiento | RCKT", "Estrategia, creatividad, medios, CRM, agentes y medición operados cada mes con un solo responsable."),
  component: () => (
    <ProductPage
      label="Growth OS · Operación continua"
      title={<>Operamos tu crecimiento cada mes: estrategia, ejecución y medición con un solo <span className="hero-hand">responsable.</span></>}
      subtitle="Growth OS es la forma de trabajo continua de RCKT. Cada semana medimos, decidimos y ejecutamos; cada trimestre revisamos contigo la meta y la estrategia."
      blocks={[
        { kind: "text", label: "Para quién", body: <>Empresas que ya hicieron su diagnóstico con nosotros (<A href="/productos/ignition">Ignition</A>, o el diagnóstico corto de <A href="/productos/visibility">Visibility</A> o <A href="/productos/signal">Signal</A>) y quieren ejecución continua.</> },
        { kind: "list", label: "Qué incluye siempre", items: [
          <><A href="/productos/engine">Engine</A>: creatividad y medios.</>,
          <><A href="/productos/signal">Signal</A>: meta, medición e informe de control semanal.</>,
          "Operación con agentes: agentes y flujos que ejecutan campañas, seguimiento de leads, nurturing e informes, con una persona del equipo que aprueba lo que importa.",
        ] },
        { kind: "modules", label: "Qué se puede añadir", items: [
          ["CRM, ciclo de vida y operaciones comerciales", "CRM como sistema de información comercial, flujos de ciclo de vida, puntuación de leads y tablero de pipeline."],
          ["Arquitectura de IA para tu empresa", "Diseño de agentes, datos y reglas de gobierno para que tu equipo opere con IA; hoja de ruta."],
          ["Copilotos de ventas y agentes de atención", "Copiloto para tu equipo comercial y agente de atención en WhatsApp, web o voz, con supervisión humana."],
          ["Programa de adopción de IA para dirección", "Cuatro sesiones de formación para el equipo directivo y una política de uso de IA."],
        ], note: <>También se pueden sumar los módulos de <A href="/productos/ignition">Ignition</A>, <A href="/productos/blueprint">Blueprint</A> y <A href="/productos/visibility">Visibility</A> que pida el plan de crecimiento del trimestre.</> },
        { kind: "list", label: "Qué recibes cada periodo", items: [
          "Cada semana: informe de control con hora de corte, en una reunión de seguimiento contigo.",
          "Cada mes: el mapa de mercado actualizado con lo que cambió en tus clientes, tu competencia y tu contexto.",
          "Cada trimestre: el plan de crecimiento del trimestre siguiente, con la meta revisada.",
        ] },
        { kind: "table", label: "Tres formas de trabajar con RCKT", head: ["Forma", "Qué es", "Duración", "Para quién"], rows: [
          ["Sprint", "Proyecto cerrado con entregable definido: Ignition, Blueprint, puesta en marcha de Visibility o un proyecto de IA.", "4 a 8 semanas", "Quien necesita una decisión o un entregable concreto."],
          ["Growth OS", "Operación continua del ciclo completo.", "Mensual, mínimo seis meses", "Quien quiere que operemos su crecimiento."],
          ["Operating Partner", "RCKT dentro de tu equipo directivo: dirección de marketing y crecimiento, formación directiva y asesoría ejecutiva.", "Doce meses, renovable", "Empresas que llevan al menos un trimestre en Growth OS con resultados medidos."],
        ] },
        { kind: "text", label: "Cómo se cobra", body: "Cobramos por el valor que fija la meta, no por horas. El diagnóstico y los proyectos cerrados tienen un precio fijo. Growth OS tiene una cuota mensual. Cotizamos cada caso por alcance.", note: "La inversión en medios no está incluida: la pagas tú, en tus propias cuentas." },
      ]}
    />
  ),
});

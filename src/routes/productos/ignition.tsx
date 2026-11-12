import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/productos/ignition")({
  head: () => productHead("/productos/ignition", "Diagnóstico de crecimiento y plan de 90 días | RCKT", "En tres semanas: mapa de tu mercado, propuesta de valor, meta con número y plan de 90 días con responsables."),
  component: () => (
    <ProductPage
      label="Ignition · Estrategia"
      title={<>Diagnóstico de crecimiento: estrategia escrita, meta con número y plan de 90 <span className="hero-hand">días.</span></>}
      subtitle="En tres semanas decidimos contigo a quién vendes, con qué valor superior a tus alternativas y qué número hay que mover. Es la entrada a todo lo que hacemos."
      blocks={[
        { kind: "text", label: "Para quién", body: "Empresas con producto probado que quieren escalar, ordenar su marketing o entrar en un mercado nuevo." },
        { kind: "quotes", label: "Lo que nos dicen", items: ["No sabemos qué frena el crecimiento.", "Invertimos en marketing sin un plan.", "Cada proveedor nos dice una cosa distinta."] },
        { kind: "text", label: "Qué resolvemos", body: "Ejecutar tácticas sin haber decidido a quién sirves, con qué beneficio y qué número quieres mover. Ignition fija esas tres decisiones antes de invertir un euro más." },
        { kind: "list", label: "Qué recibes", items: [
          "Tu mapa de mercado en una página: clientes, competidores, contexto, propuesta de valor y posicionamiento.",
          "Una hoja de meta con la métrica foco, su referencia de mercado y la fecha.",
          "Un plan de crecimiento con calendario de 90 días y responsables.",
          "Una sesión de presentación con tu equipo directivo.",
        ] },
        { kind: "modules", label: "Módulos", items: [
          ["Diagnóstico de mercado y negocio", "Análisis de tus clientes, competidores, colaboradores y contexto; mapa de mercado y meta con referencia de mercado."],
          ["Plan de crecimiento a 90 días", "Propuesta de valor, posicionamiento y plan trimestral con responsables."],
          ["Plan de entrada a un mercado", "Cuando entras en un país o un sector nuevo: canales, socios, precio local y calendario."],
          ["Posicionamiento y estrategia de marca", "Declaración de posicionamiento, propuesta de valor de marca y arquitectura de marca."],
        ] },
        { kind: "text", label: "Plazo", body: <>3 semanas. 1 semana si tu sector tiene mapa de mercado propio (<A href="/sectores">ver Sectores</A>).</> },
        { kind: "text", label: "Qué necesitamos de ti", body: "Ventas de los últimos 12 a 24 meses; acceso de lectura a tus plataformas publicitarias y a tu analítica; tres entrevistas con dirección, ventas y servicio; reseñas o tickets de clientes; una persona responsable del proyecto." },
        { kind: "text", label: "Qué no incluye", body: <>Ejecución de campañas, producción creativa, rediseño de oferta y precio (eso es <A href="/productos/blueprint">Blueprint</A>) ni implementación de la medición (eso es <A href="/productos/signal">Signal</A>).</> },
        { kind: "proof", label: "Prueba", items: [{ name: "La Cuisine", text: "Plan de medios del segundo semestre de 2026 para La Cuisine, con escenarios de inversión.", href: "/casos/la-cuisine" }] },
        { kind: "text", label: "Qué sigue", body: <>Si el diagnóstico ubica el techo de crecimiento en la oferta, <A href="/productos/blueprint">Blueprint</A>. Para ejecutar el plan, <A href="/growth-os">Growth OS</A>.</> },
      ]}
    />
  ),
});

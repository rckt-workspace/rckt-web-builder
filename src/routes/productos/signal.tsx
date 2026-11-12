import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

const SHORT_DIAGNOSTIC = "Si empiezas por aquí, los primeros 5 días hábiles hacemos un diagnóstico corto: tu cliente objetivo, las tres alternativas con las que compites, tu beneficio principal y la métrica que vamos a mover.";

export const Route = createFileRoute("/productos/signal")({
  head: () => productHead("/productos/signal", "Medición de marketing e incrementalidad | RCKT", "Cruzamos la inversión con tus ventas reales y medimos qué parte del resultado causó. Informe semanal con hora de corte."),
  component: () => (
    <ProductPage
      label="Signal · Meta y control"
      title={<>Medición de marketing que demuestra qué parte de tus ventas causó la <span className="hero-hand">inversión.</span></>}
      subtitle="Fijamos la meta con número, cruzamos lo que facturan las plataformas con tus ventas reales y probamos qué inversión crea demanda y cuál solo la registra. Cada semana, con hora de corte."
      blocks={[
        { kind: "text", label: "Para quién", body: "Empresas que ya invierten en marketing y no pueden demostrar qué parte de sus ventas viene de esa inversión." },
        { kind: "quotes", label: "Lo que nos dicen", items: ["El ROAS de la plataforma no cuadra con las ventas.", "No sabemos qué canal funciona.", "Dirección pide justificar el presupuesto."] },
        { kind: "text", label: "Qué resolvemos", body: "Cada plataforma se atribuye las ventas a sí misma. Sin una medición independiente no se sabe qué inversión crece el negocio y cuál se lleva el mérito de ventas que iban a ocurrir igual." },
        { kind: "list", label: "Qué recibes", items: [
          "Línea base y MER objetivo.",
          "Conciliación de la inversión facturada contra tus ventas reales.",
          "Arquitectura de medición revisada y validada.",
          "Plan de pruebas de incrementalidad.",
          "Informe de control semanal con hora de corte y alertas cuando algo se sale de lo normal.",
        ] },
        { kind: "modules", label: "Módulos", items: [
          ["MER e incrementalidad", "MER, modelos de marketing mix, pruebas por zonas geográficas y grupos de control; informe semanal."],
          ["Arquitectura de medición", "Etiquetado, API de conversiones, conjuntos de datos y calidad del dato."],
          ["Informes de control y alertas", "Tablero, detección de anomalías e informe semanal automatizado."],
          ["Medición de marca", "Estudios de brand lift, imagen de precio y fuerza de marca."],
        ] },
        { kind: "text", label: "La fuente de verdad son tus ventas", body: "Medimos contra tu tienda, tu ERP o tu CRM, no contra los paneles de las plataformas." },
        { kind: "text", label: "Incluye un diagnóstico corto", body: SHORT_DIAGNOSTIC },
        { kind: "text", label: "Plazo", body: "Puesta en marcha en 3 a 4 semanas. Después, operación continua." },
        { kind: "text", label: "Qué necesitamos de ti", body: "Acceso a tus ventas reales; inversión por canal; acceso a las plataformas y al etiquetado del sitio; disposición a pausar inversión en zonas o periodos de prueba." },
        { kind: "text", label: "Qué no incluye", body: "Inteligencia de negocio general de la empresa ni auditoría financiera." },
        { kind: "proof", label: "Prueba", items: [
          { name: "La Cuisine", text: "Conciliación de la inversión facturada por Google y Meta contra las ventas de la tienda.", href: "/casos/la-cuisine" },
          { name: "NewBody", text: "Seguimiento diario por ciudad con hora de corte.", href: "/casos/newbody" },
        ] },
        { kind: "text", label: "Qué sigue", body: <>Diagnóstico <A href="/productos/ignition">Ignition</A> completo y <A href="/growth-os">Growth OS</A>.</> },
      ]}
    />
  ),
});

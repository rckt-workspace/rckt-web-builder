import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/productos/blueprint")({
  head: () => productHead("/productos/blueprint", "Diseño de oferta, precio y experiencia de cliente | RCKT", "Rediseñamos tu oferta, tu precio, tus promociones y la experiencia del cliente para convertir más y con más margen."),
  component: () => (
    <ProductPage
      label="Blueprint · Diseño de oferta"
      title={<>Diseño de oferta, precio y experiencia del <span className="hero-hand">cliente.</span></>}
      subtitle="Rediseñamos qué vendes, a qué precio, con qué incentivos y cómo lo vive tu cliente, para que cada euro de medios empuje una oferta que convierte y deja margen."
      blocks={[
        { kind: "text", label: "Para quién", body: "Empresas con tráfico y demanda cuyo crecimiento se frena en la conversión, el ticket medio o el margen." },
        { kind: "quotes", label: "Lo que nos dicen", items: ["Tenemos visitas pero no compran.", "Solo vendemos con descuento.", "El ticket medio no sube.", "Competimos por precio."] },
        { kind: "text", label: "Qué resolvemos", body: "Cuando la inversión en medios empuja una oferta mal empaquetada o mal cobrada, más pauta no arregla el problema. Blueprint trabaja donde está el techo: la oferta." },
        { kind: "list", label: "Qué recibes", items: [
          "Arquitectura de oferta con niveles, paquetes y variantes.",
          "Política de precio y plan de pruebas de precio.",
          "Reglas de incentivos y calendario promocional, con la medición de cada promoción.",
          "Mapa de la experiencia del cliente con las mejoras priorizadas.",
          "Sistema de mensajes de marca.",
        ] },
        { kind: "modules", label: "Módulos", items: [
          ["Arquitectura de oferta y precio", "Niveles y paquetes, política de precio, pruebas de precio con IA y sensibilidad al precio por segmento."],
          ["Diseño de incentivos y promociones", "Reglas para mantener solo las promociones que crean demanda nueva, no las que adelantan compras que iban a ocurrir."],
          ["Diseño de la experiencia del cliente", "Recorrido completo, desde que surge la necesidad hasta la recompra: elección, onboarding, servicio y fidelidad."],
          ["Identidad y mensajes de marca", "Identidad, sistema de mensajes y objetivos de fuerza de marca."],
        ] },
        { kind: "text", label: "Cómo lo hacemos", body: "Tres opciones como máximo, con la recomendada en el medio. Paquetes con productos del mismo nivel, sin regalos de bajo valor que restan valor al conjunto. Cada promoción se mide contra un grupo sin promoción." },
        { kind: "text", label: "Plazo", body: "4 a 6 semanas." },
        { kind: "text", label: "Qué necesitamos de ti", body: "Ventas por producto y por canal; márgenes; historial de precios y promociones; acceso a tus equipos de ventas y servicio; autorización para probar precios y ofertas en el mercado." },
        { kind: "text", label: "Qué no incluye", body: "Desarrollo de producto, cambios en facturación o ERP ni ejecución de campañas." },
        { kind: "text", label: "Requisito", body: <>Blueprint empieza siempre después de un diagnóstico <A href="/productos/ignition">Ignition</A>. Sin diagnóstico no sabemos si el techo está en la oferta.</> },
        { kind: "text", label: "Cómo se mide", body: <>Cada cambio de oferta, precio o promoción se prueba en el mercado y se mide con <A href="/productos/signal">Signal</A> contra tus ventas reales.</> },
        { kind: "text", label: "Qué sigue", body: <><A href="/productos/engine">Engine</A> para comunicar la oferta nueva y <A href="/productos/signal">Signal</A> para medir las pruebas.</> },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";

import ProductPage, { A, productHead } from "@/components/rckt/ProductPage";

const SHORT_DIAGNOSTIC = "Si empiezas por aquí, los primeros 5 días hábiles hacemos un diagnóstico corto: tu cliente objetivo, las tres alternativas con las que compites, tu beneficio principal y la métrica que vamos a mover.";

export const Route = createFileRoute("/productos/visibility")({
  head: () => productHead("/productos/visibility", "Visibilidad en ChatGPT, Gemini y buscadores con IA | RCKT", "Medimos si los asistentes de IA citan tu marca y qué dicen de ti, y trabajamos para que te encuentren y te compren."),
  component: () => (
    <ProductPage
      label="Visibility · Presencia y acceso"
      title={<>Que tu marca aparezca y se pueda comprar donde tus clientes ya buscan, incluidos ChatGPT y <span className="hero-hand">Gemini.</span></>}
      subtitle="Trabajamos tu presencia en asistentes de IA, buscadores con respuesta generada, marketplaces y tu tienda propia, y medimos cada mes cuántas veces te citan y qué dicen de ti."
      blocks={[
        { kind: "text", label: "Para quién", body: "Marcas cuyos clientes investigan en ChatGPT, Gemini o en buscadores con respuesta generada antes de comprar, o que dependen del tráfico orgánico." },
        { kind: "quotes", label: "Lo que nos dicen", items: ["Nos buscan en ChatGPT y no aparecemos.", "La IA recomienda a la competencia.", "El tráfico orgánico baja.", "Queremos vender en marketplaces."] },
        { kind: "text", label: "Qué resolvemos", body: "Cada vez más compradores deciden con una respuesta generada, y la marca no controla si aparece en ella ni qué se dice de ella. Visibility trabaja para que el asistente lea bien tu catálogo, te cite y envíe al comprador a una página que convierte." },
        { kind: "list", label: "Qué recibes", items: [
          "Auditoría de presencia y citación en ChatGPT, Gemini, AI Overviews de Google, Perplexity y Claude.",
          "Plan de contenido, datos estructurados y fuentes de terceros.",
          "Informe mensual de citaciones.",
          "Catálogo de productos que los asistentes de IA y los marketplaces pueden leer.",
          "Tienda o páginas de producto preparadas para convertir.",
        ] },
        { kind: "modules", label: "Módulos", items: [
          ["Presencia en asistentes y buscadores con IA", "Cuándo y cómo te citan los motores de IA, qué dicen de tu marca y cómo mejorarlo."],
          ["Catálogo para asistentes de IA y marketplaces", "Catálogo estructurado y actualizado; alta y operación en marketplaces."],
          ["Tiendas y sitios que convierten", "Sitios y tiendas en Shopify o Lovable con acabado premium, y pruebas continuas de conversión."],
        ] },
        { kind: "text", label: "Cómo se mide", body: "Línea base de citaciones al inicio y seguimiento mensual: en cuántas respuestas apareces, en qué posición, qué se dice de ti y cuánto tráfico y cuántas ventas llegan desde esas respuestas." },
        { kind: "text", label: "Incluye un diagnóstico corto", body: SHORT_DIAGNOSTIC },
        { kind: "text", label: "Plazo", body: "Puesta en marcha en 4 a 6 semanas. Después, seguimiento mensual." },
        { kind: "text", label: "Qué necesitamos de ti", body: "Acceso a tu sitio y a su gestor de contenidos; catálogo con precios y disponibilidad; analítica y consola de búsqueda; una persona experta en tu producto." },
        { kind: "text", label: "Lo que no prometemos", body: <>Aparecer en un motor concreto. Los motores no publican sus criterios y nadie puede garantizarlo. Tampoco incluye pauta en buscadores (eso es <A href="/productos/engine">Engine</A>).</> },
        { kind: "text", label: "Qué sigue", body: <><A href="/growth-os">Growth OS</A>. Si la tienda recibe tráfico y no convierte, <A href="/productos/blueprint">Blueprint</A>.</> },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";

import { A, CtaButton, PageSection, PageShell, productHead } from "@/components/rckt/ProductPage";

const PASOS: { n: string; paso: string; decide: string; recibe: string; opera: [string, string][] }[] = [
  { n: "1", paso: "Meta", decide: "Qué resultado, en qué métrica y para cuándo", recibe: "Una hoja de meta con la métrica foco, su referencia de mercado y la fecha", opera: [["Signal", "/productos/signal"]] },
  { n: "2", paso: "Estrategia", decide: "A quién servimos y con qué valor superior", recibe: "El mapa de mercado de tu empresa en una página: clientes, competidores, contexto, propuesta de valor y posicionamiento", opera: [["Ignition", "/productos/ignition"]] },
  { n: "3", paso: "Táctica", decide: "Cómo se concreta esa propuesta en la oferta", recibe: "Oferta y precio, creatividad, medios y presencia donde te buscan", opera: [["Blueprint", "/productos/blueprint"], ["Engine", "/productos/engine"], ["Visibility", "/productos/visibility"]] },
  { n: "4", paso: "Implementación", decide: "Con qué recursos, procesos y calendario", recibe: "Un plan de 90 días con responsables, y los agentes y flujos que lo ejecutan", opera: [["Growth OS", "/growth-os"]] },
  { n: "5", paso: "Control", decide: "Si funcionó y qué cambió en el mercado", recibe: "Un informe de control semanal con hora de corte y la meta ajustada del periodo siguiente", opera: [["Signal", "/productos/signal"]] },
];

const DOCS = [
  ["Mapa de mercado", "Una página con tu mercado, tu propuesta de valor y tu oferta, que puedes leer sin nosotros delante", "Al inicio, y se actualiza cada mes"],
  ["Plan de crecimiento", "El plan del trimestre en los cinco pasos, con calendario de 90 días", "Al cerrar el diagnóstico, y se revisa cada trimestre"],
  ["Informe de control", "Resultado frente a la meta, qué se probó, qué cambió y qué se decide", "Cada semana, con hora de corte"],
];

const Label = ({ children }: { children: string }) => <p className="label-orange mt-4">{children}</p>;

export const Route = createFileRoute("/metodo")({
  head: () => productHead("/metodo", "Método de crecimiento en cinco pasos | RCKT", "Meta, estrategia, táctica, implementación y control, siempre en ese orden y medidos cada semana contra tus ventas reales."),
  component: () => (
    <PageShell
      label="Método"
      title={<>Cómo hacemos crecer una empresa: un ciclo de cinco pasos, siempre en el mismo <span className="hero-hand">orden.</span></>}
      subtitle="Operado con IA y medios digitales, y medido cada semana contra tus ventas reales."
    >
      <PageSection num="01." label="El principio" title="Una oferta crece cuando crea valor para tres partes a la vez.">
        <div className="mt-10 max-w-3xl space-y-5 text-[17px] leading-relaxed">
          <p>Para el cliente que compra, que debe recibir más que con las alternativas. Para quienes la distribuyen o la recomiendan, que necesitan un motivo para apoyarla. Y para tu empresa, que necesita margen y una marca más fuerte. Un plan que solo cuida una de las tres deja crecimiento sin capturar.</p>
          <p className="font-display text-lg font-medium">Por eso no trabajamos solo la comunicación. Trabajamos la oferta, el precio, el canal, la comunicación y la medición, en un mismo plan.</p>
        </div>
      </PageSection>
      <PageSection num="02." label="El ciclo en cinco pasos" title="El ciclo en cinco pasos.">
        <p className="mt-8 max-w-3xl text-[17px] leading-relaxed">Ninguna táctica se activa sin una meta y una estrategia escritas. Ningún periodo se cierra sin medir qué pasó. El último paso abre el siguiente ciclo.</p>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PASOS.map((p) => (
            <li key={p.n} className="card-kraft flex flex-col p-6">
              <span className="num-orange">{p.n.padStart(2, "0")}</span>
              <h3 className="font-display mt-3 text-xl font-semibold">{p.paso}</h3>
              <Label>Qué decidimos</Label>
              <p className="mt-1 text-[14px] leading-relaxed">{p.decide}</p>
              <Label>Qué recibes</Label>
              <p className="mt-1 flex-1 text-[14px] leading-relaxed text-muted-foreground">{p.recibe}</p>
              <Label>Quién lo opera</Label>
              <p className="mt-1 text-[14px]">
                {p.opera.map(([n, h], i) => (
                  <span key={n}>{i > 0 ? (i === p.opera.length - 1 ? " y " : ", ") : ""}<A href={h}>{n}</A></span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </PageSection>
      <PageSection num="03." label="Lo que cambia la IA, y lo que no" title="La IA cambia la velocidad, el coste y la cadencia. No cambia el orden.">
        <div className="mt-10 grid max-w-5xl gap-6 md:grid-cols-2 text-[16px] leading-relaxed">
          <p>Con IA, el diagnóstico tarda días en lugar de semanas, la producción creativa cuesta una fracción y el ciclo se repite cada semana en lugar de cada trimestre.</p>
          <p>Hay cuatro decisiones que no toma la IA: a qué mercado vas, con qué propuesta de valor, a qué precio y qué no vas a hacer. Esas las firma una persona de RCKT contigo.</p>
        </div>
      </PageSection>
      <PageSection num="04." label="Cómo medimos" title="Medimos lo que causó la inversión, no lo que se atribuye cada plataforma.">
        <div className="mt-10 max-w-3xl space-y-5 text-[17px] leading-relaxed">
          <p>Usamos pruebas de incrementalidad: comparamos zonas o grupos con inversión y sin ella, y contrastamos el resultado con tus ventas reales. La atribución de las plataformas nos sirve como señal para operar, nunca como prueba de resultado.</p>
          <p className="card-kraft p-5 font-medium">Métrica principal: MER, la relación entre tus ingresos totales y tu inversión total en marketing.</p>
        </div>
      </PageSection>
      <PageSection num="05." label="Lo que vas a tener en tus manos" title="Tres documentos fijos, iguales en estructura para todos los clientes.">
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {DOCS.map(([t, d, w]) => (
            <article key={t} className="card-kraft flex flex-col p-7">
              <h3 className="font-display text-xl font-semibold">{t}</h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{d}</p>
              <p className="label-orange mt-5">{w}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <p className="font-display text-lg font-medium">Empieza por el paso 2 con un diagnóstico.</p>
          <CtaButton />
        </div>
      </PageSection>
    </PageShell>
  ),
});

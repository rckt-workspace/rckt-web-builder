import { createFileRoute } from "@tanstack/react-router";

import { CtaButton, PageSection, PageShell, productHead } from "@/components/rckt/ProductPage";

const VALORES = [
  ["Precisión", "Cada afirmación lleva su dato y cada dato, su fuente."],
  ["Crecimiento", "Medimos nuestro trabajo por el crecimiento de tu negocio, no por las horas."],
  ["Lealtad", "Decimos lo que vemos, también cuando no es lo que se quiere oír."],
];

// Hueco preparado: foto y enlace del fundador, ocultos hasta tenerlos.
const FUNDADOR = { foto: null as string | null, enlace: null as string | null };

const P = ({ children }: { children: string }) => <p className="mt-10 max-w-3xl text-[17px] leading-relaxed">{children}</p>;

export const Route = createFileRoute("/nosotros/")({
  head: () => productHead("/nosotros", "Ingeniería de crecimiento en Madrid | RCKT", "RCKT opera el ciclo completo de crecimiento de empresas con producto probado: estrategia, oferta, medios y medición."),
  component: () => (
    <PageShell
      label="Nosotros"
      title={<>RCKT es una firma de ingeniería de crecimiento con sede en <span className="hero-hand">Madrid.</span></>}
      subtitle="Trabajamos con empresas que ya tienen un producto que vende y quieren crecer con un plan, una meta con número y una medición que no depende de lo que diga cada plataforma."
    >
      <PageSection num="01." label="Qué hacemos distinto" title="Qué hacemos distinto.">
        <P>Una agencia ejecuta tácticas: la pauta, la web, los contenidos. RCKT opera el ciclo completo: decide la estrategia, diseña la oferta, la comunica, la pone donde te buscan y mide qué parte del resultado causó la inversión. Un solo responsable para todo el ciclo.</P>
      </PageSection>
      <PageSection num="02." label="Cómo usamos la IA" title="Cómo usamos la IA.">
        <P>La usamos para trabajar más rápido, producir más y medir cada semana. Cada agente tiene una persona responsable que revisa y aprueba lo que importa. IA supervisada y documentada.</P>
      </PageSection>
      <PageSection num="03." label="Valores" title="Valores.">
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALORES.map(([t, d], i) => (
            <article key={t} className="card-kraft p-7">
              <span className="num-orange">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-3 text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{d}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection num="04." label="Trayectoria" title="Trayectoria.">
        <P>RCKT nace de más de diez años de trabajo de su fundador en marketing digital, desarrollo de software y comercio electrónico, desde 2014.</P>
      </PageSection>
      <PageSection num="05." label="Fundador" title="Fundador.">
        <div className="card-kraft mt-10 flex max-w-3xl items-center gap-6 p-7">
          {FUNDADOR.foto ? <img src={FUNDADOR.foto} alt="Favián Gutiérrez" className="h-20 w-20 rounded-full object-cover" /> : null}
          <div>
            <h3 className="font-display text-xl font-semibold">Favián Gutiérrez, fundador y CEO.</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">Ingeniero industrial, con formación en emprendimiento e innovación en IE University.</p>
            {FUNDADOR.enlace ? <a href={FUNDADOR.enlace} className="mt-3 inline-block text-sm font-semibold text-orange hover:underline">Ver perfil →</a> : null}
          </div>
        </div>
      </PageSection>
      <PageSection num="06." label="Equipo" title="Equipo.">
        <P>Estrategia, creatividad, medios, datos e IA, CRM y desarrollo web.</P>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a href="/nosotros/trabaja-con-nosotros" className="text-sm font-semibold text-orange hover:underline">Trabaja con nosotros →</a>
          <CtaButton />
        </div>
      </PageSection>
    </PageShell>
  ),
});

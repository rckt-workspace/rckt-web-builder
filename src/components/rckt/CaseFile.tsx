import type { ReactNode } from "react";

import { CtaButton, PageSection, PageShell } from "@/components/rckt/ProductPage";

/** Campos de la ficha, en orden. Un campo vacío no se muestra. */
export type CaseFields = {
  cliente?: ReactNode;
  situacion?: ReactNode;
  queHicimos?: ReactNode;
  productos?: ReactNode;
  periodo?: ReactNode;
  resultado?: ReactNode;
  comoSeMidio?: ReactNode;
  proximoPaso?: ReactNode;
};

const ORDEN: [keyof CaseFields, string][] = [
  ["cliente", "Cliente"],
  ["situacion", "Situación inicial"],
  ["queHicimos", "Qué hicimos"],
  ["productos", "Productos"],
  ["periodo", "Periodo"],
  ["resultado", "Resultado"],
  ["comoSeMidio", "Cómo se midió"],
  ["proximoPaso", "Próximo paso"],
];

export default function CaseFile({ name, fields }: { name: string; fields: CaseFields }) {
  const rows = ORDEN.filter(([k]) => fields[k]);
  return (
    <PageShell label="Caso" title={<span className="hero-hand">{name}.</span>} subtitle={typeof fields.cliente === "string" ? fields.cliente : ""} cta={false}>
      <PageSection num="01." label="Ficha de caso" title="Ficha de caso.">
        <dl className="mt-10 grid max-w-4xl gap-4">
          {rows.map(([k, l]) => (
            <div key={k} className="card-kraft grid gap-2 p-6 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="label-orange">{l}</dt>
              <dd className="text-[15.5px] leading-relaxed">{fields[k]}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <p className="font-display text-lg font-medium">¿Tu situación se parece?</p>
          <CtaButton />
        </div>
      </PageSection>
    </PageShell>
  );
}

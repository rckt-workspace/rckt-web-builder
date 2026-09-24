import { useId, useState } from "react";

import SectionHeader from "@/components/rckt/SectionHeader";

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }),
  };
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="relative isolate py-16 md:py-24" style={{ background: "var(--sand)" }}>
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader num="FAQ." label="Preguntas frecuentes" title="Lo que nos preguntan." />
        <div className="mt-10 border-b" style={{ borderColor: "var(--line)" }}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-trigger-${index}`;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <div key={item.question} className="border-t" style={{ borderColor: "var(--line)" }}>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-[17px] font-semibold text-foreground transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span>{item.question}</span>
                  <span className="shrink-0 text-2xl font-normal leading-none text-orange" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="max-w-4xl pb-6 pr-12 text-[16px] leading-relaxed text-muted-foreground"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { createFileRoute } from "@tanstack/react-router";

import ClinicSalesFlowLanding, { CLINIC_FAQS } from "@/components/rckt/ClinicSalesFlowLanding";
import { faqJsonLd } from "@/components/rckt/FaqSection";

const title = "Sistema de captación y seguimiento para clínicas en Madrid · RCKT";
const description = "Conecta campañas, teléfono, WhatsApp y gestión de pacientes para medir cada solicitud hasta la primera visita.";

export const Route = createFileRoute("/lp/sales-flow-clinicas-madrid")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description }, { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/lp/sales-flow-clinicas-madrid" }],
    scripts: [faqJsonLd(CLINIC_FAQS)],
  }),
  component: () => <ClinicSalesFlowLanding variant="a" />,
});

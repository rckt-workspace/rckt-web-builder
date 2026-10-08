import { createFileRoute } from "@tanstack/react-router";

import RevenueEngineB2BLanding, { B2B_FAQS } from "@/components/rckt/RevenueEngineB2BLanding";
import { faqJsonLd } from "@/components/rckt/FaqSection";

const title = "Generación de oportunidades B2B medida hasta la venta · Madrid · RCKT";
const description = "Diseñamos campañas, página de destino, CRM y seguimiento para medir la captación B2B desde el clic hasta el contrato.";
const url = "https://www.rckt.es/lp/revenue-engine-b2b-madrid";

export const Route = createFileRoute("/lp/revenue-engine-b2b-madrid")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [faqJsonLd(B2B_FAQS)],
  }),
  component: () => <RevenueEngineB2BLanding variant="a" />,
});
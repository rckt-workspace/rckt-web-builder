import { createFileRoute } from "@tanstack/react-router";

import RevenueEngineB2BLanding, { B2B_FAQS } from "@/components/rckt/RevenueEngineB2BLanding";
import { faqJsonLd } from "@/components/rckt/FaqSection";

const title = "Generación de oportunidades B2B medida hasta la venta · Madrid · RCKT";
const description = "Conecta campañas y CRM para medir cada oportunidad B2B hasta la venta con un formulario inicial más breve.";
const url = "https://rckt-web-builder.lovable.app/lp/revenue-engine-b2b-madrid-b";

export const Route = createFileRoute("/lp/revenue-engine-b2b-madrid-b")({
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
  component: () => <RevenueEngineB2BLanding variant="b" />,
});
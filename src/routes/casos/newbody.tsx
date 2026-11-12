import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Caso NewBody · RCKT";
const DESC = "Clínicas de medicina estética en tres ciudades. Operación de pauta con venta por WhatsApp y seguimiento diario por ciudad.";

export const Route = createFileRoute("/casos/newbody")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/casos/newbody" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/casos/newbody" }],
  }),
  component: () => (
    <BasicPage
      label="Caso"
      title={<> <span className="hero-hand">NewBody</span></>}
      text={DESC}
    />
  ),
});

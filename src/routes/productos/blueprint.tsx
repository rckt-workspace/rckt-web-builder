import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Blueprint · Diseño de la oferta · RCKT";
const DESC = "Diseño de la oferta, el precio, los incentivos y la experiencia del cliente. ¿Qué vendemos, a qué precio y cómo lo vive el cliente?";

export const Route = createFileRoute("/productos/blueprint")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/productos/blueprint" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/productos/blueprint" }],
  }),
  component: () => (
    <BasicPage
      label="Producto"
      title={<><span className="hero-hand">Blueprint</span></>}
      text={DESC}
    />
  ),
});

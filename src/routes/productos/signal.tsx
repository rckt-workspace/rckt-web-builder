import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Signal · Meta y medición · RCKT";
const DESC = "Meta con número y medición de lo que causó la inversión. ¿Qué funcionó de verdad y qué hacemos la próxima semana?";

export const Route = createFileRoute("/productos/signal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/productos/signal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/productos/signal" }],
  }),
  component: () => (
    <BasicPage
      label="Producto"
      title={<><span className="hero-hand">Signal</span></>}
      text={DESC}
    />
  ),
});

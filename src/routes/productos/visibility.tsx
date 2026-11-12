import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Visibility · Presencia en IA y buscadores · RCKT";
const DESC = "Presencia en asistentes de IA, buscadores, marketplaces y tienda propia. ¿Nos encuentran y nos pueden comprar donde ya buscan?";

export const Route = createFileRoute("/productos/visibility")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/productos/visibility" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/productos/visibility" }],
  }),
  component: () => (
    <BasicPage
      label="Producto"
      title={<> <span className="hero-hand">Visibility</span></>}
      text={DESC}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Engine · Creatividad y medios · RCKT";
const DESC = "Producción creativa con IA y operación de medios pagos en un solo sistema. ¿Cómo comunicamos la oferta con el volumen que piden las plataformas?";

export const Route = createFileRoute("/productos/engine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/productos/engine" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/productos/engine" }],
  }),
  component: () => (
    <BasicPage
      label="Producto"
      title={<><span className="hero-hand">Engine</span></>}
      text={DESC}
    />
  ),
});

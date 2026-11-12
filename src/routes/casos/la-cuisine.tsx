import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Caso La Cuisine · RCKT";
const DESC = "Marcas premium de electrodomésticos y cocina. Producción creativa con IA, venta por WhatsApp y conciliación de la inversión contra las ventas de la tienda.";

export const Route = createFileRoute("/casos/la-cuisine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/casos/la-cuisine" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/casos/la-cuisine" }],
  }),
  component: () => (
    <BasicPage
      label="Caso"
      title={<><span className="hero-hand">La Cuisine</span></>}
      text={DESC}
    />
  ),
});

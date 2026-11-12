import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "El método · RCKT";
const DESC = "Una oferta crece de forma sostenida cuando crea valor para el cliente, para quienes la distribuyen y para la empresa. Lo aplicamos en cinco pasos y en orden: ninguna táctica se activa sin meta y estrategia escritas, y ningún periodo se cierra sin medir.";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/metodo" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/metodo" }],
  }),
  component: () => (
    <BasicPage
      label="Método"
      title={<>Un método fijo, operado cada <span className="hero-hand">semana.</span></>}
      text={DESC}
    />
  ),
});

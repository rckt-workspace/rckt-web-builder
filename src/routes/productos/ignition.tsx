import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Ignition · Diagnóstico y estrategia · RCKT";
const DESC = "Diagnóstico, estrategia escrita y plan de 90 días. ¿A quién vendemos, con qué valor y qué número hay que mover?";

export const Route = createFileRoute("/productos/ignition")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/productos/ignition" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/productos/ignition" }],
  }),
  component: () => (
    <BasicPage
      label="Producto"
      title={<> <span className="hero-hand">Ignition</span></>}
      text={DESC}
    />
  ),
});

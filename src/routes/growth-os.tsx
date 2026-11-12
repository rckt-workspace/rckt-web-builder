import { createFileRoute } from "@tanstack/react-router";

import BasicPage from "@/components/rckt/BasicPage";

const TITLE = "Growth OS · Los cinco productos juntos · RCKT";
const DESC = "Si quieres que operemos todo el ciclo, los cinco productos trabajan juntos en Growth OS.";

export const Route = createFileRoute("/growth-os")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rckt.es/growth-os" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://rckt.es/growth-os" }],
  }),
  component: () => (
    <BasicPage
      label="Growth OS"
      title={<> <span className="hero-hand">Growth OS</span></>}
      text={DESC}
    />
  ),
});

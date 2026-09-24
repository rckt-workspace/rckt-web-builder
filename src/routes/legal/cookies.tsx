import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";
import { CONTACTO_ES } from "@/config/contacto-es";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies · RCKT" },
      { name: "description", content: "Política de cookies de rckt.es: qué cookies usamos y cómo gestionar tu consentimiento." },
      { property: "og:title", content: "Cookies · RCKT" },
      { property: "og:description", content: "Política de cookies de rckt.es: qué cookies usamos y cómo gestionar tu consentimiento." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/legal/cookies" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/legal/cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Cookies"
      body={[
        "Este sitio no utiliza cookies de seguimiento publicitario. Únicamente usamos cookies técnicas imprescindibles para el correcto funcionamiento del sitio.",
        "Si en el futuro incorporamos herramientas de medición, actualizaremos esta página y solicitaremos tu consentimiento previo cuando la normativa así lo requiera.",
        `Cualquier duda, escríbenos a ${CONTACTO_ES.email}.`,
      ]}
    />
  ),
});

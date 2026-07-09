import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies · RCKT" },
      { name: "description", content: "Política de cookies de RCKT." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Cookies"
      body={[
        "Este sitio no utiliza cookies de seguimiento publicitario. Únicamente usamos cookies técnicas imprescindibles para el correcto funcionamiento del sitio.",
        "Si en el futuro incorporamos herramientas de medición, actualizaremos esta página y solicitaremos tu consentimiento previo cuando la normativa así lo requiera.",
        "Cualquier duda, escríbenos a hola@rckt.es.",
      ]}
    />
  ),
});
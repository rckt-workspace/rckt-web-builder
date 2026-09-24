import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";
import { CONTACTO_ES } from "@/config/contacto-es";

export const Route = createFileRoute("/legal/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · RCKT" },
      { name: "description", content: "Aviso legal de RCKT en España: datos de la entidad titular del sitio rckt.es y condiciones de uso." },
      { property: "og:title", content: "Aviso legal · RCKT" },
      { property: "og:description", content: "Aviso legal de RCKT en España: datos de la entidad titular del sitio rckt.es y condiciones de uso." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/legal/aviso-legal" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/legal/aviso-legal" }],
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      body={[
        `Titular: ${CONTACTO_ES.razonSocial}. ${CONTACTO_ES.cif}. Domicilio: ${CONTACTO_ES.direccion}. Contacto: ${CONTACTO_ES.email}.`,
        "Este sitio web y sus contenidos están en desarrollo. La información aquí publicada se ofrece a título informativo.",
        "Al utilizar este sitio aceptas hacerlo bajo tu propia responsabilidad.",
      ]}
    />
  ),
});

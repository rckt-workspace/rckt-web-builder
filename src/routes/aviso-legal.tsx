import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · RCKT" },
      { name: "description", content: "Aviso legal de RCKT." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      body={[
        "Titular: RCKT. Contacto: hola@rckt.es.",
        "Este sitio web y sus contenidos están en desarrollo. La información aquí publicada se ofrece a título informativo. Los términos definitivos se publicarán próximamente.",
        "Al utilizar este sitio aceptas hacerlo bajo tu propia responsabilidad.",
      ]}
    />
  ),
});
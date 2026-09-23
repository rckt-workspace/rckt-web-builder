import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";
import { CONTACTO_ES } from "@/config/contacto-es";

export const Route = createFileRoute("/legal/aviso-legal")({
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
        `Titular: ${CONTACTO_ES.razonSocial}. ${CONTACTO_ES.cif}. Domicilio: ${CONTACTO_ES.direccion}. Contacto: ${CONTACTO_ES.email}.`,
        "Este sitio web y sus contenidos están en desarrollo. La información aquí publicada se ofrece a título informativo. Los términos definitivos se publicarán próximamente.",
        "Al utilizar este sitio aceptas hacerlo bajo tu propia responsabilidad.",
      ]}
    />
  ),
});

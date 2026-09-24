import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";
import { CONTACTO_ES } from "@/config/contacto-es";

export const Route = createFileRoute("/legal/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad · RCKT" },
      { name: "description", content: "Política de privacidad de RCKT en España: qué datos tratamos, con qué finalidad y cómo ejercer tus derechos según el RGPD." },
      { property: "og:title", content: "Privacidad · RCKT" },
      { property: "og:description", content: "Política de privacidad de RCKT en España: qué datos tratamos, con qué finalidad y cómo ejercer tus derechos según el RGPD." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/legal/privacidad" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/legal/privacidad" }],
  }),
  component: () => (
    <LegalPage
      title="Privacidad"
      body={[
        `Responsable: ${CONTACTO_ES.razonSocial}. ${CONTACTO_ES.cif}. Domicilio: ${CONTACTO_ES.direccion}.`,
        "En RCKT tratamos los datos personales que nos facilitas con la única finalidad de responder a tu solicitud y darte seguimiento comercial.",
        "Base legal: consentimiento del interesado y el interés legítimo en atender tu consulta. Conservamos tus datos el tiempo estrictamente necesario para gestionar la relación y, después, durante los plazos legales aplicables. No cedemos datos a terceros salvo obligación legal o proveedores tecnológicos que actúan como encargados del tratamiento.",
        `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación escribiéndonos a ${CONTACTO_ES.email}.`,
      ]}
    />
  ),
});

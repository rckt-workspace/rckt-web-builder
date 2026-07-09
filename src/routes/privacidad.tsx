import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Privacidad · RCKT" },
      { name: "description", content: "Política de privacidad de RCKT." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacidad"
      body={[
        "En RCKT tratamos los datos personales que nos facilitas con la única finalidad de responder a tu solicitud y darte seguimiento comercial.",
        "Base legal: consentimiento del interesado y el interés legítimo en atender tu consulta. Conservamos tus datos el tiempo estrictamente necesario para gestionar la relación.",
        "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación escribiéndonos a hola@rckt.es.",
      ]}
    />
  ),
});
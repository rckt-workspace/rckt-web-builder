import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";
import { CONTACTO_ES } from "@/config/contacto-es";

export const Route = createFileRoute("/legal/privacidad")({
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
        `Responsable: ${CONTACTO_ES.razonSocial}. ${CONTACTO_ES.cif}. Domicilio: ${CONTACTO_ES.direccion}.`,
        "En RCKT tratamos los datos personales que nos facilitas con la única finalidad de responder a tu solicitud y darte seguimiento comercial.",
        "Base legal: consentimiento del interesado y el interés legítimo en atender tu consulta. Conservamos tus datos el tiempo estrictamente necesario para gestionar la relación y, después, durante los plazos legales aplicables. No cedemos datos a terceros salvo obligación legal o proveedores tecnológicos que actúan como encargados del tratamiento.",
        `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación escribiéndonos a ${CONTACTO_ES.email}.`,
      ]}
    />
  ),
});

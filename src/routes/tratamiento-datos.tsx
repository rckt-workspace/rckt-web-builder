import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/rckt/legal-page";

export const Route = createFileRoute("/tratamiento-datos")({
  head: () => ({
    meta: [
      { title: "Política de Tratamiento de Datos · RCKT" },
      {
        name: "description",
        content: "Política de tratamiento de datos personales de RCKT.",
      },
      { property: "og:title", content: "Política de Tratamiento de Datos · RCKT" },
      {
        property: "og:description",
        content: "Cómo RCKT recoge, usa y protege los datos personales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de Tratamiento de Datos"
      body={[
        "Los datos personales que nos facilitas a través de los formularios de este sitio o del asesor conversacional se tratan con la única finalidad de atender tu solicitud, valorar un posible proyecto y mantener contacto comercial contigo.",
        "La base legal del tratamiento es tu consentimiento expreso al enviar el formulario y el interés legítimo en responder a solicitudes de información profesional.",
        "Conservamos los datos durante el tiempo necesario para gestionar la relación y, posteriormente, durante los plazos legales aplicables. No cedemos datos a terceros salvo obligación legal o proveedores tecnológicos que actúan como encargados del tratamiento.",
        "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@rckt.es.",
      ]}
    />
  ),
});

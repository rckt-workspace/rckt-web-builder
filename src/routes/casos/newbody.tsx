import { createFileRoute } from "@tanstack/react-router";

import CaseFile from "@/components/rckt/CaseFile";
import { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/casos/newbody")({
  head: () => productHead("/casos/newbody", "Caso NewBody | RCKT", "Clínicas de medicina estética en tres ciudades: operación de pauta por ciudad y seguimiento diario con hora de corte."),
  component: () => (
    <CaseFile
      name="NewBody"
      fields={{
        cliente: "Clínicas de medicina estética en tres ciudades, con venta por WhatsApp.",
        situacion: undefined,
        queHicimos: "Operación de pauta por ciudad; estructura de cuentas y ciclo creativo propios del sector; seguimiento diario por ciudad con hora de corte.",
        productos: <><A href="/productos/engine">Engine</A> y <A href="/productos/signal">Signal</A>.</>,
        periodo: undefined,
        resultado: undefined,
        comoSeMidio: undefined,
        proximoPaso: "Primera prueba de incrementalidad documentada y agentes de WhatsApp para las clínicas.",
      }}
    />
  ),
});

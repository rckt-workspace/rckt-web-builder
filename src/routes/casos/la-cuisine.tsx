import { createFileRoute } from "@tanstack/react-router";

import CaseFile from "@/components/rckt/CaseFile";
import { A, productHead } from "@/components/rckt/ProductPage";

export const Route = createFileRoute("/casos/la-cuisine")({
  head: () => productHead("/casos/la-cuisine", "Caso La Cuisine | RCKT", "Marcas premium de electrodomésticos y cocina: producción creativa con IA, plan de medios y conciliación de la inversión contra las ventas de la tienda."),
  component: () => (
    <CaseFile
      name="La Cuisine"
      fields={{
        cliente: "Marcas premium de electrodomésticos y cocina, con tienda propia y venta por WhatsApp.",
        situacion: undefined,
        queHicimos: "Producción creativa con IA para varias marcas; plan de medios del segundo semestre de 2026 con escenarios de inversión; conciliación de la inversión facturada por Google y Meta contra las ventas de la tienda.",
        productos: <><A href="/productos/ignition">Ignition</A>, <A href="/productos/engine">Engine</A> y <A href="/productos/signal">Signal</A>.</>,
        periodo: undefined,
        resultado: undefined,
        comoSeMidio: "Ventas reales de la tienda frente a la inversión facturada.",
        proximoPaso: "Primera prueba de incrementalidad documentada.",
      }}
    />
  ),
});

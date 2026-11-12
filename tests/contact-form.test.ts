import { describe, expect, it } from "vitest";

import { buildLeadPayload, INVERSIONES, SITUACIONES } from "@/components/rckt/ContactForm";

const base = { nombre: " Ana ", empresa: "Acme", web: "acme.es", cargo: "CEO", email: "ana@acme.es", telefono: "600", situacion: SITUACIONES[2], inversion: INVERSIONES[1], mensaje: "Hola" };

describe("formulario de contacto", () => {
  it("guarda la situación en concern y origen contacto", () => {
    const p = buildLeadPayload(base);
    expect(p.concern).toBe("Ya invierto y no sé qué funciona");
    expect(p.source).toBe("contacto");
    expect(p.name).toBe("Ana");
  });
  it("guarda los campos sin columna propia en details con su etiqueta", () => {
    const p = buildLeadPayload(base);
    expect(p.details).toEqual({ Cargo: "CEO", Teléfono: "600", "Inversión mensual en marketing": "De 5.000 a 15.000 €", "Cuéntanos más": "Hola" });
  });
  it("ofrece los cuatro tramos de inversión pedidos", () => {
    expect(INVERSIONES).toEqual(["Menos de 5.000 €", "De 5.000 a 15.000 €", "De 15.000 a 50.000 €", "Más de 50.000 €"]);
  });
});

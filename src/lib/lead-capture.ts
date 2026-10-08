import type { QualificationValues } from "@/components/rckt/QualificationForm";

interface LeadCaptureRequest {
  name: string;
  email: string;
  company: string;
  website?: string;
  concern?: string;
  source?: string;
  numero_sedes?: string;
  tratamientos_principales?: string;
  details?: Record<string, string>;
}

interface LeadCaptureResponse {
  ok: boolean;
  error?: string;
}

/**
 * Normaliza campos que pueden estar vacíos
 */
function normalizeString(value: string | null | undefined): string | undefined {
  const trimmed = (value ?? "").toString().trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Mapea QualificationValues al contrato esperado por /api/leads
 */
function mapQualificationToLead(values: QualificationValues, source: string): LeadCaptureRequest {
  return {
    name: values.nombre.trim(),
    email: values.email.trim(),
    company: values.empresa.trim(),
    website: normalizeString(values.web),
    concern: normalizeString(values.problema),
    source,
    numero_sedes: normalizeString(values.numero_sedes),
    tratamientos_principales: normalizeString(values.tratamientos_principales),
    details: {
      telefono: normalizeString(values.telefono) ?? "",
      cargo: values.cargo,
      pais: values.pais,
      ciudad: normalizeString(values.ciudad) ?? "",
      empleados: values.empleados,
      sector: normalizeString(values.sector) ?? "",
      inversion_marketing: normalizeString(values.inversion) ?? "",
      leads_mes: normalizeString(values.leads) ?? "",
      crm: normalizeString(values.crm) ?? "",
      whatsapp: normalizeString(values.whatsapp) ?? "",
      inicio: normalizeString(values.inicio) ?? "",
    },
  };
}

/**
 * Captura y envía un lead a través de /api/leads
 * @param values - Valores del QualificationForm
 * @param source - Origen del lead (e.g., "contacto", "revenue-diagnostic")
 * @throws Error si la API falla o la respuesta no es exitosa
 */
export async function captureLeadFromQualification(
  values: QualificationValues,
  source: string,
): Promise<void> {
  const lead = mapQualificationToLead(values, source);

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    let errorMessage = "No se pudo enviar el formulario.";
    try {
      const data = (await response.json()) as LeadCaptureResponse;
      if (data.error) {
        errorMessage = data.error;
      }
    } catch {
      // Si no podemos parsear JSON, usar el mensaje por defecto
    }
    throw new Error(errorMessage);
  }
}

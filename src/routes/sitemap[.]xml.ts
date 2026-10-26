import { createFileRoute } from "@tanstack/react-router";

// Dominio público oficial (el mismo que usan las direcciones canónicas del sitio)
const BASE_URL = "https://rckt.es";

// Páginas públicas fijas. Quedan fuera: legales (tienen noindex), redirecciones,
// landings de campaña (/lp…), panel interno, login y API.
// Si se crea una página pública nueva, agrégala aquí.
const STATIC_PATHS = [
  "/",
  "/casos",
  "/contacto",
  "/mercados",
  "/mercados/madrid",
  "/nosotros",
  "/nosotros/como-trabajamos",
  "/nosotros/trabaja-con-nosotros",
  "/recursos",
  "/sectores",
  "/sectores/construccion-inmobiliario",
  "/sectores/ecommerce",
  "/sectores/educacion",
  "/sectores/industria-distribucion",
  "/sectores/salud-estetica-odontologia",
  "/sectores/servicios-b2b",
  "/sistemas",
  "/sistemas/demand-system",
  "/sistemas/operations-system",
  "/sistemas/revenue-diagnostic",
  "/sistemas/revenue-engine",
  "/sistemas/sales-flow",
  "/soluciones",
  "/soluciones/captacion-y-cierre",
  "/soluciones/ecommerce-rentable",
  "/soluciones/operacion",
];

type Entry = { path: string; lastmod?: string };

/** Artículos publicados: /recursos/<slug>, con su fecha de última actualización */
async function blogEntries(): Promise<Entry[]> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin as any)
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());
    if (error) throw new Error(error.message);
    return ((data ?? []) as { slug: string; updated_at: string | null; published_at: string | null }[])
      .filter((p) => p.slug && /^[a-z0-9-]+$/.test(p.slug))
      .map((p) => {
        const fecha = new Date(p.updated_at || p.published_at || "");
        return {
          path: `/recursos/${p.slug}`,
          lastmod: Number.isNaN(fecha.getTime()) ? undefined : fecha.toISOString().slice(0, 10),
        };
      });
  } catch (err) {
    // Si la base no responde, el sitemap sale igual con las páginas fijas
    console.error("Sitemap: no se pudieron cargar los artículos del blog:", err);
    return [];
  }
}

const escapeXml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [...STATIC_PATHS.map((path) => ({ path })), ...(await blogEntries())];
        const urls = entries
          .map((e) => {
            const loc = escapeXml(new URL(e.path, BASE_URL).href);
            return `<url><loc>${loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`;
          })
          .join("");
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

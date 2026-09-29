import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import heroPhotoImg from "@/assets/rckt-cta-final.jpg";

const heroPhoto = heroPhotoImg;

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string | null;
  categorySlug: string | null;
  authorName: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
};

const CATEGORY_MAP: Record<string, string> = {
  "Del lead a la venta": "lead-venta",
  "Medios con medición": "medios",
  "IA que se paga sola": "ia",
  "WhatsApp y CRM": "whatsapp",
  "Web y conversión": "web",
};

const TEMA_DETAILS: Record<string, { num: string; nombre: string; pregunta: string; sistema: string; href: string; angulo: string }> = {
  "lead-venta": { num: "01", nombre: "Del lead a la venta", pregunta: "¿Por qué tengo leads y no ventas?", sistema: "Revenue Engine", href: "/sistemas/revenue-engine", angulo: "135deg" },
  "medios": { num: "02", nombre: "Medios con medición", pregunta: "¿Meta o Google? ¿Por qué mi agencia me da leads baratos que no compran?", sistema: "Demand System", href: "/sistemas/demand-system", angulo: "100deg" },
  "ia": { num: "03", nombre: "IA que se paga sola", pregunta: "¿Dónde me da retorno la IA?", sistema: "Operations System", href: "/sistemas/operations-system", angulo: "165deg" },
  "whatsapp": { num: "04", nombre: "WhatsApp y CRM", pregunta: "¿Cómo dejo de perder leads en WhatsApp?", sistema: "Sales Flow", href: "/sistemas/sales-flow", angulo: "205deg" },
  "web": { num: "05", nombre: "Web y conversión", pregunta: "¿Por qué mi web no genera oportunidades?", sistema: "Sales Flow", href: "/sistemas/sales-flow", angulo: "60deg" },
};

function temaDe(id: string) {
  return TEMA_DETAILS[id] || null;
}

function Portada({ coverImage, category }: { coverImage: string | null; category: string | null }) {
  const temaId = category ? Object.entries(CATEGORY_MAP).find(([k, v]) => k === category)?.[1] : null;
  const tema = temaId ? temaDe(temaId) : null;

  if (coverImage) {
    return (
      <div className="res-cover" aria-hidden="true">
        <img src={coverImage} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="res-cover" style={{ ["--res-ang" as string]: tema?.angulo || "135deg" }} aria-hidden="true">
      <span className="res-cover__brand">RCKT</span>
      <span className="res-cover__theme">{tema?.nombre || "Recursos"}</span>
    </div>
  );
}

function useReveal(count: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el, i) => {
      el.style.setProperty("--d", `${(i % 6) * 80}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [count]);
  return ref;
}

function RecursosPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<string | "todos">("todos");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blog/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = (await res.json()) as { posts: BlogPost[] };
        setPosts(data.posts || []);
        setError(null);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("No se pudieron cargar los recursos.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    void loadPosts();
  }, []);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (categoria !== "todos" && p.category !== categoria) return false;
      if (!q) return true;
      const inTitle = p.title.toLowerCase().includes(q);
      const inExcerpt = p.excerpt.toLowerCase().includes(q);
      const inTags = (p.tags || []).some(t => t.toLowerCase().includes(q));
      return inTitle || inExcerpt || inTags;
    });
  }, [query, categoria, posts]);

  const gridRef = useReveal(filtrados.length);

  const highlighted = filtrados.find((p) => p.featured) || filtrados[0];
  const gridPosts = highlighted ? filtrados.filter((p) => p.id !== highlighted.id) : filtrados;

  const limpiar = () => {
    setQuery("");
    setCategoria("todos");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Recursos"
          title={
            <>
              Respuestas antes de la <span className="hero-hand">primera llamada.</span>
            </>
          }
          descriptor="Artículos y guías para captar mejor, medir hasta la venta y usar la IA donde de verdad rinde."
          ctaLabel="Solicitar diagnóstico de captación →"
          ctaHref="/sistemas/revenue-diagnostic"
        />

        <section className="relative overflow-hidden pb-16 md:pb-24" style={{ background: "var(--kraft-2)" }}>
          <div className="mx-auto max-w-6xl px-5 pt-10 md:px-6 md:pt-16">
            <div className="max-w-md">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar recursos"
                  aria-label="Buscar recursos"
                  className="res-input w-full rounded-full py-3 pr-4 pl-11 text-[14px] text-foreground outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="res-filter" data-active={categoria === "todos"} onClick={() => setCategoria("todos")}>
                Todos
              </button>
              {Object.entries(CATEGORY_MAP).map(([nombre, id]) => (
                <button
                  key={id}
                  type="button"
                  className="res-filter"
                  data-active={categoria === nombre}
                  onClick={() => setCategoria(nombre)}
                >
                  {nombre}
                </button>
              ))}
            </div>

            {loading && (
              <div className="mt-12 py-20 text-center">
                <p className="text-[15px] text-muted-foreground">Cargando recursos...</p>
              </div>
            )}

            {error && (
              <div className="mt-12 py-20 text-center">
                <p className="text-[15px] text-muted-foreground">{error}</p>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="mt-12 py-20 text-center">
                <p className="text-[15px] text-muted-foreground">No hay recursos publicados todavía.</p>
              </div>
            )}

            {!loading && !error && posts.length > 0 && (
              <>
                {highlighted && (
                  <div className="mt-12">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-block h-4 w-[2px] bg-orange" />
                      <span className="label-orange">Destacado</span>
                    </div>
                    <article className="res-featured grid overflow-hidden rounded-[14px] md:grid-cols-2">
                      <Portada coverImage={highlighted.coverImage} category={highlighted.category} />
                      <div className="flex flex-col justify-center p-6 text-left md:p-8">
                        <div className="flex flex-wrap gap-2">
                          {highlighted.category && <span className="res-chip">{highlighted.category}</span>}
                        </div>
                        <h2 className="font-display mt-4 text-[24px] leading-[1.15] font-semibold tracking-tight text-foreground md:text-[30px]">
                          {highlighted.title}
                        </h2>
                        <p className="mt-3 text-[15px] leading-[1.6] text-muted-foreground">{highlighted.excerpt}</p>
                        <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                          {highlighted.publishedAt ? new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(highlighted.publishedAt)) : ""}
                        </p>
                        <button type="button" onClick={() => navigate({ to: `/recursos/${highlighted.slug}` })} className="mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold text-orange hover:underline cursor-pointer bg-transparent border-0 p-0">
                          Leer →
                        </button>
                      </div>
                    </article>
                  </div>
                )}

                {filtrados.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-[15px] text-muted-foreground">No hay recursos con esos filtros.</p>
                    <button
                      type="button"
                      onClick={limpiar}
                      className="mt-3 text-[14px] font-semibold text-orange hover:underline"
                    >
                      Quitar filtros
                    </button>
                  </div>
                ) : (
                  <div ref={gridRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gridPosts.map((p) => (
                      <button key={p.slug} type="button" onClick={() => navigate({ to: `/recursos/${p.slug}` })} className="res-card group block cursor-pointer bg-transparent border-0 p-0 text-left w-full">
                        <Portada coverImage={p.coverImage} category={p.category} />
                        <div className="flex flex-1 flex-col p-5 text-left">
                          {p.category && <span className="res-chip self-start">{p.category}</span>}
                          <h3 className="font-display mt-3 text-[17px] leading-[1.25] font-semibold tracking-tight text-foreground group-hover:text-orange transition-colors">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-[14px] leading-[1.55] text-muted-foreground">{p.excerpt}</p>
                          <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                            {p.publishedAt ? new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(p.publishedAt)) : ""}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold text-orange group-hover:gap-2 transition-all">
                            Leer →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            <p className="mt-16 text-center text-[14px] text-muted-foreground">
              Sin registro ni formularios: los recursos se leen y se descargan libremente.
            </p>
          </div>
        </section>

        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  );
}

function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(252, 92, 31,0.9) 0%, rgba(252, 92, 31,0.6) 45%, rgba(252, 92, 31,0) 100%)",
          zIndex: 3,
        }}
      />
      <div className="hero-photo" aria-hidden="true">
        <img src={heroPhoto} alt="" className="hero-photo-img cta-photo-img" />
        <div className="cta-photo-fade" />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-120px",
          width: "900px",
          height: "650px",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 700px 500px at 100% 0%, rgba(252, 92, 31,0.35) 0%, rgba(252, 92, 31,0.18) 40%, rgba(252, 92, 31,0) 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mb-4">
            <span className="label-orange">¿Empezamos?</span>
          </div>
          <h2
            className="font-display text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[56px]"
            style={{ color: "#f5f2ed" }}
          >
            ¿Por dónde <em className="font-serif-accent">empezamos?</em>
          </h2>
          <div className="mt-10 flex justify-center">
            <a
              href="/sistemas/revenue-diagnostic"
              className="btn-orange font-display inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold"
            >
              Solicitar diagnóstico de captación →
            </a>
          </div>
        </div>
        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-mono text-[11px] tracking-[0.18em] uppercase"
          style={{ borderColor: "rgba(245,242,237,0.22)", color: "rgba(245,242,237,0.7)" }}
        >
          <span className="ml-auto">IA supervisada y documentada</span>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/recursos/")({
  head: () => ({
    meta: [
      { title: "Recursos: guías y artículos sobre captación, medición e IA | RCKT.es" },
      {
        name: "description",
        content:
          "Guías, artículos y plantillas sobre las fugas entre la inversión en marketing y la venta: medición, medios, WhatsApp y CRM, web e IA supervisada.",
      },
      { property: "og:title", content: "Recursos: guías y artículos sobre captación, medición e IA | RCKT.es" },
      {
        property: "og:description",
        content:
          "Guías, artículos y plantillas sobre las fugas entre la inversión en marketing y la venta: medición, medios, WhatsApp y CRM, web e IA supervisada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/recursos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/recursos" }],
  }),
  component: RecursosPage,
});

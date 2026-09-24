import { createFileRoute } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef } from "react";

import QualificationForm from "@/components/rckt/QualificationForm";

import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { CONTACTO_ES } from "@/config/contacto-es";

/* ── Animación de entrada ─────────────────────────────────────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
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
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--d", `${(i % 5) * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── Página ───────────────────────────────────────────────────────── */

function ContactoPage() {
  const rootRef = useReveal<HTMLDivElement>();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero
          label="Contacto"
          title={
            <>
              Cuéntanos <em className="font-serif-accent">dónde se pierde el dinero.</em>
            </>
          }
          descriptor="Con estos datos preparamos la primera conversación. Te respondemos en un día laborable."
          ctaLabel="Ir al formulario →"
          ctaHref="#formulario"
        />

        <section id="formulario" className="relative isolate" style={{ background: "var(--kraft)", overflow: "clip" }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ overflow: "clip" }}>
          </div>

          <div ref={rootRef} className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[38%_1fr] lg:gap-14">
              {/* Formulario (primero en móvil) */}
              <div className="order-1 lg:order-2">
                <div data-reveal className="ct-rev">
                  <QualificationForm />
                </div>
              </div>

              {/* Canales */}
              <div className="order-2 lg:order-1">
                <div className="lg:sticky" style={{ top: "120px" }}>
                  <div data-reveal className="ct-rev">
                    <h2 className="font-display text-[26px] leading-[1.15] font-semibold tracking-tight md:text-[30px]">
                      Otras formas de hablar <em className="font-serif-accent">con nosotros.</em>
                    </h2>

                    <div className="mt-8 space-y-0">
                      <div className="flex gap-4 pb-7">
                        <span className="ct-icon" aria-hidden="true">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[17px] font-semibold">Formulario</h3>
                            <span className="ct-badge">RECOMENDADO</span>
                          </div>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            La vía principal. Es la más rápida para preparar el diagnóstico.
                          </p>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true">
                          <Phone className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">Llamada agendada</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            Elige un hueco en la agenda y te llamamos.
                          </p>
                          <a
                            href={CONTACTO_ES.agendaHref}
                            className="mt-3 inline-block text-[14px] font-semibold text-orange hover:underline"
                          >
                            Agendar llamada →
                          </a>
                          <p className="mt-2 text-[13.5px] text-muted-foreground">
                            <a href={CONTACTO_ES.telefonoHref} className="hover:text-foreground">
                              {CONTACTO_ES.telefono}
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="ct-divider flex gap-4 py-7">
                        <span className="ct-icon" aria-hidden="true">
                          <MessageCircle className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold">WhatsApp</h3>
                          <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted-foreground">
                            Si lo prefieres, escríbenos.
                          </p>
                          <a
                            href={CONTACTO_ES.whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block text-[14px] font-semibold text-muted-foreground hover:text-orange"
                          >
                            Escribir por WhatsApp →
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="ct-mini mt-6 p-5">
                      <p className="label-orange !text-[10px]">Datos</p>
                      <a
                        href={`mailto:${CONTACTO_ES.email}`}
                        className="mt-3 block text-[14.5px] font-semibold text-foreground hover:text-orange"
                      >
                        {CONTACTO_ES.email}
                      </a>
                      <p className="mt-2 text-[14px] text-muted-foreground">{CONTACTO_ES.direccion}</p>
                      <p className="mt-1 text-[14px] text-muted-foreground">{CONTACTO_ES.horario}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | RCKT.es" },
      {
        name: "description",
        content:
          "Solicita un Revenue Diagnostic: cuéntanos tu situación comercial y preparamos la primera conversación.",
      },
      { property: "og:title", content: "Contacto | RCKT.es" },
      {
        property: "og:description",
        content:
          "Solicita un Revenue Diagnostic: cuéntanos tu situación comercial y preparamos la primera conversación.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/contacto" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/contacto" }],
  }),
  component: ContactoPage,
});

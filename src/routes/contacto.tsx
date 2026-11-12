import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import ContactForm from "@/components/rckt/ContactForm";
import { productHead } from "@/components/rckt/ProductPage";

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
          title={<>Solicita tu <span className="hero-hand">diagnóstico.</span></>}
          descriptor="Cuéntanos qué te pasa hoy. Una persona del equipo de RCKT lee cada solicitud y te responde con la ruta de entrada que encaja con tu caso, qué vamos a entregar y en qué plazo."
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
                  <ContactForm />
                </div>
              </div>

              {/* Canales */}
              <div className="order-2 lg:order-1">
                <div className="lg:sticky" style={{ top: "120px" }}>
                  <div data-reveal className="ct-rev">
                    <p className="font-display text-[22px] leading-[1.3] font-semibold tracking-tight md:text-[26px]">
                      El diagnóstico es de pago y tiene entregables y fecha definidos. Si tu sector tiene mapa de mercado propio, lo hacemos en una semana.
                    </p>

                    <div className="ct-mini mt-6 p-5">
                      <p className="label-orange !text-[10px]">Contacto</p>
                      <a
                        href={`mailto:${CONTACTO_ES.email}`}
                        className="mt-3 block text-[14.5px] font-semibold text-foreground hover:text-orange"
                      >
                        {CONTACTO_ES.email}
                      </a>
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
  head: () => productHead("/contacto", "Solicita un diagnóstico de crecimiento | RCKT", "Cuéntanos qué te pasa hoy y te respondemos con la ruta de entrada, los entregables y el plazo."),
  component: ContactoPage,
});

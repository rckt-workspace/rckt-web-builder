import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BriefcaseBusiness, FolderOpen, HeartPulse, UsersRound } from "lucide-react";

import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SpainMap from "@/components/rckt/SpainMap";
import SystemPageHero from "@/components/rckt/SystemPageHero";
import { CONTACTO_ES } from "@/config/contacto-es";

// PENDIENTE: contenido real de Madrid
export const Route = createFileRoute("/mercados/madrid")({
  head: () => ({
    meta: [
      { title: "RCKT en Madrid | RCKT.es" },
      { name: "description", content: "RCKT en Madrid: sistemas que convierten demanda en ventas para empresas de salud, estética, odontología y servicios B2B." },
      { property: "og:title", content: "RCKT en Madrid | RCKT.es" },
      { property: "og:description", content: "RCKT en Madrid: sistemas que convierten demanda en ventas para empresas de salud, estética, odontología y servicios B2B." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.rckt.es/mercados/madrid" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.rckt.es/mercados/madrid" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "RCKT Madrid",
        address: CONTACTO_ES.direccion,
        telephone: CONTACTO_ES.telefono,
        email: CONTACTO_ES.email,
        areaServed: "Madrid",
      }),
    }],
  }),
  component: MadridPage,
});

function MadridPage() {
  return (
    <div className="market-page min-h-screen bg-background text-foreground antialiased">
      <SiteNav />
      <main>
        <SystemPageHero label="Madrid" title={<>RCKT en <span className="text-orange">Madrid.</span></>} context="Madrid es nuestro primer mercado activo en España y la base desde la que atendemos al resto del país." ctaLabel="Solicitar diagnóstico de captación →" ctaHref="/sistemas/revenue-diagnostic" />

        <PageSection num="01." label="Por qué Madrid" title="Por qué Madrid.">
          <div className="madrid-intro mt-9">
            <p className="market-copy">Empezamos donde está nuestro equipo y donde se concentran los sectores que mejor conocemos. Desde Madrid operamos cuentas en toda España, con reuniones presenciales cuando hacen falta.</p>
            <SpainMap compact />
          </div>
        </PageSection>

        <PageSection num="02." label="Sectores que atendemos" title="Sectores que atendemos.">
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <SectorLink icon={HeartPulse} title="Salud, estética y odontología" href="/sectores/salud-estetica-odontologia" />
            <SectorLink icon={BriefcaseBusiness} title="Servicios B2B" href="/sectores/servicios-b2b" />
          </div>
          <a href="/sectores/" className="mt-7 inline-block font-semibold text-orange hover:underline">Ver todos los sectores →</a>
        </PageSection>

        <section className="page-section">
          <div className="page-shell grid gap-12 lg:grid-cols-2 lg:gap-7">
            <div>
              <SectionHeader num="03." label="Casos en Madrid" title="Casos en Madrid." />
              <div className="market-note mt-9 p-7 md:p-8"><FolderOpen className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">Aquí mostraremos los casos de éxito de clientes en Madrid, siempre con ficha completa: situación inicial, inversión, intervención y método de medición.</p><a href="/casos/" className="mt-6 inline-block text-[15px] font-semibold text-orange hover:underline">Ver cómo presentamos cada caso →</a></div>
            </div>
            <div>
              <SectionHeader num="04." label="Equipo local" title="Equipo local." />
              <div className="market-note mt-9 p-7 md:p-8"><UsersRound className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><p className="market-copy mt-5">Espacio reservado para presentar al equipo de RCKT en Madrid.</p></div>
            </div>
          </div>
        </section>

        <PageSection num="05." label="Datos de contacto" title="Datos de contacto.">
          <div className="market-feature-card mt-10 p-7 md:p-8">
            <dl className="contact-list">
              <div><dt>Dirección</dt><dd>{CONTACTO_ES.direccion}</dd></div>
              <div><dt>Teléfono</dt><dd><a href={CONTACTO_ES.telefonoHref}>{CONTACTO_ES.telefono}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${CONTACTO_ES.email}`}>{CONTACTO_ES.email}</a></dd></div>
              <div><dt>Horario</dt><dd>{CONTACTO_ES.horario}</dd></div>
            </dl>
            <a href="/sistemas/revenue-diagnostic" className="btn-orange font-display mt-8 inline-flex rounded-full px-7 py-3.5 text-[14px] font-semibold">Solicitar diagnóstico de captación →</a>
          </div>
        </PageSection>
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function PageSection({ num, label, title, children }: { num: string; label: string; title: string; children: ReactNode }) {
  return <section className="page-section"><div className="page-shell"><SectionHeader num={num} label={label} title={title} />{children}</div></section>;
}

function SectorLink({ icon: Icon, title, href }: { icon: typeof HeartPulse; title: string; href: string }) {
  return <a href={href} className="market-feature-card group block p-7 md:p-8"><Icon className="h-[22px] w-[22px] text-orange" aria-hidden="true" /><h3 className="font-display mt-5 text-[18px] font-semibold">{title}</h3><span className="mt-6 inline-block text-[15px] font-semibold text-orange group-hover:underline">Ver sector →</span></a>;
}
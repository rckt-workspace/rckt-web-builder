import type { ReactNode } from "react";

import GeneralCta from "@/components/rckt/GeneralCta";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

/** Página pública con hero (H1 + texto) y llamada final; el contenido completo llega después. */
export default function BasicPage({ label, title, text }: { label: string; title: ReactNode; text: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label={label} title={title} descriptor={text} ctaLabel="Solicitar diagnóstico" ctaHref="/contacto" />
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

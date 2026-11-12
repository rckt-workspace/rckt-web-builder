import type { ReactNode } from "react";

import GeneralCta from "@/components/rckt/GeneralCta";
import SectionHeader from "@/components/rckt/SectionHeader";
import SiteFooter from "@/components/rckt/SiteFooter";
import SiteNav from "@/components/rckt/SiteNav";
import SystemPageHero from "@/components/rckt/SystemPageHero";

export type Proof = { name: string; text: string; href: string; metric?: string };
export type Block =
  | { kind: "text"; label: string; body: ReactNode; note?: ReactNode }
  | { kind: "quotes"; label: string; items: string[] }
  | { kind: "list"; label: string; items: ReactNode[] }
  | { kind: "modules"; label: string; items: [string, string][]; note?: ReactNode }
  | { kind: "table"; label: string; head: string[]; rows: string[][] }
  | { kind: "proof"; label: string; items: Proof[] };

export const OG_IMAGE = "https://rckt.es/og-default.jpg";

export function productHead(path: string, title: string, description: string, extra: { robots?: string } = {}) {
  const url = `https://rckt.es${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
      ...(extra.robots ? [{ name: "robots", content: extra.robots }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

const link = "font-semibold text-orange hover:underline";
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className={link}>{children}</a>
);

function BlockBody({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return (
        <div className="mt-10 max-w-3xl">
          <p className="text-[17px] leading-relaxed">{b.body}</p>
          {b.note ? <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{b.note}</p> : null}
        </div>
      );
    case "quotes":
      return (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {b.items.map((q) => (
            <li key={q} className="card-kraft p-6 font-display text-lg font-medium leading-snug">«{q}»</li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul className="mt-10 grid max-w-4xl gap-4">
          {b.items.map((it, i) => (
            <li key={i} className="card-kraft flex gap-4 p-5 text-[15.5px] leading-relaxed">
              <span className="num-orange shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "modules":
      return (
        <>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {b.items.map(([n, d]) => (
              <article key={n} className="card-kraft p-7">
                <h3 className="font-display text-lg font-semibold leading-snug">{n}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
          {b.note ? <p className="mt-8 text-[15px] text-muted-foreground">{b.note}</p> : null}
        </>
      );
    case "table":
      return (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {b.rows.map((r) => (
            <article key={r[0]} className="card-kraft flex flex-col p-7">
              <h3 className="font-display text-xl font-semibold">{r[0]}</h3>
              {r.slice(1).map((c, i) => (
                <div key={i} className="mt-4">
                  <p className="label-orange">{b.head[i + 1]}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">{c}</p>
                </div>
              ))}
            </article>
          ))}
        </div>
      );
    case "proof":
      return (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {b.items.map((c) => (
            <article key={c.name} className="card-kraft flex flex-col p-7 md:p-8">
              {c.metric && <p className="font-display text-4xl font-semibold text-orange">{c.metric}</p>}
              <h3 className="font-display text-xl font-semibold">{c.name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{c.text}</p>
              <a href={c.href} className="mt-5 text-sm font-semibold text-orange hover:underline">Ver caso →</a>
            </article>
          ))}
        </div>
      );
  }
}

/** Plantilla de producto: hero, bloques en el orden recibido y llamada final. */
export default function ProductPage({
  label,
  title,
  subtitle,
  blocks,
}: {
  label: string;
  title: ReactNode;
  subtitle: string;
  blocks: Block[];
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <SystemPageHero label={label} title={title} descriptor={subtitle} ctaLabel="Solicitar diagnóstico" ctaHref="/contacto" />
        {blocks.map((b, i) => (
          <section key={b.label} className="relative isolate overflow-clip py-20 md:py-24">
            <div className="relative z-10 mx-auto max-w-6xl px-6">
              <SectionHeader num={`${String(i + 1).padStart(2, "0")}.`} label={b.label} title={`${b.label}.`} />
              <BlockBody b={b} />
            </div>
          </section>
        ))}
        <GeneralCta />
      </main>
      <SiteFooter />
    </div>
  );
}

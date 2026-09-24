import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import AdvisorChatLauncher from "@/components/rckt/AdvisorChatLauncher";
import { GlobalSectionBlobs } from "@/components/rckt/SectionDecor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o se ha movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no se cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo falló de nuestro lado. Prueba a recargar o vuelve al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RCKT — Sistemas que convierten demanda en ventas" },
      {
        name: "description",
        content:
          "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
      },
      { name: "author", content: "RCKT" },
      { property: "og:title", content: "RCKT — Sistemas que convierten demanda en ventas" },
      {
        property: "og:description",
        content:
          "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "RCKT — Sistemas que convierten demanda en ventas" },
      {
        name: "twitter:description",
        content:
          "Diseñamos y operamos sistemas que convierten demanda en ventas: campañas, conversaciones, CRM e IA supervisada, medidos hasta el ingreso. Empieza con un Revenue Diagnostic.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://api.fontshare.com" },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Inter+Tight:wght@600;700&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },

    ],
    scripts: [
      {
        children: `(function(){var d=false;try{var t=localStorage.getItem('rckt-theme');if(t==='dark'){d=true;}else if(t!=='light'){d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}}catch(e){d=false;}var r=document.documentElement;r.classList.toggle('dark',!!d);r.setAttribute('data-theme',d?'dark':'light');})();`,
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-ES" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollManager() {
  const location = useRouterState({ select: (s) => s.location });
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const hash = location.hash?.replace(/^#/, "") ?? "";
    const href = location.pathname + (location.searchStr ?? "") + (hash ? `#${hash}` : "");
    const prevPath = prev.current?.split("#")[0] ?? null;
    const isFirst = prev.current === null;
    if (prev.current === href) return;
    prev.current = href;

    if (hash) {
      const id = hash;
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts++ < 12) {
          setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
      return;
    }
    if (!isFirst && prevPath !== location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollManager />
      <Outlet />
      <GlobalSectionBlobs />
      <AdvisorChatLauncher />
    </QueryClientProvider>
  );
}


# Plan — Landing RCKT en TanStack Start

Adapto los archivos del export (React + Vite + Supabase edge function) al stack actual del proyecto: **TanStack Start v1, Tailwind v4, Lovable Cloud, AI Gateway**. El contenido, copys y estilos visuales se preservan 1:1 — solo cambia la plomería (rutas, tokens, backend).

## 1. Backend (Lovable Cloud + AI Gateway)

- Activar **Lovable Cloud** y asegurar `LOVABLE_API_KEY` (`ai_gateway--create`).
- Sustituir la edge function `advisor-chat` por una **server route TanStack** en `src/routes/api/advisor-chat.ts`:
  - Método `POST`, devuelve `text/event-stream`.
  - Mantiene **idéntico** el `SYSTEM_PROMPT` en español del archivo `index.ts`.
  - Modelo `google/gemini-3-flash-preview`, `stream: true`.
  - Maneja 429 / 402 / 500 con mensajes en castellano.
  - Lee `LOVABLE_API_KEY` desde `process.env` dentro del handler.

## 2. Design system (Tailwind v4)

Reescribir `src/styles.css` con los tokens del export, convertidos de **HSL → oklch** (Tailwind v4 los requiere):

- Paleta arquitectónica: background warm-off-white, foreground casi-negro, accent azul pizarra `214 20% 22%`, border arena.
- `--radius: 0.25rem` (sharp, no rounded-lg por defecto).
- Familias: `--font-serif: "Instrument Serif"`, `--font-sans: Inter`.
- Cargar fuentes vía `<link>` en el `head()` de `__root.tsx` (no `index.html` — TanStack Start no lo usa).

## 3. Rutas

Solo una página, según el `Index.tsx` original — todas las secciones son anclas (`#sistema`, `#servicios`, `#verticales`, `#casos`, `#contacto`). Aquí **sí** es correcto usar hash anchors (one-pager de marketing real, no contenido independiente).

```text
src/routes/
  __root.tsx              ← añadir fuentes Google + meta SEO base
  index.tsx               ← compone todas las secciones
  api/
    advisor-chat.ts       ← server route streaming
```

`__root.tsx` head(): title `"RCKT — Sistema operativo de crecimiento para empresas serias"`, description y OG en español del `index.html` original.

`src/routes/index.tsx` head(): metadata específica de la home + composición:
`<Nav /> <Hero /> <Problem /> <Pillars /> <GrowthOS /> <Services /> <Verticals /> <CaseStudies /> <WhyRckt /> <NextSteps /> <Footer />`

**Nota:** el `Index.tsx` que enviaste **no** incluye `CaseStudies` ni `SystemVisual`. Voy a incluir `CaseStudies` (parece intencional, tiene id `#casos` que ya está en el Nav). **Omito `SystemVisual`** porque no estaba en el orden original ni en el Nav — si lo quieres, lo añado después.

## 4. Componentes

Copiar los 10 componentes a `src/components/rckt/`, **sin cambios de markup ni estilos**:

`Nav, Hero, Problem, Pillars, GrowthOS, Services, Verticals, CaseStudies, WhyRckt, NextSteps, Footer, AdvisorChat`

Único ajuste en `AdvisorChat.tsx`:

- Reemplazar `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/advisor-chat` por `"/api/advisor-chat"` (misma origen, sin auth header).
- Quitar el `Authorization: Bearer VITE_SUPABASE_PUBLISHABLE_KEY` (la server route es pública).
- Mantener el parser SSE línea por línea tal cual.
- Usar `sonner` `toast` (ya está en deps base de TanStack template) en lugar de `@/hooks/use-toast` — verificaré qué hay disponible y elijo lo que ya exista.

## 5. Imágenes

Dos assets faltan; los **genero con IA** salvo que indiques lo contrario:

- `src/assets/case-logistics.jpg` — dashboard operativo abstracto, paleta neutra arquitectónica (para `CaseStudies`).
- (No genero `system-visual.jpg` porque `SystemVisual` queda fuera).

## 6. Verificación

1. Build pasa.
2. `invoke-server-function POST /api/advisor-chat` con un mensaje de prueba → respuesta SSE.
3. Inspección visual de la home: nav, hero con chat funcionando, secciones, footer.

---

## Detalles técnicos

- **Tailwind v4 tokens**: los componentes usan clases ya existentes en el design system (`bg-card`, `text-muted-foreground`, `border-border`, `text-accent`, `bg-accent`, `text-accent-foreground`). Al definir los tokens correctamente en `styles.css`, los componentes funcionan sin modificar.
- **Font families**: `font-serif` y `font-sans` se mapean en `@theme inline` con `--font-serif` y `--font-sans` para que Tailwind v4 genere las utilidades.
- **SSR-safe**: el server route es 100% Web standard (`fetch`, `Response` con stream body) — compatible con el runtime Worker.
- **No Supabase client en el frontend**: la única integración backend es la server route propia, llamada same-origin.
- **Selección de texto custom**: el `selection:bg-accent` del wrapper en `Index.tsx` se mantiene.

## Lo que NO hago en este plan

- No añado autenticación, base de datos ni persistencia del chat (no se pidió).
- No publico el sitio (el usuario lo hará cuando quiera).
- No añado `SystemVisual` salvo confirmación.
- No genero el favicon ni og:image — son polish posterior.

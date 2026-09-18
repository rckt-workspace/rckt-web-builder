# Blog "RCKT Insights"

Primera versión completa del blog, con los artículos guardados en archivos locales y una capa de datos intermedia para poder pasarlos a la base de datos más adelante sin rehacer la interfaz.

## Qué tendrá el visitante

- **/blog** — portada editorial: título "RCKT Insights", subtítulo, buscador ("Buscar artículos"), filtros por categoría en forma de píldoras (empezando por "Todas"), artículo destacado con mayor jerarquía, y rejilla de tarjetas con portada, categoría, título, extracto, fecha, tiempo de lectura y "Leer artículo". Si no hay resultados: "No encontramos artículos con esos criterios."
- **/blog/[artículo]** — página de lectura: categoría, título, extracto, fecha, autor, tiempo de lectura, imagen principal, contenido, índice automático generado a partir de los subtítulos (con anclas y espacio para que el menú fijo no tape el título) y "Artículos relacionados" (máximo 3, misma categoría o etiquetas parecidas).
- 6 artículos de ejemplo escritos con tono profesional RCKT: IA aplicada al marketing, growth, performance, estrategia digital, automatización y cultura/creatividad.
- Todo con la tipografía, colores cálidos, tarjetas, botones, modo claro/oscuro y animaciones actuales. Nada de estética genérica.

## Panel interno

El proyecto no tiene `/rckt-equipo` (eso es otro sitio). Aquí el panel interno es **/ops**, protegido con la clave que ya existe. Añado una sección **Blog** junto a AI Control, sin tocar nada de lo existente:

- Tabla con Título, Categoría, Estado, Fecha y acciones: Editar, Duplicar, Publicar/Borrador, Archivar, Eliminar.
- "+ Nuevo artículo": formulario con título, slug (minúsculas, sin acentos, con guiones, único), extracto, categoría, etiquetas, autor, imagen de portada y su texto alternativo, contenido en Markdown con conmutador Editar / Vista previa, título y descripción SEO, estado y destacado. Guardar borrador o Publicar.
- "Exportar JSON" descarga `blog-posts-export.json` con todos los artículos y el mismo formato del archivo original, listo para importarlo a la base de datos más adelante.
- "Restaurar datos originales" (con confirmación) borra solo los cambios locales del blog.

Los cambios del panel se guardan en el navegador (no en el servidor), así que se ven de inmediato en /blog en ese mismo navegador. Es temporal y deliberado.

## Detalles técnicos

Archivos nuevos:
- `src/types/blog.ts` — tipos `BlogPost`, `BlogCategory`, `PostStatus` con los campos del modelo pedido (id, slug, title, excerpt, content, coverImage, coverImageAlt, author, category, tags, status, featured, publishedAt, updatedAt, readingTime, seo), alineados con la futura tabla `blog_posts`.
- `src/data/blog/posts.json`, `src/data/blog/categories.json`.
- `src/lib/blog.repository.ts` — interfaz `BlogRepository` + `JsonBlogRepository` (JSON + capa de overrides en localStorage encapsulada aquí) con `getPublishedPosts`, `getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `searchPosts`, `getRelatedPosts`, `savePost`, `deletePost`, `exportAll`, `resetLocal`. Ningún componente toca el JSON ni localStorage directamente.
- `src/lib/blog.utils.ts` — slugify, formato de fecha, tiempo de lectura, extracción de encabezados para el índice.
- `src/lib/markdown.tsx` — renderizador Markdown propio (H2/H3, párrafos, negritas, listas, enlaces, citas, imágenes) que construye elementos React; sin `dangerouslySetInnerHTML` y sin dependencias nuevas pesadas.
- `src/components/rckt/SiteNav.tsx`, `src/components/rckt/SiteFooter.tsx` — el menú y el pie actuales extraídos tal cual desde `index.tsx` para reutilizarlos en el blog; los enlaces internos pasan a `/#sistema` etc. cuando no se está en la portada. Mismo aspecto y mismo comportamiento.
- `src/components/blog/` — `BlogHero`, `BlogSearch`, `BlogCategories`, `BlogCard`, `BlogFeatured`, `BlogArticle`, `BlogToc`, `BlogRelated`.
- `src/routes/blog.index.tsx`, `src/routes/blog.$slug.tsx` (metadatos propios: título, descripción, canonical, og:*, og:type=article, twitter card y JSON-LD `BlogPosting`).
- `src/routes/ops/blog.tsx` + `src/components/blog/BlogAdmin.tsx` y `BlogEditor.tsx`.

Archivos modificados:
- `src/routes/index.tsx` — usa el menú y el pie extraídos; se añade "Blog" al menú (entre Método y FAQ) y al pie.
- `src/routes/ops/ai-control.tsx` — solo un enlace/pestaña hacia la nueva sección Blog.

No se toca: el agente de IA, las rutas y funciones de API, la base de datos, los estilos globales existentes ni el hero.

Riesgos de regresión y cómo los controlo: extraer el menú y el pie es el único cambio con riesgo real sobre la portada — se copian sin cambios de estilo y verifico la portada en escritorio y móvil, en claro y oscuro, junto con el resto de rutas y el build.

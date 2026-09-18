import { useMemo, useState } from "react";
import type { BlogCategory, BlogPost, PostStatus } from "@/types/blog";
import { estimateReadingTime, slugify } from "@/lib/blog.utils";
import { renderMarkdown } from "@/lib/markdown";

const EMPTY: Omit<BlogPost, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImage: "/blog/ia-criterio.jpg",
  coverImageAlt: "",
  author: { name: "Equipo RCKT", role: "Growth & Marketing" },
  category: "growth",
  tags: [],
  status: "draft",
  featured: false,
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readingTime: 1,
  seo: { title: "", description: "", canonical: "" },
};

const inputClass =
  "w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-orange";

export default function BlogEditor({
  post,
  categories,
  existingSlugs,
  onSave,
  onCancel,
}: {
  post: BlogPost | null;
  categories: BlogCategory[];
  existingSlugs: { id: string; slug: string }[];
  onSave: (post: BlogPost, status: PostStatus) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<BlogPost>(() =>
    post ? { ...post } : { ...EMPTY, id: crypto.randomUUID() },
  );
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [errors, setErrors] = useState<string[]>([]);

  const preview = useMemo(() => renderMarkdown(draft.content), [draft.content]);

  const update = (patch: Partial<BlogPost>) => setDraft((d) => ({ ...d, ...patch }));

  function validate(next: BlogPost): string[] {
    const list: string[] = [];
    if (next.title.trim().length < 5) list.push("El título debe tener al menos 5 caracteres.");
    if (!next.slug) list.push("El slug es obligatorio.");
    if (next.slug !== slugify(next.slug)) list.push("El slug debe ir en minúsculas, sin acentos y con guiones.");
    if (existingSlugs.some((s) => s.slug === next.slug && s.id !== next.id))
      list.push("Ya existe un artículo con ese slug.");
    if (next.excerpt.trim().length < 20) list.push("El extracto debe tener al menos 20 caracteres.");
    if (next.content.trim().length < 50) list.push("El contenido es demasiado corto.");
    if (!next.coverImage.trim()) list.push("Indica la ruta de la imagen de portada.");
    return list;
  }

  function submit(status: PostStatus) {
    const now = new Date().toISOString();
    const next: BlogPost = {
      ...draft,
      status,
      slug: draft.slug || slugify(draft.title),
      readingTime: estimateReadingTime(draft.content),
      updatedAt: now,
      publishedAt: status === "published" && !post ? now : draft.publishedAt,
      seo: {
        ...draft.seo,
        title: draft.seo.title || `${draft.title} | RCKT Insights`,
        description: draft.seo.description || draft.excerpt,
      },
    };
    const found = validate(next);
    setErrors(found);
    if (found.length) return;
    onSave(next, status);
  }

  return (
    <div className="card-kraft rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          {post ? "Editar artículo" : "Nuevo artículo"}
        </h2>
        <div className="flex gap-2">
          {(["edit", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`font-display cursor-pointer rounded-full border px-4 py-1.5 text-sm ${
                tab === t ? "border-transparent bg-orange text-white" : "border-ink/12 text-ink-soft"
              }`}
            >
              {t === "edit" ? "Editar" : "Vista previa"}
            </button>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <ul className="mt-5 space-y-1 rounded-2xl border border-orange/40 p-4 text-sm text-ink">
          {errors.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      )}

      {tab === "edit" ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm text-ink-soft md:col-span-2">
            Título
            <input
              className={inputClass}
              value={draft.title}
              onChange={(e) =>
                update({
                  title: e.target.value,
                  slug: post ? draft.slug : slugify(e.target.value),
                })
              }
            />
          </label>

          <label className="text-sm text-ink-soft">
            Slug
            <input
              className={inputClass}
              value={draft.slug}
              onChange={(e) => update({ slug: slugify(e.target.value) })}
            />
          </label>

          <label className="text-sm text-ink-soft">
            Categoría
            <select
              className={inputClass}
              value={draft.category}
              onChange={(e) => update({ category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-ink-soft md:col-span-2">
            Extracto
            <textarea
              rows={2}
              className={inputClass}
              value={draft.excerpt}
              onChange={(e) => update({ excerpt: e.target.value })}
            />
          </label>

          <label className="text-sm text-ink-soft">
            Etiquetas (separadas por comas)
            <input
              className={inputClass}
              value={draft.tags.join(", ")}
              onChange={(e) =>
                update({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-ink-soft">
              Autor
              <input
                className={inputClass}
                value={draft.author.name}
                onChange={(e) => update({ author: { ...draft.author, name: e.target.value } })}
              />
            </label>
            <label className="text-sm text-ink-soft">
              Rol
              <input
                className={inputClass}
                value={draft.author.role}
                onChange={(e) => update({ author: { ...draft.author, role: e.target.value } })}
              />
            </label>
          </div>

          <label className="text-sm text-ink-soft">
            Imagen de portada (ruta)
            <input
              className={inputClass}
              value={draft.coverImage}
              onChange={(e) => update({ coverImage: e.target.value })}
              placeholder="/blog/mi-imagen.jpg"
            />
          </label>

          <label className="text-sm text-ink-soft">
            Texto alternativo de la imagen
            <input
              className={inputClass}
              value={draft.coverImageAlt}
              onChange={(e) => update({ coverImageAlt: e.target.value })}
            />
          </label>

          <label className="text-sm text-ink-soft md:col-span-2">
            Contenido (Markdown)
            <textarea
              rows={16}
              className={`${inputClass} font-mono text-[13px] leading-relaxed`}
              value={draft.content}
              onChange={(e) => update({ content: e.target.value })}
              placeholder={"## Subtítulo\n\nTexto del artículo..."}
            />
          </label>

          <label className="text-sm text-ink-soft">
            SEO title
            <input
              className={inputClass}
              value={draft.seo.title}
              onChange={(e) => update({ seo: { ...draft.seo, title: e.target.value } })}
            />
          </label>

          <label className="text-sm text-ink-soft">
            SEO description
            <input
              className={inputClass}
              value={draft.seo.description}
              onChange={(e) => update({ seo: { ...draft.seo, description: e.target.value } })}
            />
          </label>

          <label className="text-sm text-ink-soft">
            Estado
            <select
              className={inputClass}
              value={draft.status}
              onChange={(e) => update({ status: e.target.value as PostStatus })}
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="archived">Archivado</option>
            </select>
          </label>

          <label className="flex items-center gap-3 self-end text-sm text-ink">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => update({ featured: e.target.checked })}
            />
            Artículo destacado
          </label>
        </div>
      ) : (
        <div className="mt-6 max-w-3xl">
          <h3 className="font-display text-2xl font-semibold text-ink">{draft.title || "Sin título"}</h3>
          <p className="mt-3 text-ink-soft">{draft.excerpt}</p>
          <div className="mt-6">{preview}</div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => submit("draft")}
          className="font-display cursor-pointer rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink"
        >
          Guardar borrador
        </button>
        <button
          type="button"
          onClick={() => submit("published")}
          className="btn-signal font-display cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Publicar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-display cursor-pointer px-3 py-2.5 text-sm text-ink-soft"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

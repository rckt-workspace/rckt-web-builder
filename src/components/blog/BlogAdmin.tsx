import { useEffect, useState } from "react";
import type { BlogPost, PostStatus } from "@/types/blog";
import { BLOG_CHANGED_EVENT, blogRepository, categoryName } from "@/lib/blog.repository";
import { formatDate } from "@/lib/blog.utils";
import BlogEditor from "@/components/blog/BlogEditor";

const STATUS_LABEL: Record<PostStatus, string> = {
  draft: "Borrador",
  published: "Publicado",
  archived: "Archivado",
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState("");

  const refresh = () => setPosts(blogRepository.getAllPosts());

  useEffect(() => {
    refresh();
    window.addEventListener(BLOG_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(BLOG_CHANGED_EVENT, refresh);
  }, []);

  function handleSave(post: BlogPost, status: PostStatus) {
    blogRepository.savePost(post);
    refresh();
    setEditing(null);
    setCreating(false);
    setNotice(status === "published" ? "Artículo publicado." : "Borrador guardado.");
  }

  function handleDelete(post: BlogPost) {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`)) return;
    blogRepository.deletePost(post.id);
    refresh();
    setNotice("Artículo eliminado.");
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(blogRepository.exportAll(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "posts.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    if (!window.confirm("¿Restaurar los artículos originales y descartar los cambios locales?")) return;
    blogRepository.resetLocal();
    refresh();
    setNotice("Datos originales restaurados.");
  }

  if (creating || editing) {
    return (
      <BlogEditor
        post={editing}
        categories={blogRepository.getCategories()}
        existingSlugs={posts.map((p) => ({ id: p.id, slug: p.slug }))}
        onSave={handleSave}
        onCancel={() => {
          setEditing(null);
          setCreating(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">Artículos</h2>
          <p className="text-sm text-ink-soft">
            {posts.length} artículos ·{" "}
            {blogRepository.hasLocalChanges()
              ? "hay cambios locales sin exportar"
              : "mostrando los datos originales"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn-signal font-display cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Nuevo artículo
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="font-display cursor-pointer rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Exportar JSON
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="font-display cursor-pointer rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink-soft"
          >
            Restaurar datos originales
          </button>
        </div>
      </div>

      {notice && <p className="text-sm text-orange">{notice}</p>}

      <div className="card-kraft overflow-hidden rounded-3xl">
        <ul className="divide-y" style={{ borderColor: "var(--line)" }}>
          {posts.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 p-5">
              <img
                src={p.coverImage}
                alt=""
                className="h-14 w-20 rounded-xl object-cover"
                loading="lazy"
              />
              <div className="min-w-[200px] flex-1">
                <p className="font-display font-semibold text-ink">{p.title}</p>
                <p className="text-xs text-ink-soft">
                  /{p.slug} · {categoryName(p.category)} · {formatDate(p.publishedAt)}
                  {p.featured ? " · Destacado" : ""}
                </p>
              </div>
              <span className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink-soft">
                {STATUS_LABEL[p.status]}
              </span>
              <div className="flex gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => setEditing(p)}
                  className="font-display cursor-pointer font-semibold text-orange"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  className="font-display cursor-pointer text-ink-soft"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

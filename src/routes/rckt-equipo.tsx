import { cloneElement, isValidElement, useEffect, useId, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, FileText, LogOut, Mail, Pencil, Trash2, Upload, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { isoToMadridDateTimeLocal, madridDateTimeLocalToIso, formatBlogDateTimeMadrid, isScheduledPublish } from "@/lib/blog-date";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/rckt-equipo")({
  head: () => ({
    meta: [
      { title: "People & Culture — RCKT Equipo" },
      { name: "description", content: "Vista local de gestión de talento, postulaciones y contenido de RCKT." },
      { property: "og:title", content: "People & Culture — RCKT Equipo" },
      { property: "og:description", content: "Vista local de gestión de talento, postulaciones y contenido de RCKT." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RcktEquipoPage,
});

type Vacancy = {
  id: number;
  title: string;
  area: string;
  location: string;
  mode: "Remoto";
  description: string;
  requirements: string;
  active: boolean;
  date: string;
};

type ApplicationStatus = "Nueva" | "En revisión" | "Entrevista" | "Descartada";
type Application = {
  id: number;
  name: string;
  type: "Candidato" | "Freelance";
  email: string;
  phone: string;
  vacancy: string;
  date: string;
  status: ApplicationStatus;
  message: string;
  portfolio?: string;
};

type ArticleStatus = "Borrador" | "Publicado" | "Archivado";
type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: number;
  status: ArticleStatus;
  coverUrl?: string;
  tags?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  published_at_iso?: string;
};


const CATEGORIES = ["Del lead a la venta", "Medios con medición", "IA que se paga sola", "WhatsApp y CRM", "Web y conversión"];
const STATUSES: ApplicationStatus[] = ["Nueva", "En revisión", "Entrevista", "Descartada"];
const EMPTY_VACANCY = { title: "", area: "", location: "", description: "", requirements: "" };
const EMPTY_ARTICLE: Article = {
  id: 0,
  title: "",
  slug: "",
  category: CATEGORIES[0],
  excerpt: "",
  content: "",
  author: "RCKT",
  date: "",
  readingTime: 5,
  status: "Borrador",
  tags: [],
  featured: false,
  seoTitle: "",
  seoDescription: "",
  publishedAt: "",
};

const formatDate = (date: string) => new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const getPreviewUrl = (url: string | null | undefined) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("blob:")) return url;
  return `https://zqevrlqfxviyfdqxbgnh.supabase.co/storage/v1/object/public/blog-media/${url}`;
};

function StatusBadge({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={muted ? "team-badge team-badge--muted" : "team-badge"}>{children}</span>;
}

function RcktEquipoPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [vacancyFilter, setVacancyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [vacancyFormOpen, setVacancyFormOpen] = useState(false);
  const [editingVacancyId, setEditingVacancyId] = useState<number | string | null>(null);
  const [vacancyForm, setVacancyForm] = useState(EMPTY_VACANCY);
  const [articleFormOpen, setArticleFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState(EMPTY_ARTICLE);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverWarning, setCoverWarning] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const verifyRes = await fetch("/api/admin/debug-verify", {
          method: "GET",
          credentials: "include",
        });

        if (!verifyRes.ok) {
          window.location.href = "/ops/login?next=%2Frckt-equipo";
          return;
        }

        setAuthChecked(true);
        setLoading(true);
        setDataError(null);

        const [vacsRes, appsRes, postsRes] = await Promise.all([
          fetch("/api/admin/vacancies"),
          fetch("/api/admin/applications"),
          fetch("/api/admin/blog/posts"),
        ]);

        let hasError = false;

        if (vacsRes.ok) {
          const vacsData = (await vacsRes.json()) as { vacancies: any[] };
          const mapped = vacsData.vacancies.map((v: any) => ({
            id: v.id,
            title: v.titulo,
            area: v.area,
            location: v.ubicacion || "TBD",
            mode: v.modalidad || "Remoto",
            description: v.descripcion || "",
            requirements: v.requisitos || "",
            active: v.estado === "activa",
            date: new Date(v.created_at).toISOString().slice(0, 10),
          }));
          setVacancies(mapped);
        } else {
          console.error("Failed to fetch vacancies:", vacsRes.status);
          hasError = true;
        }

        if (appsRes.ok) {
          const appsData = (await appsRes.json()) as { applications: any[] };
          const statusMap: Record<string, ApplicationStatus> = {
            nueva: "Nueva",
            revision: "En revisión",
            entrevista: "Entrevista",
            descartado: "Descartada",
          };
          const mapped: (Application & { cv_path?: string })[] = appsData.applications.map((a: any) => ({
            id: a.id,
            name: a.nombre,
            type: (a.tipo === "candidato" ? "Candidato" : "Freelance") as "Candidato" | "Freelance",
            email: a.email,
            phone: a.telefono || "",
            vacancy: a.vacante_id || "Perfil abierto",
            date: new Date(a.created_at).toISOString().slice(0, 10),
            status: (statusMap[a.estado] || "Nueva") as ApplicationStatus,
            message: a.mensaje || "",
            portfolio: a.portafolio_url,
            cv_path: a.cv_path,
          }));
          setApplications(mapped as Application[]);
        } else {
          console.error("Failed to fetch applications:", appsRes.status);
          hasError = true;
        }

        if (postsRes.ok) {
          const postsData = (await postsRes.json()) as { posts: any[] };
          const mapped: Article[] = postsData.posts.map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.blog_categories?.name || "Sin categoría",
            excerpt: p.excerpt || "",
            content: p.content || "",
            author: p.author_name || "RCKT",
            date: new Date(p.created_at).toISOString().slice(0, 10),
            readingTime: 5,
            status: ({
              draft: "Borrador",
              published: "Publicado",
              archived: "Archivado",
            } as Record<string, ArticleStatus>)[p.status] || "Borrador",
            coverUrl: p.cover_image_path || undefined,
            tags: p.tags || [],
            featured: p.featured || false,
            seoTitle: p.seo_title || "",
            seoDescription: p.seo_description || "",
            publishedAt: isoToMadridDateTimeLocal(p.published_at),
            published_at_iso: p.published_at || undefined,
          }));
          setArticles(mapped);
        } else {
          console.error("Failed to fetch blog posts:", postsRes.status);
          hasError = true;
        }

        if (hasError) {
          setDataError("No se pudieron cargar todos los datos. Por favor, intenta nuevamente.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading admin data:", err);
        setDataError("Error al cargar los datos administrativos.");
        setAuthError(true);
        setAuthChecked(true);
      }
    };
    void loadData();
  }, []);

  useEffect(() => () => { if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl); }, [coverUrl]);

  const filteredApplications = useMemo(() => applications.filter((item) =>
    (vacancyFilter === "all" || item.vacancy === vacancyFilter) &&
    (typeFilter === "all" || item.type === typeFilter)
  ), [applications, vacancyFilter, typeFilter]);

  const openNewVacancy = () => { setEditingVacancyId(null); setVacancyForm(EMPTY_VACANCY); setVacancyFormOpen(true); };
  const editVacancy = (item: Vacancy) => { setEditingVacancyId(item.id); setVacancyForm({ title: item.title, area: item.area, location: item.location, description: item.description, requirements: item.requirements }); setVacancyFormOpen(true); };
  const saveVacancy = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = editingVacancyId !== null
        ? await fetch("/api/admin/vacancies", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              id: editingVacancyId,
              titulo: vacancyForm.title,
              area: vacancyForm.area,
              ubicacion: vacancyForm.location,
              descripcion: vacancyForm.description,
              requisitos: vacancyForm.requirements,
            }),
          })
        : await fetch("/api/admin/vacancies", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              titulo: vacancyForm.title,
              area: vacancyForm.area,
              ubicacion: vacancyForm.location,
              descripcion: vacancyForm.description,
              requisitos: vacancyForm.requirements,
              estado: "borrador",
            }),
          });

      if (!res.ok) {
        console.error("Error saving vacancy:", res.status);
        alert("Error al guardar la vacante");
        return;
      }

      setVacancyFormOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error saving vacancy:", err);
      alert("Error al guardar la vacante");
    }
  };
  const toggleVacancy = async (id: number | string) => {
    const vacancy = vacancies.find((v) => v.id === id);
    if (!vacancy) return;
    try {
      const res = await fetch("/api/admin/vacancies", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id,
          estado: vacancy.active ? "borrador" : "activa",
        }),
      });

      if (!res.ok) {
        console.error("Error toggling vacancy:", res.status);
        alert("Error al cambiar estado de la vacante");
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error("Error toggling vacancy:", err);
      alert("Error al cambiar estado de la vacante");
    }
  };
  const deleteVacancy = async (id: number | string) => {
    if (!window.confirm("¿Eliminar esta vacante?")) return;
    try {
      const res = await fetch("/api/admin/vacancies", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Error deleting vacancy:", res.status);
        alert("Error al eliminar la vacante");
        return;
      }

      setVacancies((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting vacancy:", err);
      alert("Error al eliminar la vacante");
    }
  };
  const deleteApplication = async (id: number | string) => {
    if (!window.confirm("¿Eliminar esta postulación?")) return;
    try {
      const res = await fetch("/api/admin/applications", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Error deleting application:", res.status);
        alert("Error al eliminar la postulación");
        return;
      }

      setApplications((current) => current.filter((item) => item.id !== id));
      setSelectedApplication(null);
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Error al eliminar la postulación");
    }
  };
  const changeApplicationStatus = async (id: number | string, status: ApplicationStatus) => {
    const statusMap: Record<ApplicationStatus, string> = {
      "Nueva": "nueva",
      "En revisión": "revision",
      "Entrevista": "entrevista",
      "Descartada": "descartado",
    };
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, estado: statusMap[status] }),
      });

      if (!res.ok) {
        console.error("Error changing application status:", res.status);
        alert("Error al cambiar el estado");
        return;
      }

      setApplications((current) => current.map((item) => item.id === id ? { ...item, status } : item));
      setSelectedApplication((current) => current?.id === id ? { ...current, status } : current);
    } catch (err) {
      console.error("Error changing application status:", err);
      alert("Error al cambiar el estado");
    }
  };
  const openNewArticle = () => { setEditingArticleId(null); setArticleForm(EMPTY_ARTICLE); setCoverUrl(null); setCoverWarning(""); setArticleFormOpen(true); };
  const editArticle = (item: Article) => { setEditingArticleId(item.id); setArticleForm({ ...item, tags: item.tags || [], featured: item.featured || false, seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "", publishedAt: item.publishedAt || "" }); setCoverUrl(item.coverUrl ?? null); setCoverWarning(""); setArticleFormOpen(true); };
  const saveArticle = async (status: ArticleStatus) => {
    try {
      const statusMap: Record<ArticleStatus, string> = {
        "Borrador": "draft",
        "Publicado": "published",
        "Archivado": "archived",
      };

      let publishedAt: string | null = null;

      if (status === "Publicado") {
        if (articleForm.publishedAt) {
          const converted = madridDateTimeLocalToIso(articleForm.publishedAt);
          if (!converted) {
            alert("Fecha y hora de publicación inválidas.");
            return;
          }
          publishedAt = converted;
        } else {
          publishedAt = new Date().toISOString();
        }
      }

      const payload = {
        title: articleForm.title,
        slug: articleForm.slug,
        excerpt: articleForm.excerpt,
        content: articleForm.content,
        category: articleForm.category,
        status: statusMap[status],
        author_name: articleForm.author,
        tags: articleForm.tags || [],
        featured: articleForm.featured || false,
        published_at: publishedAt,
        seo_title: articleForm.seoTitle || null,
        seo_description: articleForm.seoDescription || null,
        cover_image_path: coverUrl || null,
      };

      const res = editingArticleId !== null
        ? await fetch("/api/admin/blog/posts", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ id: editingArticleId, ...payload }),
          })
        : await fetch("/api/admin/blog/posts", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as any;
        console.error("Error saving article:", res.status, errData);
        alert(`Error: ${errData.error || "No se pudo guardar el artículo"}`);
        return;
      }

      setArticleFormOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error saving article:", err);
      alert("Error al guardar el artículo");
    }
  };
  const toggleArticle = async (id: number | string) => {
    const article = articles.find((a) => a.id === id);
    if (!article) return;
    const newStatus = article.status === "Publicado" ? "draft" : "published";
    try {
      const body: any = {
        id,
        status: newStatus,
      };

      if (newStatus === "published") {
        body.published_at = new Date().toISOString();
      } else if (newStatus === "draft") {
        body.published_at = null;
      }

      const res = await fetch("/api/admin/blog/posts", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.error("Error toggling article:", res.status);
        alert("Error al cambiar estado del artículo");
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error("Error toggling article:", err);
      alert("Error al cambiar estado del artículo");
    }
  };
  const deleteArticle = async (id: number | string) => {
    if (!window.confirm("¿Eliminar este artículo?")) return;
    try {
      const res = await fetch("/api/admin/blog/posts", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Error deleting article:", res.status);
        alert("Error al eliminar el artículo");
        return;
      }

      setArticles((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Error al eliminar el artículo");
    }
  };
  const loadCover = async (file?: File) => {
    if (!file) return;
    setCoverWarning("");
    if (!(["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setCoverWarning("Usa un archivo JPG, PNG o WebP."); return; }
    if (file.size > 5 * 1024 * 1024) { setCoverWarning("La imagen supera el máximo de 5 MB."); return; }

    const nextUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = async () => {
      if (image.height > image.width) { setCoverWarning("Usa una imagen horizontal (16:9)"); URL.revokeObjectURL(nextUrl); return; }

      try {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/admin/blog/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = (await uploadRes.json()) as { error?: string };
          setCoverWarning(err.error || "Error al subir imagen");
          URL.revokeObjectURL(nextUrl);
          return;
        }

        const data = (await uploadRes.json()) as { imagePath: string };
        if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl);
        setCoverUrl(data.imagePath);
        setCoverWarning("");
      } catch (err) {
        setCoverWarning("Error al subir imagen");
        URL.revokeObjectURL(nextUrl);
      }
    };
    image.onerror = () => { URL.revokeObjectURL(nextUrl); setCoverWarning("No se pudo leer la imagen."); };
    image.src = nextUrl;
  };

  if (!authChecked) {
    return (
      <div className="team-admin min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Verificando sesión...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="team-admin min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="team-card max-w-md text-center">
          <h1 className="font-display text-xl font-semibold">Error de conexión</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            No se pudo verificar la sesión administrativa.
          </p>
          <Button type="button" className="mt-5 rounded-full" onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/ops/login";
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Error al cerrar sesión");
    }
  };

  return (
    <TooltipProvider>
      <div className="team-admin min-h-screen bg-background text-foreground">
        <header className="team-header">
          <div className="team-shell flex items-center justify-between gap-4 py-5">
            <div className="font-display text-xl font-bold tracking-normal">RCKT</div>
            <Button type="button" variant="ghost" className="rounded-full" onClick={handleLogout}>
              <LogOut aria-hidden="true" /> Cerrar sesión
            </Button>
          </div>
        </header>
        <main className="team-shell py-10 md:py-14">
          <p className="label-orange">RCKT / PEOPLE &amp; CULTURE</p>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">People &amp; Culture</h1>
          <p className="mt-3 text-base text-muted-foreground">Gestión de talento, postulaciones y contenido</p>

          {loading && (
            <div className="mt-10 flex items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">Cargando datos...</p>
            </div>
          )}

          {dataError && (
            <div className="mt-10 team-card border-orange bg-orange/5">
              <p className="text-sm font-semibold text-orange">Error al cargar datos</p>
              <p className="mt-2 text-sm text-muted-foreground">{dataError}</p>
              <Button type="button" className="mt-4" onClick={() => window.location.reload()}>
                Intentar de nuevo
              </Button>
            </div>
          )}

          {!loading && !dataError && (
          <Tabs defaultValue="vacancies" className="mt-10">
            <TabsList className="team-tabs grid h-auto w-full grid-cols-3 rounded-full p-1 sm:inline-flex sm:w-auto">
              <TabsTrigger value="vacancies" className="rounded-full px-2 py-2.5 text-xs sm:px-5 sm:text-sm"><BriefcaseBusiness className="hidden sm:block" /> Vacantes</TabsTrigger>
              <TabsTrigger value="applications" className="rounded-full px-2 py-2.5 text-xs sm:px-5 sm:text-sm"><Users className="hidden sm:block" /> Postulaciones</TabsTrigger>
              <TabsTrigger value="blog" className="rounded-full px-2 py-2.5 text-xs sm:px-5 sm:text-sm"><FileText className="hidden sm:block" /> Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="vacancies" className="mt-8">
              <div className="team-section-heading"><div><h2>Vacantes</h2><p>Gestiona las posiciones abiertas del equipo.</p></div><Button type="button" onClick={openNewVacancy} className="rounded-full">+ Nueva vacante</Button></div>
              {vacancyFormOpen ? <VacancyForm form={vacancyForm} setForm={setVacancyForm} editing={editingVacancyId !== null} onSubmit={saveVacancy} onCancel={() => setVacancyFormOpen(false)} /> : null}
              <div className="mt-6 grid gap-4">
                {vacancies.map((item) => <article key={item.id} className="team-card">
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-display text-xl font-semibold">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.area} · {item.mode} · {item.location}</p></div><StatusBadge muted={!item.active}>{item.active ? "Activa" : "Cerrada"}</StatusBadge></div>
                  <p className="mt-5 text-sm text-muted-foreground">Publicada el {formatDate(item.date)}</p>
                  <div className="mt-5 flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={() => editVacancy(item)}><Pencil /> Editar</Button><Button type="button" variant="outline" onClick={() => toggleVacancy(item.id)}>{item.active ? "Cerrar" : "Reabrir"}</Button><Button type="button" variant="ghost" onClick={() => deleteVacancy(item.id)}><Trash2 /> Eliminar</Button></div>
                </article>)}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-8">
              <div className="team-section-heading"><div><h2>Postulaciones</h2><p>Revisa candidatos y colaboraciones freelance.</p></div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Select value={vacancyFilter} onValueChange={setVacancyFilter}><SelectTrigger aria-label="Filtrar por vacante"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todas las vacantes</SelectItem>{vacancies.map((item) => <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>)}<SelectItem value="Diseño y motion">Diseño y motion</SelectItem></SelectContent></Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger aria-label="Filtrar por tipo"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos los tipos</SelectItem><SelectItem value="Candidato">Candidatos</SelectItem><SelectItem value="Freelance">Freelancers</SelectItem></SelectContent></Select>
              </div>
              <div className="mt-6 grid gap-4">
                {filteredApplications.map((item) => <article key={item.id} className="team-card">
                  <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-display text-xl font-semibold">{item.name}</h3><p className="mt-1 text-sm text-muted-foreground">{item.email} · {item.phone}</p></div><StatusBadge muted={item.type === "Freelance"}>{item.type}</StatusBadge></div>
                  <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2"><p><span className="text-muted-foreground">Vacante:</span> {item.vacancy}</p><p><span className="text-muted-foreground">Fecha:</span> {formatDate(item.date)}</p></div>
                  <div className="mt-5 flex flex-wrap gap-2"><CvButton cvPath={(item as any).cv_path} /><Button type="button" variant="outline" onClick={() => setSelectedApplication(item)}>Ver detalle</Button><Button type="button" variant="ghost" onClick={() => deleteApplication(item.id)}><Trash2 /> Eliminar</Button></div>
                </article>)}
              </div>
            </TabsContent>

            <TabsContent value="blog" className="mt-8">
              <div className="team-section-heading"><div><h2>Blog</h2><p>Prepara y revisa el contenido editorial.</p></div><Button type="button" onClick={openNewArticle} className="rounded-full">+ Nuevo artículo</Button></div>
              {articleFormOpen ? <ArticleEditor form={articleForm} setForm={setArticleForm} coverUrl={coverUrl} setCoverUrl={setCoverUrl} warning={coverWarning} dragging={dragging} setDragging={setDragging} onFile={loadCover} onRemoveCover={() => { if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl); setCoverUrl(null); setCoverWarning(""); }} onSave={saveArticle} onCancel={() => setArticleFormOpen(false)} editing={editingArticleId !== null} /> : null}
              <div className="mt-6 grid gap-4">
                {articles.map((item) => {
                  const isScheduled = item.status === "Publicado" && isScheduledPublish(item.published_at_iso);
                  return <article key={item.id} className="team-card team-article-row">
                    <div className="team-cover">{item.coverUrl ? <img src={getPreviewUrl(item.coverUrl)!} alt="" /> : <span>RCKT</span>}</div>
                    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-display text-lg font-semibold">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.category} · {formatDate(item.date)}</p>{isScheduled && <p className="mt-1 text-xs font-semibold text-orange">Programado · {formatBlogDateTimeMadrid(item.published_at_iso)}</p>}</div><StatusBadge muted={item.status === "Borrador"}>{isScheduled ? "Programado" : item.status}</StatusBadge></div><div className="mt-4 flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={() => editArticle(item)}><Pencil /> Editar</Button><Button type="button" variant="outline" onClick={() => toggleArticle(item.id)}>{item.status === "Publicado" ? "Despublicar" : "Publicar"}</Button><Button type="button" variant="ghost" onClick={() => deleteArticle(item.id)}><Trash2 /> Eliminar</Button></div></div>
                  </article>;
                })}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </main>
        <ApplicationDetail item={selectedApplication} onOpenChange={(open) => { if (!open) setSelectedApplication(null); }} onStatus={changeApplicationStatus} onDelete={deleteApplication} />
      </div>
    </TooltipProvider>
  );
}

function VacancyForm({ form, setForm, editing, onSubmit, onCancel }: { form: typeof EMPTY_VACANCY; setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_VACANCY>>; editing: boolean; onSubmit: (event: React.FormEvent) => void; onCancel: () => void }) {
  return <form onSubmit={onSubmit} className="team-card mt-6"><h3 className="font-display text-xl font-semibold">{editing ? "Editar vacante" : "Nueva vacante"}</h3><div className="mt-6 grid gap-5 sm:grid-cols-2"><Field label="Título"><Input required value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} /></Field><Field label="Área"><Input required value={form.area} onChange={(e) => setForm((v) => ({ ...v, area: e.target.value }))} /></Field><Field label="Ubicación"><Input required placeholder="Ej: Madrid, España" value={form.location} onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))} /></Field><Field label="Modalidad"><Input value="Remoto" readOnly /></Field><Field label="Descripción" wide><Textarea required rows={5} value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} /></Field><Field label="Requisitos" wide><Textarea required rows={5} value={form.requirements} onChange={(e) => setForm((v) => ({ ...v, requirements: e.target.value }))} /></Field></div><div className="mt-6 flex flex-wrap gap-3"><Button type="submit">{editing ? "Actualizar vacante" : "Crear vacante"}</Button><Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button></div></form>;
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  const id = useId();
  const control = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ id?: string }>, { id })
    : children;
  return <div className={wide ? "sm:col-span-2" : ""}><Label htmlFor={id} className="mb-2 block">{label}</Label>{control}</div>;
}

function CvButton({ cvPath }: { cvPath?: string }) {
  const [loading, setLoading] = useState(false);

  if (!cvPath) {
    return <Tooltip><TooltipTrigger asChild><span className="inline-flex"><Button type="button" variant="outline" disabled>Sin CV</Button></span></TooltipTrigger><TooltipContent>No se adjuntó CV</TooltipContent></Tooltip>;
  }

  const handleOpenCV = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/cv-url", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cvPath }),
      });

      if (response.ok) {
        const data = (await response.json()) as { signedUrl: string };
        window.open(data.signedUrl, "_blank");
      } else {
        alert("Error al descargar CV");
      }
    } catch (err) {
      console.error("CV error:", err);
      alert("Error al descargar CV");
    } finally {
      setLoading(false);
    }
  };

  return <Button onClick={handleOpenCV} variant="outline" disabled={loading}>Ver CV</Button>;
}

function ApplicationDetail({ item, onOpenChange, onStatus, onDelete }: { item: Application & { cv_path?: string } | null; onOpenChange: (open: boolean) => void; onStatus: (id: number, status: ApplicationStatus) => void; onDelete: (id: number) => void }) {
  return <Dialog open={item !== null} onOpenChange={onOpenChange}>{item ? <DialogContent className="team-dialog max-h-[88vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><StatusBadge muted={item.type === "Freelance"}>{item.type}</StatusBadge><DialogTitle className="pt-2 text-2xl">{item.name}</DialogTitle><DialogDescription>Postulación recibida · {formatDate(item.date)}</DialogDescription></DialogHeader><dl className="team-detail-grid"><div><dt>Correo</dt><dd>{item.email}</dd></div><div><dt>Teléfono</dt><dd>{item.phone}</dd></div><div><dt>Vacante</dt><dd>{item.vacancy}</dd></div><div><dt>Estado</dt><dd>{item.status}</dd></div><div className="sm:col-span-2"><dt>Mensaje</dt><dd>{item.message}</dd></div></dl><div><Label className="mb-2 block">Cambiar estado</Label><Select value={item.status} onValueChange={(value) => onStatus(item.id, value as ApplicationStatus)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{STATUSES.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select></div><div className="flex flex-wrap gap-2"><CvButton cvPath={item.cv_path} />{item.portfolio ? <Button asChild variant="outline"><a href={item.portfolio} target="_blank" rel="noreferrer">Ver portafolio</a></Button> : null}<Button asChild><a href={`mailto:${item.email}`}><Mail /> Contactar</a></Button><Button type="button" variant="ghost" onClick={() => onDelete(item.id)}><Trash2 /> Eliminar</Button></div></DialogContent> : null}</Dialog>;
}

function ArticleEditor({ form, setForm, coverUrl, setCoverUrl, warning, dragging, setDragging, onFile, onRemoveCover, onSave, onCancel, editing }: { form: typeof EMPTY_ARTICLE; setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_ARTICLE>>; coverUrl: string | null; setCoverUrl: (url: string | null) => void; warning: string; dragging: boolean; setDragging: (value: boolean) => void; onFile: (file?: File) => void; onRemoveCover: () => void; onSave: (status: ArticleStatus) => void; onCancel: () => void; editing: boolean }) {
  const [coverUrlManual, setCoverUrlManual] = useState("");

  const saveCoverUrl = () => {
    if (coverUrlManual && (coverUrlManual.startsWith("http://") || coverUrlManual.startsWith("https://"))) {
      if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl);
      setCoverUrl(coverUrlManual);
      setCoverUrlManual("");
    }
  };

  return <div className="team-card mt-6"><h3 className="font-display text-xl font-semibold">{editing ? "Editar artículo" : "Nuevo artículo"}</h3><div className="mt-6 grid gap-5"><div><Label className="mb-2 block">Imagen de portada</Label><label className={`team-dropzone ${dragging ? "team-dropzone--active" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files[0]); }}>{coverUrl ? <img src={getPreviewUrl(coverUrl)!} alt="Vista previa de la portada" /> : <><Upload aria-hidden="true" /><strong>Arrastra una imagen o selecciónala</strong><span>JPG, PNG o WebP</span></>}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} /></label><p className="mt-2 text-sm text-muted-foreground">Formato horizontal 16:9 · máx. 5 MB</p>{warning ? <p className="mt-2 text-sm font-semibold text-orange">{warning}</p> : null}{coverUrl ? <Button type="button" variant="ghost" className="mt-2" onClick={onRemoveCover}><X /> Quitar imagen</Button> : null}<div className="mt-4"><Label className="mb-2 block">O URL de portada (externa)</Label><div className="flex gap-2"><Input type="url" placeholder="https://example.com/imagen.jpg" value={coverUrlManual} onChange={(e) => setCoverUrlManual(e.target.value)} onBlur={saveCoverUrl} onKeyDown={(e) => { if (e.key === "Enter") saveCoverUrl(); }} className="flex-1" /><Button type="button" variant="outline" onClick={saveCoverUrl} disabled={!coverUrlManual || !(coverUrlManual.startsWith("http://") || coverUrlManual.startsWith("https://"))}>Usar</Button></div></div></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Título"><Input required value={form.title} onChange={(e) => { const title = e.target.value; setForm((v) => ({ ...v, title, slug: v.slug === slugify(v.title) || !v.slug ? slugify(title) : v.slug })); }} /></Field><Field label="Slug"><Input required value={form.slug} onChange={(e) => setForm((v) => ({ ...v, slug: slugify(e.target.value) }))} /></Field><Field label="Categoría"><Select value={form.category} onValueChange={(category) => setForm((v) => ({ ...v, category }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select></Field><Field label="Autor"><Input required value={form.author} onChange={(e) => setForm((v) => ({ ...v, author: e.target.value }))} /></Field><Field label="Fecha y hora de publicación"><div><Input type="datetime-local" value={form.publishedAt} onChange={(e) => setForm((v) => ({ ...v, publishedAt: e.target.value }))} placeholder="2026-10-07T17:30" /></div><p className="mt-1 text-xs text-muted-foreground">Horario de Madrid (Europe/Madrid). Déjalo vacío para publicar inmediatamente.</p></Field><Field label="Estado"><Select value={form.status} onValueChange={(status) => setForm((v) => ({ ...v, status: status as ArticleStatus }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Borrador">Borrador</SelectItem><SelectItem value="Publicado">Publicado</SelectItem></SelectContent></Select></Field><div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((v) => ({ ...v, featured: e.target.checked }))} className="h-4 w-4" /><Label htmlFor="featured" className="mb-0 cursor-pointer">Artículo destacado</Label></div><Field label="Tags / Keywords"><Input placeholder="google ads, ventas, crm" value={(form.tags || []).join(", ")} onChange={(e) => setForm((v) => ({ ...v, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))} /></Field><Field label="Extracto" wide><Textarea maxLength={160} rows={3} value={form.excerpt} onChange={(e) => setForm((v) => ({ ...v, excerpt: e.target.value }))} /><p className="mt-1 text-right text-xs text-muted-foreground">{form.excerpt.length}/160</p></Field><Field label="SEO Title (opcional)" wide><Input placeholder="Dejalo vacío para usar el título" value={form.seoTitle} onChange={(e) => setForm((v) => ({ ...v, seoTitle: e.target.value }))} /></Field><Field label="SEO Description (opcional)" wide><Textarea rows={2} placeholder="Dejalo vacío para usar el extracto" value={form.seoDescription} onChange={(e) => setForm((v) => ({ ...v, seoDescription: e.target.value }))} /></Field><Field label="Contenido" wide><Textarea rows={12} placeholder="Escribe en Markdown…" value={form.content} onChange={(e) => setForm((v) => ({ ...v, content: e.target.value }))} /><div className="team-preview mt-3"><p className="label-orange">Vista previa</p>{form.content ? form.content.split("\n").filter(Boolean).map((line, index) => line.startsWith("## ") ? <h4 key={index}>{line.slice(3)}</h4> : <p key={index}>{line.replace(/^[-*] /, "")}</p>) : <p className="text-muted-foreground">El contenido aparecerá aquí.</p>}</div></Field></div></div><div className="mt-6 flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={() => onSave("Borrador")}>Guardar borrador</Button><Button type="button" onClick={() => onSave("Publicado")}>Publicar</Button><Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button></div></div>;
}
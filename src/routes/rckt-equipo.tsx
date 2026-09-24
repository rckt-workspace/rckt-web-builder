import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, FileText, LogOut, Mail, Pencil, Trash2, Upload, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
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

type ArticleStatus = "Borrador" | "Publicado";
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
};

const INITIAL_VACANCIES: Vacancy[] = [
  { id: 1, title: "Performance Marketing Specialist", area: "Medios", location: "Madrid, España", mode: "Remoto", description: "Gestionar y optimizar campañas de captación medidas hasta la venta.", requirements: "Experiencia con Meta Ads, Google Ads y analítica.", active: true, date: "2026-09-18" },
  { id: 2, title: "RevOps Analyst", area: "Operaciones", location: "Madrid, España", mode: "Remoto", description: "Diseñar pipelines, métricas y procesos comerciales conectados.", requirements: "Experiencia con CRM, reporting y automatización.", active: false, date: "2026-09-12" },
];

const INITIAL_APPLICATIONS: Application[] = [
  { id: 1, name: "Candidata de ejemplo", type: "Candidato", email: "candidata.ejemplo@correo.es", phone: "+34 600 000 001", vacancy: "Performance Marketing Specialist", date: "2026-09-21", status: "Nueva", message: "Postulación ficticia para revisar el diseño del panel.", portfolio: "https://example.com/portfolio-ejemplo" },
  { id: 2, name: "Candidato de ejemplo", type: "Candidato", email: "candidato.ejemplo@correo.es", phone: "+34 600 000 002", vacancy: "RevOps Analyst", date: "2026-09-20", status: "En revisión", message: "Datos creados únicamente como ejemplo visual." },
  { id: 3, name: "Freelance de ejemplo", type: "Freelance", email: "freelance.ejemplo@correo.es", phone: "+34 600 000 003", vacancy: "Diseño y motion", date: "2026-09-19", status: "Entrevista", message: "Perfil ficticio de colaboración para diseño y motion.", portfolio: "https://example.com/motion-ejemplo" },
];

const INITIAL_ARTICLES: Article[] = [
  { id: 1, title: "Más leads no significa más ventas", slug: "mas-leads-no-significa-mas-ventas", category: "Del lead a la venta", excerpt: "Por qué medir volumen sin seguir el cierre puede ocultar la fuga principal.", content: "## El problema\n\nMás volumen no corrige un proceso comercial roto.", author: "RCKT", date: "2026-09-10", readingTime: 5, status: "Publicado" },
  { id: 2, title: "Por qué no optimizar por coste por lead", slug: "por-que-no-optimizar-por-coste-por-lead", category: "Medios con medición", excerpt: "El lead más barato no siempre es el que termina comprando.", content: "## La métrica correcta\n\nLa optimización debe volver hasta la venta.", author: "RCKT", date: "2026-09-16", readingTime: 4, status: "Borrador" },
];

const CATEGORIES = ["Del lead a la venta", "Medios con medición", "IA que se paga sola", "WhatsApp y CRM", "Web y conversión"];
const STATUSES: ApplicationStatus[] = ["Nueva", "En revisión", "Entrevista", "Descartada"];
const EMPTY_VACANCY = { title: "", area: "", location: "", description: "", requirements: "" };
const EMPTY_ARTICLE = { title: "", slug: "", category: CATEGORIES[0], excerpt: "", content: "", author: "RCKT", date: "", readingTime: 5, status: "Borrador" as ArticleStatus };

const formatDate = (date: string) => new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function StatusBadge({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={muted ? "team-badge team-badge--muted" : "team-badge"}>{children}</span>;
}

function RcktEquipoPage() {
  const [vacancies, setVacancies] = useState(INITIAL_VACANCIES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [vacancyFilter, setVacancyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [vacancyFormOpen, setVacancyFormOpen] = useState(false);
  const [editingVacancyId, setEditingVacancyId] = useState<number | null>(null);
  const [vacancyForm, setVacancyForm] = useState(EMPTY_VACANCY);
  const [articleFormOpen, setArticleFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState(EMPTY_ARTICLE);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [coverWarning, setCoverWarning] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => { if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl); }, [coverUrl]);

  const filteredApplications = useMemo(() => applications.filter((item) =>
    (vacancyFilter === "all" || item.vacancy === vacancyFilter) &&
    (typeFilter === "all" || item.type === typeFilter)
  ), [applications, vacancyFilter, typeFilter]);

  const openNewVacancy = () => { setEditingVacancyId(null); setVacancyForm(EMPTY_VACANCY); setVacancyFormOpen(true); };
  const editVacancy = (item: Vacancy) => { setEditingVacancyId(item.id); setVacancyForm({ title: item.title, area: item.area, location: item.location, description: item.description, requirements: item.requirements }); setVacancyFormOpen(true); };
  const saveVacancy = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: conectar Supabase para crear o actualizar vacantes.
    if (editingVacancyId !== null) setVacancies((current) => current.map((item) => item.id === editingVacancyId ? { ...item, ...vacancyForm } : item));
    else setVacancies((current) => [{ id: Date.now(), ...vacancyForm, mode: "Remoto", active: true, date: new Date().toISOString().slice(0, 10) }, ...current]);
    setVacancyFormOpen(false);
  };
  const toggleVacancy = (id: number) => {
    // TODO: conectar Supabase para cambiar el estado de la vacante.
    setVacancies((current) => current.map((item) => item.id === id ? { ...item, active: !item.active } : item));
  };
  const deleteVacancy = (id: number) => {
    if (!window.confirm("¿Eliminar esta vacante?")) return;
    // TODO: conectar Supabase para eliminar la vacante.
    setVacancies((current) => current.filter((item) => item.id !== id));
  };
  const deleteApplication = (id: number) => {
    if (!window.confirm("¿Eliminar esta postulación?")) return;
    // TODO: conectar Supabase para eliminar la postulación.
    setApplications((current) => current.filter((item) => item.id !== id));
    setSelectedApplication(null);
  };
  const changeApplicationStatus = (id: number, status: ApplicationStatus) => {
    // TODO: conectar Supabase para actualizar el estado de la postulación.
    setApplications((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setSelectedApplication((current) => current?.id === id ? { ...current, status } : current);
  };
  const openNewArticle = () => { setEditingArticleId(null); setArticleForm(EMPTY_ARTICLE); setCoverUrl(null); setCoverWarning(""); setArticleFormOpen(true); };
  const editArticle = (item: Article) => { setEditingArticleId(item.id); setArticleForm({ title: item.title, slug: item.slug, category: item.category, excerpt: item.excerpt, content: item.content, author: item.author, date: item.date, readingTime: item.readingTime, status: item.status }); setCoverUrl(item.coverUrl ?? null); setCoverWarning(""); setArticleFormOpen(true); };
  const saveArticle = (status: ArticleStatus) => {
    // TODO: conectar Supabase y almacenamiento para guardar el artículo y su portada.
    const payload = { ...articleForm, status, coverUrl: coverUrl ?? undefined };
    if (editingArticleId !== null) setArticles((current) => current.map((item) => item.id === editingArticleId ? { ...item, ...payload } : item));
    else setArticles((current) => [{ id: Date.now(), ...payload }, ...current]);
    setArticleFormOpen(false);
  };
  const toggleArticle = (id: number) => {
    // TODO: conectar Supabase para publicar o despublicar el artículo.
    setArticles((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "Publicado" ? "Borrador" : "Publicado" } : item));
  };
  const deleteArticle = (id: number) => {
    if (!window.confirm("¿Eliminar este artículo?")) return;
    // TODO: conectar Supabase para eliminar el artículo y su portada.
    setArticles((current) => current.filter((item) => item.id !== id));
  };
  const loadCover = (file?: File) => {
    if (!file) return;
    setCoverWarning("");
    if (!(["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setCoverWarning("Usa un archivo JPG, PNG o WebP."); return; }
    if (file.size > 2 * 1024 * 1024) { setCoverWarning("La imagen supera el máximo de 2 MB."); return; }
    const nextUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl);
      setCoverUrl(nextUrl);
      if (image.height > image.width) setCoverWarning("Usa una imagen horizontal (16:9)");
    };
    image.onerror = () => { URL.revokeObjectURL(nextUrl); setCoverWarning("No se pudo leer la imagen."); };
    image.src = nextUrl;
  };

  return (
    <TooltipProvider>
      <div className="team-admin min-h-screen bg-background text-foreground">
        <div className="team-notice">Vista de diseño · los datos no se guardan todavía</div>
        <header className="team-header">
          <div className="team-shell flex items-center justify-between gap-4 py-5">
            <div className="font-display text-xl font-bold tracking-normal">RCKT</div>
            <Button type="button" variant="ghost" className="rounded-full" onClick={() => { /* TODO: conectar Supabase para cerrar sesión. */ }}>
              <LogOut aria-hidden="true" /> Cerrar sesión
            </Button>
          </div>
        </header>
        <main className="team-shell py-10 md:py-14">
          <p className="label-orange">RCKT / PEOPLE &amp; CULTURE</p>
          <h1 className="mt-3 font-display text-4xl font-semibold md:text-5xl">People &amp; Culture</h1>
          <p className="mt-3 text-base text-muted-foreground">Gestión de talento, postulaciones y contenido</p>

          <Tabs defaultValue="vacancies" className="mt-10">
            <TabsList className="team-tabs h-auto w-full justify-start overflow-x-auto rounded-full p-1 sm:w-auto">
              <TabsTrigger value="vacancies" className="rounded-full px-5 py-2.5"><BriefcaseBusiness /> Vacantes</TabsTrigger>
              <TabsTrigger value="applications" className="rounded-full px-5 py-2.5"><Users /> Postulaciones</TabsTrigger>
              <TabsTrigger value="blog" className="rounded-full px-5 py-2.5"><FileText /> Blog</TabsTrigger>
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
                  <div className="mt-5 flex flex-wrap gap-2"><DisabledCvButton /><Button type="button" variant="outline" onClick={() => setSelectedApplication(item)}>Ver detalle</Button><Button type="button" variant="ghost" onClick={() => deleteApplication(item.id)}><Trash2 /> Eliminar</Button></div>
                </article>)}
              </div>
            </TabsContent>

            <TabsContent value="blog" className="mt-8">
              <div className="team-section-heading"><div><h2>Blog</h2><p>Prepara y revisa el contenido editorial.</p></div><Button type="button" onClick={openNewArticle} className="rounded-full">+ Nuevo artículo</Button></div>
              {articleFormOpen ? <ArticleEditor form={articleForm} setForm={setArticleForm} coverUrl={coverUrl} warning={coverWarning} dragging={dragging} setDragging={setDragging} onFile={loadCover} onRemoveCover={() => { if (coverUrl?.startsWith("blob:")) URL.revokeObjectURL(coverUrl); setCoverUrl(null); setCoverWarning(""); }} onSave={saveArticle} onCancel={() => setArticleFormOpen(false)} editing={editingArticleId !== null} /> : null}
              <div className="mt-6 grid gap-4">
                {articles.map((item) => <article key={item.id} className="team-card team-article-row">
                  <div className="team-cover">{item.coverUrl ? <img src={item.coverUrl} alt="" /> : <span>RCKT</span>}</div>
                  <div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-display text-lg font-semibold">{item.title}</h3><p className="mt-1 text-sm text-muted-foreground">{item.category} · {formatDate(item.date)}</p></div><StatusBadge muted={item.status === "Borrador"}>{item.status}</StatusBadge></div><div className="mt-4 flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={() => editArticle(item)}><Pencil /> Editar</Button><Button type="button" variant="outline" onClick={() => toggleArticle(item.id)}>{item.status === "Publicado" ? "Despublicar" : "Publicar"}</Button><Button type="button" variant="ghost" onClick={() => deleteArticle(item.id)}><Trash2 /> Eliminar</Button></div></div>
                </article>)}
              </div>
            </TabsContent>
          </Tabs>
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
  return <div className={wide ? "sm:col-span-2" : ""}><Label className="mb-2 block">{label}</Label>{children}</div>;
}

function DisabledCvButton() {
  return <Tooltip><TooltipTrigger asChild><span className="inline-flex"><Button type="button" variant="outline" disabled>Ver CV</Button></span></TooltipTrigger><TooltipContent>Disponible al conectar el almacenamiento</TooltipContent></Tooltip>;
}

function ApplicationDetail({ item, onOpenChange, onStatus, onDelete }: { item: Application | null; onOpenChange: (open: boolean) => void; onStatus: (id: number, status: ApplicationStatus) => void; onDelete: (id: number) => void }) {
  return <Dialog open={item !== null} onOpenChange={onOpenChange}>{item ? <DialogContent className="team-dialog max-h-[88vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><StatusBadge muted={item.type === "Freelance"}>{item.type}</StatusBadge><DialogTitle className="pt-2 text-2xl">{item.name}</DialogTitle><DialogDescription>Postulación de ejemplo · {formatDate(item.date)}</DialogDescription></DialogHeader><dl className="team-detail-grid"><div><dt>Correo</dt><dd>{item.email}</dd></div><div><dt>Teléfono</dt><dd>{item.phone}</dd></div><div><dt>Vacante</dt><dd>{item.vacancy}</dd></div><div><dt>Estado</dt><dd>{item.status}</dd></div><div className="sm:col-span-2"><dt>Mensaje</dt><dd>{item.message}</dd></div></dl><div><Label className="mb-2 block">Cambiar estado</Label><Select value={item.status} onValueChange={(value) => onStatus(item.id, value as ApplicationStatus)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{STATUSES.map((status) => <SelectItem key={status} value={status}>{status}</SelectItem>)}</SelectContent></Select></div><div className="flex flex-wrap gap-2"><DisabledCvButton />{item.portfolio ? <Button asChild variant="outline"><a href={item.portfolio} target="_blank" rel="noreferrer">Ver portafolio</a></Button> : null}<Button asChild><a href={`mailto:${item.email}`}><Mail /> Contactar</a></Button><Button type="button" variant="ghost" onClick={() => onDelete(item.id)}><Trash2 /> Eliminar</Button></div></DialogContent> : null}</Dialog>;
}

function ArticleEditor({ form, setForm, coverUrl, warning, dragging, setDragging, onFile, onRemoveCover, onSave, onCancel, editing }: { form: typeof EMPTY_ARTICLE; setForm: React.Dispatch<React.SetStateAction<typeof EMPTY_ARTICLE>>; coverUrl: string | null; warning: string; dragging: boolean; setDragging: (value: boolean) => void; onFile: (file?: File) => void; onRemoveCover: () => void; onSave: (status: ArticleStatus) => void; onCancel: () => void; editing: boolean }) {
  return <div className="team-card mt-6"><h3 className="font-display text-xl font-semibold">{editing ? "Editar artículo" : "Nuevo artículo"}</h3><div className="mt-6 grid gap-5"><div><Label className="mb-2 block">Imagen de portada</Label><label className={`team-dropzone ${dragging ? "team-dropzone--active" : ""}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files[0]); }}>{coverUrl ? <img src={coverUrl} alt="Vista previa de la portada" /> : <><Upload aria-hidden="true" /><strong>Arrastra una imagen o selecciónala</strong><span>JPG, PNG o WebP</span></>}<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} /></label><p className="mt-2 text-sm text-muted-foreground">Formato horizontal 16:9 · recomendado 1600 × 900 px · máx. 2 MB</p>{warning ? <p className="mt-2 text-sm font-semibold text-orange">{warning}</p> : null}{coverUrl ? <Button type="button" variant="ghost" className="mt-2" onClick={onRemoveCover}><X /> Quitar imagen</Button> : null}</div><div className="grid gap-5 sm:grid-cols-2"><Field label="Título"><Input required value={form.title} onChange={(e) => { const title = e.target.value; setForm((v) => ({ ...v, title, slug: v.slug === slugify(v.title) || !v.slug ? slugify(title) : v.slug })); }} /></Field><Field label="Slug"><Input required value={form.slug} onChange={(e) => setForm((v) => ({ ...v, slug: slugify(e.target.value) }))} /></Field><Field label="Categoría"><Select value={form.category} onValueChange={(category) => setForm((v) => ({ ...v, category }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select></Field><Field label="Autor"><Input required value={form.author} onChange={(e) => setForm((v) => ({ ...v, author: e.target.value }))} /></Field><Field label="Fecha de publicación"><Input type="date" required value={form.date} onChange={(e) => setForm((v) => ({ ...v, date: e.target.value }))} /></Field><Field label="Tiempo de lectura (min)"><Input type="number" min={1} required value={form.readingTime} onChange={(e) => setForm((v) => ({ ...v, readingTime: Number(e.target.value) }))} /></Field><Field label="Estado" wide><Select value={form.status} onValueChange={(status) => setForm((v) => ({ ...v, status: status as ArticleStatus }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Borrador">Borrador</SelectItem><SelectItem value="Publicado">Publicado</SelectItem></SelectContent></Select></Field><Field label="Extracto" wide><Textarea maxLength={160} rows={3} value={form.excerpt} onChange={(e) => setForm((v) => ({ ...v, excerpt: e.target.value }))} /><p className="mt-1 text-right text-xs text-muted-foreground">{form.excerpt.length}/160</p></Field><Field label="Contenido" wide><Textarea rows={12} placeholder="Escribe en Markdown…" value={form.content} onChange={(e) => setForm((v) => ({ ...v, content: e.target.value }))} /><div className="team-preview mt-3"><p className="label-orange">Vista previa</p>{form.content ? form.content.split("\n").filter(Boolean).map((line, index) => line.startsWith("## ") ? <h4 key={index}>{line.slice(3)}</h4> : <p key={index}>{line.replace(/^[-*] /, "")}</p>) : <p className="text-muted-foreground">El contenido aparecerá aquí.</p>}</div></Field></div></div><div className="mt-6 flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={() => onSave("Borrador")}>Guardar borrador</Button><Button type="button" onClick={() => onSave("Publicado")}>Publicar</Button><Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button></div></div>;
}
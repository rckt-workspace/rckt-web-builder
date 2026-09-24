-- RCKT España business foundation
-- Organizations, clients, vacancies, applications, and blog structure

-- ==================== ENUMS ====================

CREATE TYPE public.vacante_estado AS ENUM (
  'borrador',
  'activa',
  'cerrada'
);

CREATE TYPE public.postulacion_tipo AS ENUM (
  'candidato',
  'servicio'
);

CREATE TYPE public.postulacion_estado AS ENUM (
  'nueva',
  'revision',
  'contactado',
  'entrevista',
  'descartado',
  'seleccionado'
);

CREATE TYPE public.blog_status AS ENUM (
  'draft',
  'published',
  'archived'
);

-- ==================== ORGANIZATIONS ====================

CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX organizations_slug_idx ON organizations (slug);
CREATE INDEX organizations_created_at_idx ON organizations (created_at DESC);

CREATE TRIGGER organizations_set_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON organizations AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ==================== CLIENTS ====================

CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_client_slug UNIQUE(organization_id, slug)
);

CREATE INDEX clients_organization_id_idx ON clients(organization_id);
CREATE INDEX clients_slug_idx ON clients(slug);
CREATE INDEX clients_created_at_idx ON clients(created_at DESC);

CREATE TRIGGER clients_set_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON clients AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ==================== VACANTES (Job Postings) ====================

CREATE TABLE public.vacantes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  area text NOT NULL,
  modalidad text,
  ubicacion text,
  descripcion text,
  requisitos text,
  responsabilidades text,
  estado vacante_estado NOT NULL DEFAULT 'borrador',
  destacada bool NOT NULL DEFAULT false,
  orden int,
  fecha_publicacion timestamptz,
  fecha_cierre timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX vacantes_slug_idx ON vacantes(slug);
CREATE INDEX vacantes_estado_idx ON vacantes(estado);
CREATE INDEX vacantes_estado_fecha_idx ON vacantes(estado, fecha_publicacion DESC)
  WHERE estado = 'activa'::vacante_estado;
CREATE INDEX vacantes_created_at_idx ON vacantes(created_at DESC);

CREATE TRIGGER vacantes_set_updated_at
  BEFORE UPDATE ON vacantes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE vacantes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_active_only" ON vacantes
  FOR SELECT TO anon, authenticated USING (estado = 'activa'::vacante_estado);
CREATE POLICY "deny_public_write" ON vacantes AS RESTRICTIVE
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_update" ON vacantes AS RESTRICTIVE
  FOR UPDATE TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_delete" ON vacantes AS RESTRICTIVE
  FOR DELETE TO anon, authenticated USING (false);

-- ==================== POSTULATIONS (Applications) ====================

CREATE TABLE public.postulaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vacante_id uuid REFERENCES vacantes(id) ON DELETE SET NULL,
  tipo postulacion_tipo NOT NULL,
  nombre text NOT NULL,
  email text NOT NULL,
  telefono text,
  portafolio_url text,
  mensaje text,
  cv_path text,
  estado postulacion_estado NOT NULL DEFAULT 'nueva',
  notas_internas text,
  source text,
  consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX postulaciones_vacante_id_idx ON postulaciones(vacante_id);
CREATE INDEX postulaciones_email_idx ON postulaciones(email);
CREATE INDEX postulaciones_estado_idx ON postulaciones(estado);
CREATE INDEX postulaciones_created_at_idx ON postulaciones(created_at DESC);
CREATE INDEX postulaciones_tipo_idx ON postulaciones(tipo);

CREATE TRIGGER postulaciones_set_updated_at
  BEFORE UPDATE ON postulaciones
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON postulaciones AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ==================== POSTULATION EVENTS ====================

CREATE TABLE public.postulacion_eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  postulacion_id uuid NOT NULL REFERENCES postulaciones(id) ON DELETE CASCADE,
  tipo text NOT NULL,
  estado_anterior postulacion_estado,
  estado_nuevo postulacion_estado,
  nota text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX postulacion_eventos_postulacion_id_idx ON postulacion_eventos(postulacion_id);
CREATE INDEX postulacion_eventos_created_at_idx ON postulacion_eventos(created_at DESC);

ALTER TABLE postulacion_eventos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON postulacion_eventos AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- ==================== BLOG CATEGORIES ====================

CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  orden int,
  active bool NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blog_categories_slug_idx ON blog_categories(slug);
CREATE INDEX blog_categories_active_idx ON blog_categories(active);
CREATE INDEX blog_categories_orden_idx ON blog_categories(orden);

CREATE TRIGGER blog_categories_set_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_active_only" ON blog_categories
  FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "deny_public_insert" ON blog_categories AS RESTRICTIVE
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_update" ON blog_categories AS RESTRICTIVE
  FOR UPDATE TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_delete" ON blog_categories AS RESTRICTIVE
  FOR DELETE TO anon, authenticated USING (false);

-- ==================== BLOG POSTS ====================

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text,
  cover_image_path text,
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_name text,
  tags text[],
  status blog_status NOT NULL DEFAULT 'draft',
  featured bool NOT NULL DEFAULT false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_category_id_idx ON blog_posts(category_id);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_published_idx ON blog_posts(published_at DESC)
  WHERE status = 'published'::blog_status AND published_at IS NOT NULL;
CREATE INDEX blog_posts_featured_idx ON blog_posts(featured)
  WHERE status = 'published'::blog_status AND featured = true;
CREATE INDEX blog_posts_created_at_idx ON blog_posts(created_at DESC);

CREATE TRIGGER blog_posts_set_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_published_only" ON blog_posts
  FOR SELECT TO anon, authenticated USING (
    status = 'published'::blog_status AND published_at <= now()
  );
CREATE POLICY "deny_public_insert" ON blog_posts AS RESTRICTIVE
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_update" ON blog_posts AS RESTRICTIVE
  FOR UPDATE TO anon, authenticated WITH CHECK (false);
CREATE POLICY "deny_public_delete" ON blog_posts AS RESTRICTIVE
  FOR DELETE TO anon, authenticated USING (false);

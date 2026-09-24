-- Seed data for RCKT España
-- Minimal, safe, generic data for local development

-- ==================== ORGANIZATIONS ====================

INSERT INTO public.organizations (name, slug)
VALUES ('RCKT España', 'rckt-espana')
ON CONFLICT (slug) DO NOTHING;

-- ==================== BLOG CATEGORIES ====================

INSERT INTO public.blog_categories (name, slug, description, orden, active)
VALUES
  ('Tech', 'tech', 'Technology and product updates', 1, true),
  ('Hiring', 'hiring', 'Career opportunities and team insights', 2, true),
  ('Industry', 'industry', 'Industry news and trends', 3, true)
ON CONFLICT (slug) DO NOTHING;

-- ==================== AI RUNTIME CONFIG DEFAULTS ====================

-- Ensure default config exists (migrations insert it, but re-check here)
INSERT INTO public.ai_runtime_config (active_agent_profile)
SELECT 'rckt_advisor'
WHERE NOT EXISTS (SELECT 1 FROM public.ai_runtime_config LIMIT 1);

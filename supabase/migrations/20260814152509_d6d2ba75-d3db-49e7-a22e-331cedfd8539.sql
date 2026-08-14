REVOKE ALL ON public.leads FROM anon, authenticated;
GRANT ALL ON public.leads TO service_role;
DROP POLICY IF EXISTS "leads_deny_public" ON public.leads;
CREATE POLICY "leads_deny_public" ON public.leads AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
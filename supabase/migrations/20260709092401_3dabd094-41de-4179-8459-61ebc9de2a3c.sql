drop policy if exists "Anyone can submit a lead" on public.leads;
revoke insert on public.leads from anon, authenticated;
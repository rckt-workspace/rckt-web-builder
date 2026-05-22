-- Documenta de forma explícita la intención: cero acceso público a chat_leads.
-- Toda escritura/lectura se hace exclusivamente con el service role desde el servidor.
CREATE POLICY "deny_all_public_access"
  ON public.chat_leads
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
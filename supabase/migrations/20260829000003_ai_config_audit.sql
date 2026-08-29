CREATE TABLE ai_config_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_version int NOT NULL,
  fields_changed text[] NOT NULL,
  previous_values jsonb,
  new_values jsonb,
  updated_by text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ai_config_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_public_access" ON ai_config_audit AS RESTRICTIVE
  FOR ALL TO anon, authenticated USING (false);

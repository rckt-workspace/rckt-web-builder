CREATE TABLE ai_usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL DEFAULT gen_random_uuid(),
  session_id text,
  agent_profile text NOT NULL,
  provider text NOT NULL,
  model text NOT NULL,
  fallback_used bool NOT NULL DEFAULT false,
  input_tokens int NOT NULL DEFAULT 0,
  output_tokens int NOT NULL DEFAULT 0,
  cached_tokens int NOT NULL DEFAULT 0,
  cost_usd numeric(10,6),
  cost_type text CHECK (cost_type IN ('actual','estimated')),
  latency_ms int,
  ttft_ms int,
  status text NOT NULL,
  error_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ON ai_usage_events (created_at DESC);
CREATE INDEX ON ai_usage_events (agent_profile, created_at DESC);
CREATE INDEX ON ai_usage_events (provider, created_at DESC);

ALTER TABLE ai_usage_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_public_access" ON ai_usage_events AS RESTRICTIVE
  FOR ALL TO anon, authenticated USING (false);

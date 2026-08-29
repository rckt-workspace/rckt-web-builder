CREATE TABLE ai_runtime_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  active_agent_profile text NOT NULL DEFAULT 'rckt_advisor',
  routing_mode text NOT NULL DEFAULT 'failover' CHECK (routing_mode IN ('failover', 'weighted')),
  primary_provider text NOT NULL DEFAULT 'anthropic',
  primary_model text NOT NULL DEFAULT 'claude-sonnet-5',
  secondary_provider text NOT NULL DEFAULT 'openrouter',
  secondary_model text NOT NULL DEFAULT 'meta-llama/llama-3.1-8b-instruct:free',
  primary_weight int NOT NULL DEFAULT 100 CHECK (primary_weight BETWEEN 0 AND 100),
  secondary_weight int GENERATED ALWAYS AS (100 - primary_weight) STORED,
  fallback_enabled bool NOT NULL DEFAULT true,
  max_tokens int NOT NULL DEFAULT 1024,
  primary_timeout_ms int NOT NULL DEFAULT 45000,
  fallback_timeout_ms int NOT NULL DEFAULT 45000,
  daily_budget_usd numeric(10,4),
  monthly_budget_usd numeric(10,4),
  budget_policy text NOT NULL DEFAULT 'warn_only' CHECK (budget_policy IN ('warn_only','prefer_cheaper_provider','fallback_only','hard_stop')),
  enabled bool NOT NULL DEFAULT true,
  version int NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text NOT NULL DEFAULT 'system'
);

ALTER TABLE ai_runtime_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_public_access" ON ai_runtime_config AS RESTRICTIVE
  FOR ALL TO anon, authenticated USING (false);

INSERT INTO ai_runtime_config DEFAULT VALUES;

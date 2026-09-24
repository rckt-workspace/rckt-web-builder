-- Incremental migration to align ai_runtime_config with RuntimeConfig schema.
-- Does NOT drop/recreate existing columns.
-- Adds missing columns for:
-- - Pipeline features (chat_use_*)
-- - Generation parameters (temperature, top_p)
-- - Role-specific model columns
-- - Embeddings configuration
-- - Additional timeouts

-- Add pipeline feature flags if they don't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS chat_use_fallback bool NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS chat_use_enhancement bool NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS chat_use_judge bool NOT NULL DEFAULT false;

-- Add generation parameters if they don't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS temperature numeric(3,2) NOT NULL DEFAULT 0.2 CHECK (temperature BETWEEN 0.0 AND 2.0),
  ADD COLUMN IF NOT EXISTS top_p numeric(3,2) NOT NULL DEFAULT 0.8 CHECK (top_p BETWEEN 0.0 AND 1.0);

-- Add additional timeouts if they don't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS enhancement_timeout_ms int NOT NULL DEFAULT 30000,
  ADD COLUMN IF NOT EXISTS judge_timeout_ms int NOT NULL DEFAULT 20000;

-- Add role-specific OpenRouter models if they don't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS openrouter_primary_model text NOT NULL DEFAULT 'openrouter/free',
  ADD COLUMN IF NOT EXISTS openrouter_fallback_model text NOT NULL DEFAULT 'meta-llama/llama-3.1-8b-instruct:free',
  ADD COLUMN IF NOT EXISTS openrouter_enhancement_model text NOT NULL DEFAULT 'openrouter/free',
  ADD COLUMN IF NOT EXISTS openrouter_judge_model text NOT NULL DEFAULT 'openrouter/free';

-- Add role-specific Anthropic models if they don't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS anthropic_primary_model text NOT NULL DEFAULT 'claude-haiku-4-5-20251001',
  ADD COLUMN IF NOT EXISTS anthropic_fallback_model text NOT NULL DEFAULT 'claude-sonnet-4-6',
  ADD COLUMN IF NOT EXISTS anthropic_enhancement_model text NOT NULL DEFAULT 'claude-haiku-4-5-20251001',
  ADD COLUMN IF NOT EXISTS anthropic_judge_model text NOT NULL DEFAULT 'claude-haiku-4-5-20251001';

-- Add embeddings configuration if it doesn't exist
ALTER TABLE ai_runtime_config
  ADD COLUMN IF NOT EXISTS embeddings_provider text NOT NULL DEFAULT 'local',
  ADD COLUMN IF NOT EXISTS embeddings_model text NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2',
  ADD COLUMN IF NOT EXISTS embedding_dim int NOT NULL DEFAULT 384;

-- Update column DEFAULTs to match Supabase as source of truth (config.py/Pydantic)
ALTER TABLE ai_runtime_config
  ALTER COLUMN primary_provider SET DEFAULT 'openrouter',
  ALTER COLUMN secondary_provider SET DEFAULT 'anthropic',
  ALTER COLUMN max_tokens SET DEFAULT 900;

-- Align initial row with Supabase as source of truth (config.py/Pydantic defaults)
UPDATE ai_runtime_config
SET
  primary_provider = 'openrouter',
  secondary_provider = 'anthropic',
  primary_model = 'meta-llama/llama-3.1-8b-instruct:free',
  secondary_model = 'claude-sonnet-5',
  max_tokens = 900,
  temperature = 0.2,
  top_p = 0.8
WHERE primary_provider = 'anthropic' AND secondary_provider = 'openrouter';

-- NOTE: Columns "primary_model" and "secondary_model" are DEPRECATED
-- but kept for backwards compatibility with existing rows.
-- New code should use the role-specific columns above.

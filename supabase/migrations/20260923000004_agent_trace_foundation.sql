-- Agent execution tracing foundation
-- Tracks agent sessions, messages, and runs for observability and debugging

-- ==================== AGENT SESSIONS ====================

CREATE TABLE public.agent_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  agent_profile text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX agent_sessions_organization_id_idx ON agent_sessions(organization_id);
CREATE INDEX agent_sessions_client_id_idx ON agent_sessions(client_id);
CREATE INDEX agent_sessions_agent_profile_idx ON agent_sessions(agent_profile);
CREATE INDEX agent_sessions_created_at_idx ON agent_sessions(created_at DESC);

CREATE TRIGGER agent_sessions_set_updated_at
  BEFORE UPDATE ON agent_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE agent_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON agent_sessions AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false);

-- ==================== AGENT MESSAGES ====================

CREATE TABLE public.agent_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX agent_messages_session_id_idx ON agent_messages(session_id);
CREATE INDEX agent_messages_created_at_idx ON agent_messages(created_at DESC);

ALTER TABLE agent_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON agent_messages AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false);

-- ==================== AGENT RUNS ====================

CREATE TABLE public.agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  request_id uuid NOT NULL,
  agent_profile text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'running', 'success', 'error', 'timeout')),
  provider text,
  model text,
  latency_ms int,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX agent_runs_session_id_idx ON agent_runs(session_id);
CREATE INDEX agent_runs_request_id_idx ON agent_runs(request_id);
CREATE INDEX agent_runs_status_idx ON agent_runs(status);
CREATE INDEX agent_runs_agent_profile_idx ON agent_runs(agent_profile);
CREATE INDEX agent_runs_created_at_idx ON agent_runs(created_at DESC);

ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON agent_runs AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false);

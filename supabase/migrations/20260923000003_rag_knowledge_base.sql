-- RAG (Retrieval-Augmented Generation) knowledge base with pgvector
-- Enables semantic search across documents

-- ==================== VECTOR EXTENSION ====================

CREATE EXTENSION IF NOT EXISTS vector;

-- ==================== ENUMS ====================

CREATE TYPE public.knowledge_status AS ENUM (
  'pending',
  'processing',
  'ready',
  'failed'
);

-- ==================== KNOWLEDGE DOCUMENTS ====================

CREATE TABLE public.knowledge_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  source_type text NOT NULL,
  source_url text,
  storage_path text,
  mime_type text,
  status knowledge_status NOT NULL DEFAULT 'pending',
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding_model text NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2',
  embedding_dim int NOT NULL DEFAULT 384,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX knowledge_documents_organization_id_idx ON knowledge_documents(organization_id);
CREATE INDEX knowledge_documents_client_id_idx ON knowledge_documents(client_id);
CREATE INDEX knowledge_documents_status_idx ON knowledge_documents(status);
CREATE INDEX knowledge_documents_created_at_idx ON knowledge_documents(created_at DESC);

CREATE TRIGGER knowledge_documents_set_updated_at
  BEFORE UPDATE ON knowledge_documents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON knowledge_documents AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false);

-- ==================== KNOWLEDGE CHUNKS ====================

CREATE TABLE public.knowledge_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  content text NOT NULL,
  token_count int,
  metadata jsonb DEFAULT '{}'::jsonb,
  embedding vector(384),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT unique_document_chunk UNIQUE(document_id, chunk_index)
);

CREATE INDEX knowledge_chunks_document_id_idx ON knowledge_chunks(document_id);
CREATE INDEX knowledge_chunks_organization_id_idx ON knowledge_chunks(organization_id);
CREATE INDEX knowledge_chunks_client_id_idx ON knowledge_chunks(client_id);
CREATE INDEX knowledge_chunks_created_at_idx ON knowledge_chunks(created_at DESC);

-- Vector similarity index (HNSW for fast nearest-neighbor search)
CREATE INDEX knowledge_chunks_embedding_hnsw_idx
  ON knowledge_chunks USING hnsw (embedding vector_cosine_ops);

ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deny_all" ON knowledge_chunks AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false);

-- ==================== KNOWLEDGE SEARCH RPC ====================

CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
  query_embedding vector(384),
  match_count int DEFAULT 5,
  match_threshold float DEFAULT 0.0,
  organization_filter uuid DEFAULT NULL,
  client_filter uuid DEFAULT NULL
)
RETURNS TABLE (
  chunk_id uuid,
  document_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    kc.id,
    kc.document_id,
    kc.content,
    kc.metadata,
    (1 - (kc.embedding <=> query_embedding))::float AS similarity
  FROM knowledge_chunks kc
  WHERE
    kc.embedding IS NOT NULL
    AND (1 - (kc.embedding <=> query_embedding)) > match_threshold
    AND (organization_filter IS NULL OR kc.organization_id = organization_filter)
    AND (client_filter IS NULL OR kc.client_id = client_filter)
  ORDER BY kc.embedding <=> query_embedding
  LIMIT match_count;
$$;

COMMENT ON FUNCTION public.match_knowledge_chunks IS
  'Semantic search across knowledge chunks using vector similarity (cosine distance). Returns chunks ordered by relevance.';

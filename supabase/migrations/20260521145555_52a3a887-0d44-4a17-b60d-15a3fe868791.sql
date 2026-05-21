CREATE TABLE public.chat_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX chat_leads_created_at_idx ON public.chat_leads (created_at DESC);
CREATE INDEX chat_leads_email_idx ON public.chat_leads (email);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER chat_leads_set_updated_at
BEFORE UPDATE ON public.chat_leads
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
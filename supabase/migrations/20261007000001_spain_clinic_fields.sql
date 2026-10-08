-- Add clinic-specific fields to leads table for Spain project

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS numero_sedes text;

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS tratamientos_principales text;

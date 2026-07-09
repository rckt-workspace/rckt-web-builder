create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  website text,
  concern text,
  source text,
  user_agent text
);

grant insert on public.leads to anon, authenticated;
grant all on public.leads to service_role;

alter table public.leads enable row level security;

create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
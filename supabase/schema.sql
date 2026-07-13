-- ==========================================
-- SCHEMA SUPABASE - HUB D'IDÉES EMSP
-- ==========================================

-- 1. Table des Profils (utilisateurs étendus)
-- Liée à auth.users par l'id
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role text default 'student' check (role in ('student', 'admin', 'jury')),
  avatar_url text,
  bio text,
  field_of_study text, -- ex: 'Télécoms', 'Management'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activation de RLS (Row Level Security) sur profiles
alter table public.profiles enable row level security;

-- Policies pour profiles
create policy "Les profils sont visibles par tous les utilisateurs connectés"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Les utilisateurs peuvent mettre à jour leur propre profil"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- 2. Trigger pour créer automatiquement un profil à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- TABLES FUTURES (Aperçu pour le Bloc 10+)
-- ==========================================

-- Table des Projets / Idées
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  problem text not null,
  solution text not null,
  team_status text not null, -- 'solo', 'complete', 'looking_for_members'
  tags text[],
  author_id uuid references public.profiles(id) not null,
  is_official_selection boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;

create policy "Les projets sont visibles par tous"
  on public.projects for select
  to authenticated
  using (true);

create policy "Les utilisateurs peuvent créer des projets"
  on public.projects for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "Les auteurs peuvent modifier leurs projets"
  on public.projects for update
  to authenticated
  using (auth.uid() = author_id);

-- ============================================================================
-- SLOTGOLD — Migration inicial do banco de dados
-- Tabelas: platforms, clicks, notifications, site_settings  + RLS
-- Status: PREPARADA, NÃO EXECUTADA. Aguarda autorização.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Função auxiliar: identifica se o usuário autenticado é administrador.
-- O papel "admin" deve ser definido no app_metadata do usuário (Supabase Auth),
-- em etapa futura. SECURITY DEFINER evita herança de RLS nas tabelas consultadas.
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ============================================================================
-- 1. platforms
-- ============================================================================
create table if not exists public.platforms (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  logo_url      text,
  description   text,
  affiliate_url text not null,
  bonus_text    text,
  rating        numeric(3, 2) check (rating >= 0 and rating <= 5),
  is_featured   boolean not null default false,
  is_active     boolean not null default true,
  position      integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists platforms_slug_idx
  on public.platforms (slug);
create index if not exists platforms_active_featured_idx
  on public.platforms (is_active, is_featured, position);

-- ============================================================================
-- 2. clicks
-- ============================================================================
create table if not exists public.clicks (
  id          uuid primary key default gen_random_uuid(),
  platform_id uuid references public.platforms (id) on delete cascade,
  created_at  timestamptz not null default now()
);

create index if not exists clicks_platform_id_idx
  on public.clicks (platform_id);
create index if not exists clicks_created_at_idx
  on public.clicks (created_at);

-- ----------------------------------------------------------------------------
-- RPC: register_click(platform_slug text)
-- ÚNICA via de inserção de cliques. O visitante NÃO faz INSERT direto na
-- tabela (sem policy de INSERT público). A função recebe apenas o slug,
-- resolve o platform_id internamente, valida se a plataforma existe e está
-- ativa, e insere o clique. O visitante não controla platform_id, created_at
-- nem nenhum outro campo. SECURITY DEFINER + search_path explícito = seguro.
-- ----------------------------------------------------------------------------
create or replace function public.register_click(platform_slug text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_platform_id uuid;
begin
  -- plataforma resolvida SOMENTE internamente; visitante não informa o id
  select p.id
    into v_platform_id
    from public.platforms p
   where p.slug = platform_slug
     and p.is_active = true;

  if v_platform_id is null then
    return jsonb_build_object(
      'ok', false,
      'error', 'plataforma invalida ou inativa'
    );
  end if;

  insert into public.clicks (platform_id)
  values (v_platform_id);

  return jsonb_build_object('ok', true);
end;
$$;

-- Permissão mínima: apenas EXECUTE para anon e authenticated (cliente da app).
-- Nenhuma permissão de INSERT/UPDATE/DELETE é concedida diretamente a eles.
revoke execute on function public.register_click(text) from public;
grant execute on function public.register_click(text) to anon, authenticated;

-- ============================================================================
-- 3. notifications
-- ============================================================================
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  platform_id uuid references public.platforms (id) on delete set null,
  message     text not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index if not exists notifications_active_idx
  on public.notifications (is_active, created_at);

-- ============================================================================
-- 4. site_settings
-- ============================================================================
create table if not exists public.site_settings (
  id               uuid primary key default gen_random_uuid(),
  site_name        text,
  site_description text,
  logo_url         text,
  favicon_url      text,
  contact_email    text,
  updated_at       timestamptz not null default now()
);

-- ============================================================================
-- Trigger reutilizável: atualiza updated_at antes de UPDATE
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger platforms_set_updated_at
  before update on public.platforms
  for each row execute function public.set_updated_at();

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.platforms     enable row level security;
alter table public.clicks        enable row level security;
alter table public.notifications enable row level security;
alter table public.site_settings enable row level security;

-- ----------------------------------------------------------------------------
-- PLATFORMS
-- Leitura pública: somente plataformas ativas (is_active = true).
-- Administrador: controle total.
-- ----------------------------------------------------------------------------
drop policy if exists "platforms_select_public" on public.platforms;
create policy "platforms_select_public"
  on public.platforms
  for select
  using (is_active = true);

drop policy if exists "platforms_admin_all" on public.platforms;
create policy "platforms_admin_all"
  on public.platforms
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- CLICKS
-- NÃO há policy de INSERT público: o visitante NÃO insere diretamente.
-- A inserção ocorre apenas via RPC register_click() (SECURITY DEFINER).
-- UPDATE/DELETE também não possuem policy para anon/authenticated => RLS
-- bloqueia alteração/apagamento. O administrador tem controle total.
-- ----------------------------------------------------------------------------
drop policy if exists "clicks_admin_all" on public.clicks;
create policy "clicks_admin_all"
  on public.clicks
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- NOTIFICATIONS
-- Leitura pública: somente notificações ativas.
-- Administrador: controle total.
-- ----------------------------------------------------------------------------
drop policy if exists "notifications_select_public" on public.notifications;
create policy "notifications_select_public"
  on public.notifications
  for select
  using (is_active = true);

drop policy if exists "notifications_admin_all" on public.notifications;
create policy "notifications_admin_all"
  on public.notifications
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- SITE_SETTINGS
-- Leitura pública: configurações gerais visíveis no site.
-- Administrador: controle total (inclui update).
-- ----------------------------------------------------------------------------
drop policy if exists "site_settings_select_public" on public.site_settings;
create policy "site_settings_select_public"
  on public.site_settings
  for select
  using (true);

drop policy if exists "site_settings_admin_all" on public.site_settings;
create policy "site_settings_admin_all"
  on public.site_settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- REVERSÃO (documentação — NÃO executado junto com o UP)
-- Ordem importa: policies -> trigger -> funções -> tabelas.
-- ============================================================================
-- drop policy if exists "site_settings_admin_all"   on public.site_settings;
-- drop policy if exists "site_settings_select_public" on public.site_settings;
-- drop policy if exists "notifications_admin_all"   on public.notifications;
-- drop policy if exists "notifications_select_public" on public.notifications;
-- drop policy if exists "clicks_admin_all"          on public.clicks;
-- drop function if exists public.register_click(text);
-- revoke execute on function public.register_click(text) from anon, authenticated;
-- drop policy if exists "platforms_admin_all"       on public.platforms;
-- drop policy if exists "platforms_select_public"    on public.platforms;
-- drop trigger if exists platforms_set_updated_at    on public.platforms;
-- drop trigger if exists site_settings_set_updated_at on public.site_settings;
-- drop function if exists public.set_updated_at();
-- drop function if exists public.is_admin();
-- drop table if exists public.site_settings;
-- drop table if exists public.notifications;
-- drop table if exists public.clicks;
-- drop table if exists public.platforms;

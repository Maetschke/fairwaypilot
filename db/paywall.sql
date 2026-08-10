-- FairwayPilot – Paywall-Datenmodell (2026-08-09)
-- Im Supabase SQL-Editor ausführen (Projekt qzeesflibjxkdorvxqyf).
-- Schreibrechte hat ausschließlich der Service-Role-Key (Worker); Nutzer lesen nur eigene Zeilen.

-- 1) Abonnements (Quelle der Wahrheit = Stripe-Webhook bzw. eingelöster Code)
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'none',            -- none | trialing | active | past_due | canceled
  plan text,                                        -- monthly | yearly | club
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
drop policy if exists sub_select_own on public.subscriptions;
create policy sub_select_own on public.subscriptions for select using (auth.uid() = user_id);
-- (kein insert/update/delete-Policy => nur Service-Role schreibt)

-- 2) Verbrauchszähler für Gratis-Limits (1 KI-Analyse/Monat, 1 Recherche gesamt)
create table if not exists public.usage_counters (
  user_id uuid references auth.users(id) on delete cascade,
  metric text not null,                             -- swing_analysis | course_research
  period text not null,                             -- 'YYYY-MM' oder 'total'
  count int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, metric, period)
);
alter table public.usage_counters enable row level security;
drop policy if exists usage_select_own on public.usage_counters;
create policy usage_select_own on public.usage_counters for select using (auth.uid() = user_id);

-- 3) Einlöse-Codes (Clubmitglieder) – geheim, nur Service-Role
create table if not exists public.redeem_codes (
  code text primary key,
  plan text not null default 'club',
  duration_days int,                                -- null = unbegrenzt gültig
  max_redemptions int not null default 1,
  redeemed_count int not null default 0,
  expires_at timestamptz,                           -- Gültigkeit des Codes selbst (optional)
  active boolean not null default true,
  note text,
  created_at timestamptz not null default now()
);
alter table public.redeem_codes enable row level security;
-- (keine Policies => nur Service-Role liest/schreibt)

create table if not exists public.redemptions (
  user_id uuid references auth.users(id) on delete cascade,
  code text references public.redeem_codes(code) on delete cascade,
  redeemed_at timestamptz not null default now(),
  primary key (user_id, code)
);
alter table public.redemptions enable row level security;
drop policy if exists redemption_select_own on public.redemptions;
create policy redemption_select_own on public.redemptions for select using (auth.uid() = user_id);

-- Beispiel: Club-Code anlegen (unbegrenzte Laufzeit, bis zu 100 Mitglieder):
-- insert into public.redeem_codes(code, plan, duration_days, max_redemptions, note)
--   values ('GEORGHAUSEN2026', 'club', null, 100, 'Mitglieder GC Schloss Georghausen');
-- Zeitlich begrenzt (z.B. 1 Jahr Premium je Mitglied):
-- insert into public.redeem_codes(code, plan, duration_days, max_redemptions, note)
--   values ('KUERTEN-1J', 'club', 365, 50, 'GC Kürten – 1 Jahr');

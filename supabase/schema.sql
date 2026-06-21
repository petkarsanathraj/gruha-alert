-- GruhaAlert schema. Run once in the Supabase SQL editor.

create table if not exists notifications (
  id          text primary key,            -- stable hash of the PDF url
  board       text not null default 'KHB',
  district    text not null,
  place       text not null,
  type        text not null,
  title_kn    text,
  label_en    text not null,
  deadline    date,
  status      text not null default 'unknown',  -- open | closed | unknown
  pdf_url     text not null,
  apply_url   text not null,
  market_url  text not null,
  first_seen  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

create index if not exists notifications_status_deadline on notifications (status, deadline);
create index if not exists notifications_district on notifications (district);

create table if not exists subscribers (
  id          bigint generated always as identity primary key,
  email       text not null unique,
  districts   text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- Row Level Security: public can READ notifications; nobody reads subscribers via anon.
alter table notifications enable row level security;
alter table subscribers   enable row level security;

create policy "public read notifications"
  on notifications for select
  to anon
  using (true);

-- Inserts to notifications/subscribers happen with the service-role key
-- (bypasses RLS), so no anon insert policy is needed.
-- The subscribe API uses the service key server-side.

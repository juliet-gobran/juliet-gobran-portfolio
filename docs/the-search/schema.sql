-- Run this once in the Supabase project's SQL editor to set up The Search's tables.
-- Row Level Security is enabled with no policies: only the service-role key
-- (used server-side by the Next.js API routes) can read or write these tables.
-- The public anon key can never reach this data, by design (see docs/the-search/vision.md).

create table if not exists the_search_criteria (
  id smallint primary key default 1 check (id = 1),
  titles text not null default '',
  location text not null default '',
  salary text not null default '',
  sources text not null default '',
  notes text not null default '',
  updated_at timestamptz not null default now()
);

insert into the_search_criteria (id)
values (1)
on conflict (id) do nothing;

create table if not exists the_search_applications (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  company text not null default '',
  role text not null default '',
  platform text not null default '',
  status text not null default 'Applied',
  contact text not null default '',
  contact_role text not null default '',
  last_touch date,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table the_search_criteria enable row level security;
alter table the_search_applications enable row level security;

-- service_role bypasses RLS policies, but still needs ordinary table grants —
-- these aren't applied automatically when tables are created via the SQL editor
-- (only when created through the dashboard's Table Editor UI).
grant select, insert, update, delete on the_search_criteria to service_role;
grant select, insert, update, delete on the_search_applications to service_role;

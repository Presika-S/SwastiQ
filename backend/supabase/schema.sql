-- SwastiQ relational schema. Apply in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists asha_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text unique,
  phone text,
  role text not null default 'asha' check (role in ('asha','admin')),
  ward text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists beneficiaries (
  id uuid primary key default gen_random_uuid(),
  asha_user_id uuid references asha_users(id),
  name text not null,
  age integer check (age is null or age between 0 and 120),
  dob date,
  gender text,
  phone text,
  address text,
  ward text,
  pregnancy_status text,
  risk_status text default 'none',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists visits (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id) on delete cascade,
  asha_user_id uuid references asha_users(id),
  visit_date date not null default current_date,
  visit_type text,
  observations text,
  symptoms text,
  measurements jsonb not null default '{}'::jsonb,
  transcript text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists followups (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id) on delete cascade,
  visit_id uuid references visits(id) on delete set null,
  asha_user_id uuid references asha_users(id),
  due_date date not null,
  reason text,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'pending' check (status in ('pending','completed','overdue','cancelled')),
  notes text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists vaccinations (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id) on delete cascade,
  asha_user_id uuid references asha_users(id),
  vaccine_name text not null,
  dose_number integer,
  due_date date,
  administered_date date,
  status text not null default 'pending' check (status in ('pending','completed','missed')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id) on delete cascade,
  asha_user_id uuid references asha_users(id),
  alert_type text,
  description text not null,
  severity text not null default 'review' check (severity in ('info','review','urgent')),
  status text not null default 'open' check (status in ('open','resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists maternal_records (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid unique not null references beneficiaries(id) on delete cascade,
  asha_user_id uuid references asha_users(id),
  pregnancy_registered date,
  expected_delivery_date date,
  gravida text,
  risk_factors text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists child_health_records (
  id uuid primary key default gen_random_uuid(),
  beneficiary_id uuid not null references beneficiaries(id) on delete cascade,
  asha_user_id uuid references asha_users(id),
  birth_date date,
  birth_weight numeric(5,2),
  current_weight numeric(5,2),
  height_cm numeric(5,2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  action text not null,
  table_name text,
  record_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists beneficiaries_owner_idx on beneficiaries(asha_user_id);
create index if not exists beneficiaries_name_idx on beneficiaries(name);
create index if not exists visits_beneficiary_date_idx on visits(beneficiary_id, visit_date desc);
create index if not exists visits_owner_date_idx on visits(asha_user_id, visit_date desc);
create index if not exists followups_owner_due_idx on followups(asha_user_id, due_date, status);
create index if not exists vaccinations_owner_due_idx on vaccinations(asha_user_id, due_date, status);
create index if not exists alerts_owner_status_idx on alerts(asha_user_id, status);

-- RLS is enabled. API uses authenticated user tokens and service role is server-only.
alter table asha_users enable row level security;
alter table beneficiaries enable row level security;
alter table visits enable row level security;
alter table followups enable row level security;
alter table vaccinations enable row level security;
alter table alerts enable row level security;
alter table maternal_records enable row level security;
alter table child_health_records enable row level security;
alter table audit_logs enable row level security;

-- Basic user profile access. More granular policies should be configured after assigning
-- authenticated users to asha_users and testing the role/ownership model.
create policy "Users can read own profile" on asha_users for select to authenticated using (auth_user_id = auth.uid());


-- Ownership policies for ASHA users. Admin-wide access is intentionally handled
-- through server-side authorization; these policies cover assigned-user access.
create policy "ASHA owns beneficiaries" on beneficiaries for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns visits" on visits for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns followups" on followups for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns vaccinations" on vaccinations for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns alerts" on alerts for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns maternal records" on maternal_records for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

create policy "ASHA owns child records" on child_health_records for all to authenticated
using (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()))
with check (asha_user_id in (select id from asha_users where auth_user_id = auth.uid()));

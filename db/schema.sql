create extension if not exists pgcrypto;

create table if not exists survey_submissions (
	id uuid primary key default gen_random_uuid(),
	name text not null unique,
	birth_date date,
	skipped_birth_date boolean not null default false,
	choice_answers jsonb not null,
	text_answers jsonb not null,
	winning_power_id text not null,
	created_at timestamptz not null default now()
);

create index if not exists survey_submissions_created_at_idx
	on survey_submissions (created_at);

create index if not exists survey_submissions_winning_power_id_idx
	on survey_submissions (winning_power_id);

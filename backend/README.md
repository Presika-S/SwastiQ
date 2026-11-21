# SwastiQ Backend

This is a separate backend folder for the SwastiQ project. It contains a Node.js Express REST API, Supabase client setup, authentication routes, beneficiary/visit/follow-up/vaccination/dashboard/alert APIs, and a database schema.

## Setup

1. Install Node.js 20+.
2. Create a Supabase project.
3. In Supabase SQL Editor, run `supabase/schema.sql`.
4. Copy `.env.example` to `.env` and enter the Supabase URL, anon key, and service-role key.
5. From this folder run `npm install`.
6. Run `npm start`.
7. Check `http://localhost:4000/health`.

## API

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/password-reset`
- `GET/POST /api/beneficiaries`
- `GET/PATCH/DELETE /api/beneficiaries/:id`
- `GET/POST /api/visits`
- `GET /api/visits/:id`
- `GET/POST /api/followups`
- `PATCH /api/followups/:id`
- `GET/POST /api/vaccinations`
- `PATCH /api/vaccinations/:id`
- `GET /api/dashboard`
- `GET/POST /api/alerts`
- `PATCH /api/alerts/:id`

Protected endpoints require `Authorization: Bearer <Supabase access token>`.

## Important integration status

This folder is an initial backend implementation. It is **not yet wired into the existing frontend**. The existing frontend currently uses local/browser state and its existing Vercel API functions. Frontend integration, full ownership policies, maternal/child record endpoints, end-to-end testing, and deployment configuration still need to be completed before production or real patient use.

## Security warning

Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or commit real credentials. The schema has RLS enabled, but production access policies must be completed and reviewed. Do not enter identifiable real patient information until authentication, ownership, privacy, and security have been tested.

# SwastiQ — Vercel deployment (no GitHub required)

SwastiQ is a static browser app with server-side API routes for Gnani Prisma speech-to-text and Gnani Timbre text-to-speech.

## Project structure

- `public/index.html` — cinematic SwastiQ landing page and language entry point
- `public/app.html` — multilingual ASHA dashboard, voice assistant, register, beneficiaries, alerts and follow-ups
- `api/stt.js` — microphone WAV audio → Gnani Prisma → transcript
- `api/tts.js` — text → Gnani Timbre → playable audio
- `api/status.js` — reports whether voice services are configured (never returns the API key)
- `api/state.js` — optional cloud backup when Upstash Redis environment variables are configured
- `local-server.js` — local development server for `http://localhost:8000`

## Deploy directly from your computer without GitHub

This project includes Vercel serverless API routes. Use the Vercel CLI deployment (not a static-only drag-and-drop host), so `/api/stt` and `/api/tts` are deployed too.

1. Install Node.js 20 or newer.
2. Extract this ZIP into a folder.
3. Open a terminal in that folder.
4. Run `npx vercel login` and complete the browser sign-in.
5. Run `npx vercel` and answer the setup questions:
   - Set up and deploy? **Y**
   - Which scope? Choose your Vercel account.
   - Link to existing project? **N** for a new project, or **Y** if you already created one.
   - Project name: `swastiq` (or your preferred name).
   - Directory: `./`
   - Framework preset: **Other**
   - Build command: leave blank / press Enter.
   - Output directory: leave blank / press Enter.
6. Before production deployment, add your Gnani key to the Vercel project:
   - Open Vercel Dashboard → your project → **Settings → Environment Variables**.
   - Name: `GNANI_API_KEY`
   - Value: paste your actual Gnani API key.
   - Select **Production** (also select Preview and Development if you will use those environments).
   - Save.
7. In the same project folder, run `npx vercel --prod`.
8. Open the public `https://your-project.vercel.app` URL. Allow microphone access when prompted. Microphone access requires HTTPS (Vercel provides HTTPS).

If you add or change the key after deployment, redeploy with `npx vercel --prod`.

## Local testing

1. Copy `.env.example` to `.env.local`.
2. Open `.env.local` and replace the placeholder with your real key:
   `GNANI_API_KEY=your_actual_key`
3. Run:
   `npm start`
4. Open `http://localhost:8000`.

Never share `.env.local`, commit it, or include a real API key in a ZIP uploaded publicly. `.gitignore` excludes local environment files.

## Vercel environment variables

Required:
- `GNANI_API_KEY` — the API key created in your Gnani dashboard.

Optional:
- `GNANI_STT_MODEL` — defaults to `prisma-v3.0`.
- `GNANI_TTS_MODEL` — defaults to `timbre-v2.5`.
- `GNANI_TTS_VOICE` — defaults to `Nalini`.
- `GNANI_TTS_LANG` — defaults to `en-IN`.

The same `GNANI_API_KEY` is used by the backend STT and TTS routes. It is never exposed to the browser. The browser calls only the same-origin `/api/stt` and `/api/tts` endpoints.

## Dashboard workflow and safety notes

- Visit categories drive the Voice Assistant's category-specific review preview.
- Register visit details and beneficiary profiles are opened from the saved local/cloud record IDs.
- Follow-up completion now requires visit observations and creates a linked visit-history record.
- Browser alert tones and browser notifications are local-device features. They do not send messages to a PHC.
- The PHC referral workflow records initiation, acknowledgement, patient-referred and case-closed states. A real PHC communication integration requires a configured, authorised messaging or referral service; the prototype does not claim delivery.
- Risk rules are decision-support prompts and must be reviewed against approved clinical protocols before real-world use.

## Notes

- The microphone records short WAV clips and sends them to `/api/stt`.
- The app stops a recording at approximately 28 seconds; the backend also enforces a request size limit.
- The browser microphone works on localhost and on HTTPS deployment URLs, not on an ordinary insecure HTTP public URL.
- `api/state.js` is optional. Without Upstash Redis environment variables, app data remains in that browser's local storage.
- Vercel serverless functions do not provide a persistent WebSocket server. This project uses REST for voice transcription and synthesis.


## Voice record and multilingual workflow updates

- The category-specific record preview now accepts manual field entry before or alongside voice capture. Manual edits are tracked separately so later speech extraction does not overwrite fields the worker corrected.
- The preview exposes editable category fields and retains the accumulated original transcript separately from the structured record.
- Field extraction includes conservative labelled parsing for age (including common English number words), weight, blood pressure, temperature, height, vaccination due date, date of birth, delivery date, symptoms and observations. Unclear or unsupported values still require worker review; this is not a clinical decision engine.
- Browser SpeechRecognition is used only for optional interim on-screen text when supported. The saved transcript remains the final result from the configured Gnani STT service.
- Recording has pause/resume controls where AudioContext suspension is supported. Text-to-speech is serialized into short chunks to avoid overlap and exposes pause/resume/stop/replay plus speed and volume controls.
- Alert and PHC referral labels and the built-in danger-rule descriptions have translations for Tamil, Hindi, Telugu, Kannada, Malayalam, Marathi and Gujarati. Arbitrary free-text observations and PHC instructions authored by a worker are preserved as entered; no translation provider is configured for those arbitrary strings, so they are not automatically translated.
- Audio is processed for transcription but is not retained as a separate original-audio file by this project.

## Automatic same-language voice replies

Main voice recordings are sent to Gnani STT using the language selected in the Voice Assistant / global Language Door. SwastiQ uses the configured language code for read-back, localized visit-type wording, and Gnani Timbre text-to-speech. The shipped language selector includes Tamil, Hindi, Telugu, Kannada, Malayalam, Marathi, Gujarati, and English. The language is captured when recording starts, so changing the global language during an active recording does not change that recording's STT language.


## UI and voice localization enhancement
- The dashboard now places the existing welcome panel and Community Pulse side-by-side on wider screens, with the statistics retained below and the existing navigation/actions preserved.
- Beneficiary profile and history views, visit details, and follow-up completion dialogs use a fixed viewport-centred native dialog with responsive internal scrolling, backdrop blur, entrance/exit transitions, and reduced-motion support.
- Visit-category labels and all 68 category-specific field labels are localized for Tamil, Telugu, Malayalam, Kannada, Hindi, Marathi, and Gujarati. Category names, selection guidance, preview headings/placeholders, and safety prompts also follow the Voice Assistant language selector. English remains the source language; other app languages without a completed category translation fall back to English rather than showing misleading partial translations.
- Language/category changes rerender the voice interface while retaining the selected category and voice-session state.

## Sign-in flow

`/` (login) → `/landing.html` → `/app.html`. Pages and the voice APIs check a signed login cookie.
Set `ASHA_USERS`, `SESSION_SECRET` (and optionally `GOOGLE_CLIENT_ID`, `X_CLIENT_ID`, `X_CLIENT_SECRET`, `ASHA_ALLOWED`) in Vercel Environment Variables. See `.env.example`.
Without `ASHA_USERS` the app runs in demo mode: any name with a 6+ character password signs in.

## PHC referrals and alerts (added)
- ASHA worker: Alerts page -> "Mark referral initiated" sends the referral to `/api/referrals`. The app checks every 15 s and
  updates the alert when the PHC acknowledges, sends instructions or schedules a follow-up (which is added to Follow-ups).
- PHC staff: sign in with a name listed in `PHC_USERS` -> "PHC Referrals". New referrals beep 3 times.
- All alert levels beep exactly 3 times (see `playRiskSound`). The bell button opens a notifications panel.
- Vercel: set `SESSION_SECRET`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `PHC_USERS`, `GNANI_API_KEY`, then redeploy.


## Separate backend folder

A starter REST backend is included in `backend/`. See `backend/README.md` for setup, Supabase schema, API endpoints, and integration status.


## Verification performed for this update

- JavaScript syntax validation passed for the embedded application script and the STT/TTS serverless routes.
- Focused extraction test passed for the supplied example: age `2 y`, weight `10`, vaccination due `2026-11-25`, and next visit `2026-12-04`.
- Local smoke test returned HTTP 200 for `/app.html` and `/api/status`.
- Live microphone/STT/TTS calls could not be exercised in this environment because they require a browser microphone, a valid authenticated session, and a configured `GNANI_API_KEY`. Real regional-accent accuracy and device-specific voices must be validated on target devices before clinical deployment.

# AGENTS.md — Portfolio Website Rules

## 1. Project Overview
- Static engineering portfolio showcasing backend and systems engineering work (Python/FastAPI, PostgreSQL, Docker, C/C++).
- Prioritize technical clarity, architectural depth (system design, trade-offs, performance), fast load times, and clean scannability over decorative gimmicks.

## 2. Stack & File Structure
- Core stack: semantic **HTML**, **CSS**, and **vanilla JavaScript** deployed as a static site (Netlify).
- Key paths:
  - `index.html` — main markup
  - `css/` — stylesheets and theme variables
  - `js/` — client-side interactivity
  - `assets/` — images and documents (including `assets/documents/Sipo_Mudenda_Resume.pdf`)
  - `live_server.py` — local development preview server
- **Do not** introduce React, heavy frontend frameworks, or unnecessary npm/Python dependencies unless explicitly requested.

## 3. Design & Aesthetic Guardrails
- Direction: **restrained, modern terminal/systems aesthetic**—clean, classy, and high-contrast.
- Typography: pair a readable sans-serif for body copy with monospace strictly for technical metadata, commands, endpoints, tags, and architecture labels.
- Color & Themes: support both **dark and light modes** cleanly with accessible text contrast (especially over hero/banner backgrounds). Use subtle accents rather than harsh neon or gimmicky animations (no Matrix rain, no CLI-only navigation traps).
- Responsive: every change must hold up on both desktop and mobile viewports.

## 4. Scope, Verification & Workflow
- Keep edits strictly scoped to the current prompt; do not refactor unrelated sections, rename assets, or rewrite working code without being asked.
- Verify all relative asset paths (especially the resume PDF link under `assets/documents/`) and ensure external links use `target="_blank" rel="noopener noreferrer"` where appropriate.
- When making changes, summarize every modified file and explain *what* changed and *why*.
- Never commit or stage changes automatically unless explicitly instructed.

## 5. Privacy, Confidentiality & Repo Hygiene
- Never read, print, reference, or commit `.env`, `.venv/`, `node_modules/`, credentials, API keys, or local filesystem paths.
- Keep unreleased or confidential project details strictly out of the site (do not reference or expose details about private/stealth projects unless explicitly provided in a prompt).
- Keep all code, comments, and copy sanitized and free of personal machine identifiers.

## Public Positioning & Content Rules
- **Identity:** Backend & Systems Engineer (Python, FastAPI, Django, PostgreSQL, Docker, C, C++20, Unreal Engine 5).
- **Location & Availability:** Lusaka, Zambia (UTC+2, full overlap with European business hours). Open to remote work (contract or EOR) and relocation.
- **Tone & Evidence:** Lead with concrete engineering mechanisms (e.g., JWT refresh-token blacklisting, RAII with `std::unique_ptr`, GDPR secret-key deletion flow) rather than vague buzzwords, generic superlatives, or unverified compliance/architecture claims.
- **Content Scope:** Reference only verified public repositories (`github.com/JojoBaPb`) and claims directly backed by public code. Do not invent metrics, live demo URLs, or unverified credentials.
- **Featured Projects (2 tracks — `backend` and `systems`):**
  1. Nexus Job Board API (backend) — DRF, PostgreSQL, JWT refresh-token blacklisting, RBAC, OpenAPI.
  2. Async URL Shortener (backend) — FastAPI, SQLAlchemy 2.0, asyncpg, PostgreSQL, GDPR secret-key deletion flow.
  3. GraphQL CRM (backend) — Django, GraphQL, Celery, cron jobs.
  4. C++20 Card Battle Engine (systems) — State pattern, `std::unique_ptr` ownership, `std::function` lambdas, CMake.
  5. UE5 Cinematic Camera State Machine (systems) — C++ FSM (`EMenuStates`), Blueprint `TMap`, `VInterpTo`/`RInterpTo`.
  6. C Systems Projects (systems) — `simple_shell` (pair project), `monty` bytecode interpreter, `printf`.
- **Modal Structure:** Every project modal must include: one-line pitch, "What it demonstrates" bullets, "Key design decision", stack tags, GitHub link, and `liveDemo` only if genuinely live (otherwise `null`).

PROJECT TREE — mattermost (concise, depth 3)

Root files:
- CHANGELOG.md
- CODEOWNERS
- CONTRIBUTING.md
- README.md
- SECURITY.md
- LICENSE.txt
- LICENSE.enterprise
- NOTICE.txt

Top-level directories (depth 1 -> depth 2 -> depth 3 highlights):

- api/
  - playbooks/ (extract.js, merge-definitions.js, merge-tags.js, tags.yaml)
  - v4/
    - html/
    - source/ (many API YAML definitions)
  - server/ (Go server entry, go.mod)

- e2e-tests/
  - cypress/ (cypress.config.ts, tests/, utils/, Dockerfile.webhook)
  - playwright/ (global_setup.ts, package.json, lib/, specs/, sample.env)

- server/
  - cmd/ (mattermost, mmctl)
  - build/ (Dockerfiles, docker-compose templates, entrypoint.sh)
  - channels/ (app/, api4/, db/, jobs/, store/, utils/, web/)
  - config/ (configuration code and migrations)
  - scripts/ (build/test helpers)

- webapp/
  - channels/
    - src/
      - components/ (UI components)
      - actions/
      - reducers/
      - selectors/
      - i18n/ (many language JSON files)
      - images/ (icons, emoji sets)
      - sass/ (stylesheets)
    - patches/
    - platform/
  - package.json, Makefile, README.md

- enterprise/ (enterprise-specific code)
- fips/ (FIPS build variants)
- platform/ (platform utilities)
- public/ (static assets)
- templates/ (server/web templates)
- fonts/ (font files)
- i18n/ (global translations)
- scripts/ (top-level utilities)
- tests/ (project tests and test helpers)
- tools/ (mmgotool and dev utilities)

Notable subtrees and files (examples):
- server/channels/app/password/hashers/ (bcrypt, pbkdf2, phcparser)
- server/config/migrations/ (sql migration files for MySQL/Postgres)
- api/v4/source/ (users.yaml, posts.yaml, webhooks.yaml, permissions.yaml, etc.)
- webapp/channels/src/i18n/ (en.json, fr.json, zh-CN.json, many locales)
- e2e-tests/playwright/lib/ (test harness, server mock)
- webapp/channels/src/components/ (global_header, user_settings, widgets, menus)

Counts & notes:
- Repo contains a large webapp (React/TypeScript), Go server, API definitions, and multiple E2E test suites.
- Many static assets (emoji, images, fonts) under `webapp/channels/src/images` and `webapp/channels/src/fonts`.

If you want a deeper tree (depth 4), a JSON export, or a file with per-folder file counts, tell me which format and depth and I'll update `PROJECT_TREE.md` accordingly.

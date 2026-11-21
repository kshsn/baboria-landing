# baboria-landing

The live `baboria.com` site is the static page in [`site/`](site/) (single `index.html`, no build step, no JavaScript).
It is served by nginx from `/var/www/baboria-landing` on the VPS: copy the contents of `site/` there to deploy.

- Bilingual (EN / AR, RTL) and dark / light themes are pure CSS toggles.
- Brand mark and wordmark follow BBR-GDL-001 (Morse "B" dash + three dots, Montserrat Light, 0.3em tracking).
- Contact CTA links to `info@baboria.com`.

The previous React/Vite version (dark navy/orange design) is kept at the repo root (`src/`, `public/`, `index.html`) for reference and rollback. It is no longer deployed.
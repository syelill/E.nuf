# E.NUF — Artist Portfolio

A single-page portfolio site for the artist **Eunice Hannah Lim ("1 is E.nuf")**.

## Tech

This is a **static site** — no build step. It loads React and Babel from a CDN
and transpiles the JSX (`*.jsx`) files in the browser at runtime. There is no
bundler, no `package.json`, and nothing to compile.

```
index.html              → entry point (identical shell to "E.NUF Portfolio.html")
E.NUF Portfolio.html     → original working file (kept for the editor)
styles.css               → all styling
*.jsx                    → React views (loaded via <script type="text/babel">)
assets/                  → images + CV PDF
```

## Deploying to Vercel

Because there is no build, deploy it as a plain static project.

**Project Settings → Build & Development Settings:**

| Setting            | Value          |
| ------------------ | -------------- |
| Framework Preset   | **Other**      |
| Build Command      | *(leave empty)* |
| Output Directory   | `.` (root)     |
| Install Command    | *(leave empty)* |

These are also pinned in [`vercel.json`](./vercel.json), so a fresh import will
pick them up automatically — just click **Deploy**.

The root URL (`/`) serves `index.html`. There is no server code — the whole
site is static files.

### Contact form (EmailJS, sent straight from the browser)

The form sends through [EmailJS](https://www.emailjs.com) — no serverless
function, no API key on a server, nothing to configure in Vercel.

IDs live at the top of `contact.jsx`:

| Value       | ID                  |
| ----------- | ------------------- |
| Public key  | `bedY2xBo31niInqLw` |
| Service     | `service_07eht8l`   |
| Template    | `template_4rgw3yl`  |

The template expects these variables: `from_name`, `reply_to`,
`enquiry_type`, `message`. The SDK is loaded in `index.html` before the
views. If a send fails, the form shows the error and asks people to email
hello@eunicehannah.com directly.

### Custom domain (www.eunicehannah.com)

In Vercel: **Project Settings → Domains** → add `www.eunicehannah.com` →
follow the CNAME (or A record) instructions Vercel shows for your registrar.
No code changes needed; the API route and static files work under any domain.

### Local preview

Any static file server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server
```

Then open `http://localhost:3000` (or `:8000`).

## Note on production

The in-browser Babel transform prints a console warning and adds a small
runtime cost. It works fine for a portfolio, but if you ever want faster loads
you can precompile the JSX with a bundler (Vite) — without changing any of the
visual design. Not required to deploy.

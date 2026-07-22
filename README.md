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
api/contact.js           → Vercel serverless function that emails contact-form submissions
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

The root URL (`/`) serves `index.html`. The `api/contact.js` serverless
function deploys automatically alongside the static files — no extra config
needed, it just needs the environment variable below.

### Contact form (emails you the submissions, no database)

The form posts to `/api/contact`, a small Vercel serverless function that
sends the message to `hello@eunicehannah.com` via [Resend](https://resend.com)
(free tier is enough for a portfolio's volume).

1. Sign up at resend.com and create an API key.
2. In Vercel: **Project Settings → Environment Variables** → add
   `RESEND_API_KEY` = your key.
3. Redeploy. Submissions arrive by email; the sender defaults to Resend's
   shared `onboarding@resend.dev` address until you verify your own domain
   with Resend (optional — add `eunicehannah.com` in their Domains tab and
   point the DNS records they give you).

If `RESEND_API_KEY` is missing, the form shows a friendly error asking people
to email you directly — the site still works, it just won't auto-send.

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

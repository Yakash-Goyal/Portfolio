# Yakash Goyal — Portfolio

React + Vite + GSAP. All text, projects and links live in **`src/data/content.js`**.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build
```

The finished site goes into `dist/`.

## Deploy on Vercel

**Option A (fastest, no GitHub needed):** run this inside this folder, log in when it asks, and accept the defaults:

```bash
npx vercel --prod
```

**Option B (redeploys automatically on every push):** push this folder to a new GitHub repository, then in Vercel choose *Add New → Project → Import* that repository. Vercel detects Vite by itself.

**Your domain:** in the Vercel project, open *Settings → Domains*, add your domain, and copy the DNS records it shows into your domain registrar.

## Where things are

| What | File |
|---|---|
| Text, projects, links, email | `src/data/content.js` |
| Colours, fonts, layout | `src/styles/global.css` |
| Each section | `src/components/*.jsx` |
| Drawn project mockups | `src/lib/covers.js` |

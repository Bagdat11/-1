# QazTU — Student Information System

Frontend demo for QazTU (login + admin dashboard): React, Vite, TypeScript, Tailwind CSS.

**Repository:** [github.com/Bagdat11/-1](https://github.com/Bagdat11/-1)

**Live demo (GitHub Pages):** [bagdat11.github.io/-1](https://bagdat11.github.io/-1/)

## Quick start

```bash
git clone https://github.com/Bagdat11/-1.git
cd -1
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Demo login

| Field | Value |
|-------|--------|
| Username | `admin` |
| Password | `admin123` |

Alternative: any username with password `password`.

## Features

- Split-screen login (EN / RU / KZ)
- Admin dashboard with charts (Recharts)
- Sidebar navigation: Users, Students, Teachers, Faculties, and more
- Mock data with search and pagination on list pages
- Responsive layout (mobile sidebar drawer)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## GitHub Pages

On push to `main`, [GitHub Actions](.github/workflows/deploy.yml) builds and deploys the app. Enable **Settings → Pages → Source: GitHub Actions** if the site does not appear after the first deploy.

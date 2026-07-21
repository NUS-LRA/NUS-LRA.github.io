# NUS Learning and Reasoning Agent Group (LRA)

Website for the Learning and Reasoning Agent Group (LRA) at the Department of
Computer Science, School of Computing, National University of Singapore.

It is a static single-page site built with **React**, **Vite**, and
**Tailwind CSS**, with sections for Home, Research, People, and Contact.

## Development

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

## Build

```bash
npm run build      # output static files to dist/
npm run preview    # preview the production build locally
```

## Editing content

All site content lives in [`src/data.ts`](src/data.ts):

- `LAB_INFO` — group name, affiliation, and contact details
- `RESEARCH` — research highlights (each renders as a card; set
  `mediaType: "video"` to use a video/gif instead of an image)
- `MEMBERS` — current members and alumni

Research figures and videos live in
[`public/research/`](public/research) — collaborators can drop their own
images/videos there and reference them from `RESEARCH`. See
[`public/research/README.md`](public/research/README.md) for a step-by-step
guide.

The logo and icons are in [`public/`](public) (`logo.webp`, `favicon.png`,
`apple-touch-icon.png`).

## Deployment (GitHub Pages)

Deployment is automated with GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. In the repository, go to **Settings → Pages** and set the source to
   **GitHub Actions**.
2. Push to the `main` branch. The workflow builds the site and publishes it.

The Vite `base` is set to `./` (relative) so the site works whether it is
served from a user/org root page or a project page.

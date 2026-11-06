# Doan Van Tai — Research & Engineering

A personal academic and engineering portfolio built with **Astro 7**, **Tailwind CSS 4**, Markdown, and structured TypeScript data. Static output, no backend, no analytics, and locally bundled fonts.

Maintainer: **Doan Van Tai**. Intended URL: **https://vantai13.github.io/**.

## Run locally

Requires Node.js 24 and npm.

```bash
npm ci
npm run dev
```

For a production preview:

```bash
npm run check
npm run build
npm run preview
```

## Edit the content

| Content | File |
| --- | --- |
| Identity, contact, skills, experience | `src/data/profile.ts` |
| Research and project case studies | `src/data/work.ts` |
| Homepage composition | `src/pages/index.astro` |
| About | `src/pages/about.astro` |
| Public CV | `src/pages/cv.astro` |
| Writing | `src/pages/writing/*.md` |
| Colors, typography, responsive layout | `src/styles/global.css` |
| Shared navigation and SEO | `src/layouts/BaseLayout.astro` |
| Images | `public/images/` |

The first two writing pieces are draft explanatory notes adapted from existing project documentation, dated 6 November 2026. They are not publications. Publication, LinkedIn, Scholar, and ORCID sections are intentionally absent until real entries are supplied. Roles requiring confirmation are excluded from both the website and this public source tree.

Light mode is the default. The theme toggle persists the visitor's choice in browser local storage. The public CV contains no phone number or student identifier.

## Regenerate the public PDF

Install a Playwright Chromium browser when one is not already available:

```bash
npx playwright install chromium
```

With the production preview running on port 4321:

```bash
npm run cv:pdf
npm run build
```

The PDF is generated from the print stylesheet of `/cv/`, and is committed at `public/files/DoanVanTai_CV.pdf`. Regenerate it after editing the CV page. `PREVIEW_URL` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can override the defaults.

## Browser checks

With the production preview running:

```bash
npm run test:e2e
```

Checks cover navigation, theme persistence, mobile menu, work filtering, internal links, images, CV availability, responsive overflow, and automated WCAG A/AA rules on representative templates. Screenshots and JSON results go to the ignored `logs/` directory. Automated checks do not replace a full manual accessibility review.

## Deployment

This repository currently uses **Settings → Pages → Deploy from a branch → main → /(root)**. A `.nojekyll` marker lets GitHub serve the prebuilt Astro output directly. The editable source stays in `src/`; generated HTML and assets are committed in the repository root.

After editing content or styles:

```bash
npm run pages:prepare
npm run pages:check
git add .
git commit -m "Update portfolio"
git push origin main
```

`pages:prepare` checks types, builds the static site, and copies the generated output to the publishing root. `.pages-artifacts.json` records generated files so stale build artifacts can be removed on later builds. Changes to the source alone must be rebuilt before publication. GitHub's Pages workflow then publishes the committed static files.

The original deployment attempt could not change Pages to a custom Actions workflow because the available personal access token lacks the required settings access. This branch-based setup works with the repository's existing Pages configuration.

To move to a custom domain, update `site` in `astro.config.mjs` or set the `SITE_URL` build environment variable, configure the domain in GitHub Pages, and add the appropriate DNS records. Canonical URLs and the generated sitemap use that site setting.

## Evidence and asset provenance

Project claims are based on the owner's CV, supplied content, and project repositories. Completed experiments, repository-reported implementation details, and ongoing research are distinguished in the case studies. No new research experiment is implied by this website build.

- `tai-sunset.jpg`: photograph supplied by Doan Van Tai for this website; copied without image generation or retouching.
- `dt4n-dashboard.png`, `dt4n-architecture.png`: original figures from [DT4N](https://github.com/vantai13/dt4n-core), `docs/hinh/`.
- `eks-architecture.png`, `gitops-pipeline.png`: original diagrams from the [NT548 team project](https://github.com/Devop-Projects/NT548-DevOps), `docs/architecture/diagrams/`. Team attribution is preserved.
- Inline network diagrams are conceptual illustrations, explicitly labeled; they are not measured charts.
- DM Sans and Newsreader fonts are supplied by Fontsource packages with their original font licensing retained in those packages.

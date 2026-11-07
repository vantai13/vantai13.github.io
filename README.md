# Doan Van Tai — Research & Engineering

A personal academic and engineering portfolio built with **Astro 7**, **Tailwind CSS 4**, Markdown, and structured TypeScript data. Static output, no backend, no analytics, and locally bundled fonts.

Maintainer: **Doan Van Tai**. Website: **https://taidv.id.vn/**.

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
| Research overview | `src/pages/research.astro` |
| Engineering projects | `src/pages/projects.astro` |
| Experience and education | `src/pages/experience.astro` |
| Public CV | `src/pages/cv.astro` |
| Writing | `src/pages/writing/*.md` |
| Colors, typography, responsive layout | `src/styles/global.css` |
| Shared navigation and SEO | `src/layouts/BaseLayout.astro` |
| Main menu destinations | `src/data/navigation.ts` |
| Images | `public/images/` |

The three writing pieces are draft explanatory notes adapted from existing project documentation, dated 6 November 2026. They are not publications. Publication, LinkedIn, Scholar, and ORCID sections are intentionally absent until real entries are supplied. Roles requiring confirmation are excluded from both the website and this public source tree.

The owner confirmed the Research Intern role at UIT InSecLab, beginning November 2026, on 7 November 2026. Its AI for Security activities are described as current learning and exploratory work, separately from the DT4N and State–Model–Regret studies. The role is shared by the experience timeline, About page, and CV through `labExperience` in `src/data/profile.ts`. No lab advisor, publication, research outcome, or credential verification URL is inferred.

Light mode is the default. The theme toggle persists the visitor's choice in browser local storage. The public CV contains no phone number or student identifier.

## Page structure

The main menu opens dedicated pages: Home, About, Research, Projects, Experience, Writing, and CV. Homepage sections remain short previews. The original homepage anchor URLs still work for existing links.

The homepage introduces the person, project purpose, and role. Experiment metrics stay in the case studies and CV, with their context and limitations. The Research overview includes a short Network Digital Twin explanation before the research question. The main personal tagline is retained; ordinary headings use plain labels without trailing full stops.

Research and engineering projects share data in `src/data/work.ts`; each entry has an explicit `kind` field. `ProjectCard.astro` renders collection cards, and `ExperienceTimeline.astro` supplies the full experience timeline and its shorter homepage version. Case studies retain their `/work/<slug>/` URLs and link back to the corresponding Research or Projects overview.

`/work/` remains a combined archive. Its filter is stored in the URL and follows browser Back/Forward. The main menu marks the current page or case-study section. Mobile navigation supports keyboard focus, Escape, closing on outside interaction, and short landscape screens.

The featured DT4N card uses `DT4NQuantumCard.astro` and the reusable `NetworkTwinVisual.astro` illustration. Two network layers and moving signals depict synchronization and control. This is a conceptual illustration, with no connection to live telemetry. Motion can be paused, respects reduced motion, and stops outside the viewport or in a hidden tab. Without JavaScript it stays static. The personal photo remains on Home and About.

CV screen spacing is defined between sections and entries rather than through heading `:first-child` margins. Print spacing is defined separately so the generated CV remains one A4 page. Displayed dates and role labels use words, commas, or parentheses in place of long dashes; the project name is displayed as `State-Model-Regret` without changing its URL or scientific content.

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

Checks cover desktop and mobile page navigation, active states, breadcrumbs, direct visits, refresh, browser history, keyboard focus, theme persistence, work filters, internal links, images, diagram captions, CV availability, responsive overflow, sitemap/social metadata, and automated WCAG A/AA rules on representative templates. Screenshots and JSON results go to the ignored `logs/` directory. Automated checks do not replace a full manual accessibility review.

## Deployment

This repository uses **Settings → Pages → Source → GitHub Actions**. The workflow at `.github/workflows/deploy.yml` installs dependencies with Node.js 24, checks types, builds Astro, uploads `dist/`, and deploys it to GitHub Pages. It runs after a push to `main` and can also be started from the Actions tab.

After editing content or styles:

```bash
npm run pages:prepare
npm run pages:check
git add .
git commit -m "Update portfolio"
git push origin main
```

`pages:prepare` checks types, builds the static site, and keeps the existing generated files in the repository root synchronized with the source. `.pages-artifacts.json` records those files so stale artifacts can be removed on later builds. The Actions workflow builds independently and publishes only `dist/`.

The Source setting was changed to GitHub Actions by the repository owner. To inspect a publication, open the **Deploy portfolio to GitHub Pages** workflow in the Actions tab. A successful source push alone does not confirm that deployment has completed.

The manual `.github/workflows/recover-pages.yml` workflow can cancel a stalled Pages deployment by its ID. Use it only after confirming the ID of the blocked deployment; it is not part of the normal publishing process.

Canonical URLs and the sitemap read the domain from the repository's `CNAME` file, falling back to `https://vantai13.github.io`. The `SITE_URL` build environment variable can override that setting. When changing domains, update `CNAME`, configure the domain in GitHub Pages and DNS, then rebuild with `npm run pages:prepare`.

## Evidence and asset provenance

Project claims are based on the owner's CV, supplied content, and project repositories. Completed experiments, repository-reported implementation details, and ongoing research are distinguished in the case studies. No new research experiment is implied by this website build.

- `tai-sunset.jpg`: photograph supplied by Doan Van Tai for this website; copied without image generation or retouching.
- `dt4n-dashboard.png`, `dt4n-architecture.png`: original figures from [DT4N](https://github.com/vantai13/dt4n-core), `docs/hinh/`.
- `eks-architecture.png`, `gitops-pipeline.png`: original diagrams from the [NT548 team project](https://github.com/Devop-Projects/NT548-DevOps), `docs/architecture/diagrams/`. Team attribution is preserved.
- Inline network diagrams are conceptual illustrations, explicitly labeled; they are not measured charts.
- DM Sans and Newsreader fonts are supplied by Fontsource packages with their original font licensing retained in those packages.

# Kunal Wagh — portfolio

A Next.js portfolio built from the visual direction in `site-art-dicrection.md` and the project details in `content.md`.

## Run locally

Requirements: Node.js 20.9 or later and npm.

```sh
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Available commands

```sh
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm test            # Vitest unit tests
npm run test:e2e    # Playwright browser tests
```

Vitest and Playwright are configured for the planned checks. Test cases have not been added yet.

## Structure

- `src/app` — App Router pages, metadata, and global styles.
- `src/components` — shared navigation, project previews, and canvas/motion details.
- `src/content/*.mdx` — project case studies.
- `src/lib/projects.ts` — typed project summary data used by the home page and routes.

The canvas is decorative and has a CSS background behind it. The project preview panels are authored in HTML/CSS, so the initial site does not depend on unprovided screenshots or artwork. Aseprite/LibreSprite is not needed at runtime.

## Content follow-up

The MeM repository README was unavailable while this site was created. Its case study uses details from the existing portfolio content and should be checked against the repository when its README is available.

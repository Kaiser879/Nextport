# Portfolio site implementation plan

## Goal

Build a responsive, cinematic portfolio from the visual direction in [`site-art-dicrection.md`](./site-art-dicrection.md). The site should present the owner and selected work clearly, support detailed project case studies, and feel atmospheric without sacrificing readability, accessibility, or performance.

## Proposed stack

- **Next.js + React + TypeScript:** app framework, routing, reusable UI, and typed project data.
- **Tailwind CSS:** responsive layout, design tokens, and component styling.
- **Motion:** small interface transitions and accessible state changes.
- **GSAP:** a few deliberate, timeline-based sequences where scroll or layered transitions add real value. Avoid animating the same elements with both Motion and GSAP.
- **HTML Canvas API:** an optional, decorative hero atmosphere effect (for example, drifting particles or soft light). It must sit behind content and have a static CSS fallback.
- **MDX:** authored project case studies with reusable content components.
- **Aseprite or LibreSprite:** create or edit pixel-art accents and sprite assets only if the portfolio needs them. Export web-ready formats; do not make the site depend on either editor at runtime. “Asprite” is interpreted as Aseprite.
- **Vitest:** unit and component-level checks.
- **Playwright:** browser-level checks for core pages and interactions.
- **npm:** package management and scripts.

## Design principles

1. Use a warm paper background, near-black text, muted teal atmosphere, and restrained ochre accents.
2. Let project imagery carry most of the visual impact; keep interface decoration fine and quiet.
3. Keep owner identity, selected work, and contact access clear in the first screen and throughout navigation.
4. Design mobile layouts intentionally, with readable text and a clear project sequence.
5. Honor reduced-motion preferences and keep essential content available without JavaScript or canvas effects.

## Information architecture

- **Home (`/`):** header, cinematic intro, selected work, brief about/capabilities section, contact callout, footer.
- **Project detail (`/work/[slug]`):** title and metadata, project summary, role and contribution, visual case study content, related work, contact link.
- **Optional index (`/work`):** add only if the project list grows enough to benefit from a dedicated archive or filtering.

Use real project content and images when available. Do not invent client names, outcomes, metrics, or case-study details; use clearly marked draft content until supplied.

## Implementation phases

### Phase 1 — Repository and content discovery

- Inspect the existing repository, available assets, and any project-specific instructions before scaffolding.
- Confirm the site name, owner name/role, contact details, project list, and which assets can be published.
- Sort assets into a predictable public directory and record source/usage notes where needed.
- Decide whether Aseprite/LibreSprite pixel-art assets are part of the actual design; treat them as optional until useful.

**Deliverable:** content and asset inventory, plus a short list of missing information that blocks accurate portfolio copy.

### Phase 2 — App foundation

- Initialize or adapt the repository as a Next.js application using TypeScript and npm.
- Set up Tailwind CSS, global styles, lint/typecheck/build scripts, and the project folder structure.
- Define reusable color, typography, spacing, border, and motion tokens based on the art direction.
- Set document metadata, font loading, image handling, and a shared site shell.

**Deliverable:** running app shell with responsive header/footer and design tokens.

### Phase 3 — Static page structure

- Build the homepage sections in semantic React components: header, hero, selected projects, about/capabilities, contact, footer.
- Add the project detail route and a typed project content model.
- Author case studies in MDX with a small set of reusable components for image pairs, captions, pull quotes, and metadata.
- Add responsive image sizing, alt text, and intentional loading behavior.

**Deliverable:** complete, navigable pages using representative content and assets.

### Phase 4 — Visual refinement

- Apply the asymmetrical editorial compositions, open margins, thin rules, index labels, and restrained color system.
- Establish heading, body, and metadata scales and check contrast over both light and dark surfaces.
- Tune image crops and focal points at narrow, medium, and wide viewport sizes.
- Add the small graphic details (arcs, registration marks, texture) only where they support hierarchy.

**Deliverable:** responsive pages that match the visual brief without relying on motion for comprehension.

### Phase 5 — Motion and canvas enhancement

- Use Motion for small UI transitions such as navigation state, focus feedback, and light reveals.
- Use GSAP only for a limited number of page or scroll sequences that benefit from timeline control; scope and clean up animations on route changes.
- If useful, add a lightweight canvas layer to the hero. Keep it decorative, pause or reduce work when offscreen, handle resize/device-pixel-ratio safely, and provide a static fallback.
- Respect `prefers-reduced-motion`; disable or simplify nonessential animation and avoid scroll hijacking.

**Deliverable:** subtle, performant enhancements with equivalent static content and reduced-motion behavior.

### Phase 6 — Verification and polish

- Add Vitest checks for project data, content helpers, and reusable interactive components.
- Add Playwright coverage for homepage rendering, project navigation, contact links, responsive layouts, keyboard access, and reduced-motion behavior.
- Check heading order, landmarks, alt text, focus visibility, contrast, and link names.
- Verify empty/missing image handling and unknown project slugs.
- Run the production build and inspect representative mobile and desktop pages.

**Deliverable:** verified production build and documented run/check commands.

## Suggested project organization

```text
app/
  layout.tsx
  page.tsx
  work/[slug]/page.tsx
components/
  layout/
  home/
  projects/
  motion/
content/
  projects/*.mdx
lib/
  projects.ts
  mdx.ts
public/
  images/
  sprites/
  textures/
styles/
  globals.css
tests/
  unit/
  e2e/
```

Adjust this layout to the Next.js routing conventions and repository structure found during Phase 1.

## Acceptance criteria

- Home and project-detail pages communicate the portfolio owner, work, and contact route clearly.
- Layout adapts cleanly to mobile, tablet, and desktop widths without horizontal overflow.
- Project details are authored in MDX and resolve through typed project metadata and stable slugs.
- Visuals follow the paper/charcoal/teal palette with selective warm accents and generous negative space.
- Motion is subtle, keyboard-friendly, and reduced or removed when reduced motion is requested.
- Canvas is optional and decorative, with a useful fallback when unavailable or disabled.
- Key routes, navigation, contact links, and responsive behavior are covered by Vitest and Playwright checks.
- The app builds for production using npm.

## Scope controls and risks

- Use Motion and GSAP for distinct jobs; avoid duplicate animation ownership and broad scroll effects.
- Keep the canvas effect small and optional. Do not use it for text, navigation, or project information.
- Use MDX for editorial case-study bodies, not as a replacement for structured project metadata.
- Defer filtering, complex transitions, custom cursor effects, and elaborate shader work unless real content shows a need.
- Aseprite and LibreSprite are asset-authoring tools, not web runtime dependencies; include pixel art only if it supports the portfolio’s identity.
- Use the image assets currently in the repository only after confirming their intended role and publication rights.

## First implementation milestone

Complete repository discovery and content inventory, then scaffold the app foundation and implement the static homepage plus one real project detail page. Add animation and canvas only after the static pages are responsive and the content hierarchy is working.

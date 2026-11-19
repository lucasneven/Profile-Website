# Adding components

Three libraries, one command each. They all drop the source code into this project, so it's yours to edit.

## Aceternity UI

Find a component on [ui.aceternity.com](https://ui.aceternity.com/components). Its name is the end of the URL (`/components/bento-grid` → `bento-grid`). Then:

```bash
npm run add:ui -- bento-grid
```

It lands in `src/components/ui/`. Its demo uses Aceternity's own colors (neutral, slate, purple), so swap those classes for the site's: `bg-surface`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-accent`. That way it matches the site's colors.

## Magic UI

[magicui.design](https://magicui.design/docs/components) isn't covered by `add:ui`. Use the install command from the component's page, e.g.:

```bash
npx shadcn@latest add https://magicui.design/r/interactive-hover-button
```

It lands in `src/components/ui/` too. Swap `bg-primary` / `text-primary-foreground` for `bg-accent` / `text-accent-foreground`.

## React Bits

Find a component on [reactbits.dev](https://reactbits.dev). Its name is in the URL (`/text-animations/blur-text` → `BlurText`). Then:

```bash
npm run add:bit -- BlurText
```

That grabs the **TypeScript + Tailwind** version and puts it in `src/components/reactbits/`.

## Using one

```tsx
import { BentoGrid } from "@/components/ui/bento-grid";
import BlurText from "@/components/reactbits/BlurText";
```

`@/` means `src/`. Props are listed on each component's page. Real examples live in `src/components/site/`: `Sections.tsx` uses Timeline, Bento Grid, Card Hover Effect, Glowing Effect and Background Beams, and `Hero.tsx` uses Hero Highlight (the hover on the name), Interactive Hover Button (the "See what I've built" button), Spotlight New (the light beams), CountUp (`HeroStats.tsx`) and Dot Field (`HeroDots.tsx`).

## If something's off

- **"useState only works in Client Components"** (or similar): the file using it needs `"use client";` as its first line, or the component file itself does.
- **Build error about `Math.random()` or `new Date()`**: Next.js pre-renders the page, so random values must not change between the server and the browser. See the fix in `src/components/ui/background-beams.tsx` (`seeded`).
- **Missing package**: the command usually installs it; if not, `npm install <package>`. Already installed: `motion`, `gsap`, `@gsap/react`, `lucide-react`, `@tabler/icons-react`.
- **Already exists**: add `--overwrite` (replaces your edits). Add `--dry-run` to preview without writing files.
- **Reduced motion**: check the component respects it. Keep effects subtle; a few good ones beat a page full of them.

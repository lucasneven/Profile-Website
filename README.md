# Profile Website

Lucas Neven's personal site, built with Next.js, TypeScript, Tailwind CSS and Aceternity UI.

## Run it

```bash
npm install     # first time only
npm run dev     # open http://localhost:3000
```

The page updates as you save.

## Build it

```bash
npm run build   # production build (also checks types)
npm start       # serve that build locally
npm run lint    # check the code for mistakes
```

Deploys to [Vercel](https://vercel.com) with no extra setup: import the GitHub repo and click Deploy.

## Where things are

| To change... | Edit |
| --- | --- |
| Text: experience, projects, skills, interests | `src/lib/data.ts` |
| Icons used in that text | `src/lib/icons.ts` |
| Section order | `src/app/page.tsx` |
| A section's layout | `src/components/site/`, one file per section (`Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Leadership.tsx`, `Skills.tsx`, `Interests.tsx`, `NextUp.tsx`, `Footer.tsx`), plus `SiteNavbar.tsx` |
| Spacing between sections, section titles | `src/components/site/Section.tsx` |
| Photos and screenshots on the cards | Drop them in `src/assets/photos/`, named after their slot (list at the top of `src/lib/photos.ts`); they show up on their own |
| Colors (light and dark) | top of `src/app/globals.css` |
| Font, page title, description | `src/app/layout.tsx` |
| Dot background in the hero | `src/components/site/HeroDots.tsx` |
| Profile photo | `src/assets/profile-new.jpg` (the path is set at the top of `src/components/site/Hero.tsx`) |
| Favicon | `src/app/icon.svg` |
| Aceternity / React Bits components | `src/components/ui/`, `src/components/reactbits/` (see `COMPONENTS.md`) |

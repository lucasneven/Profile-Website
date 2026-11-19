# Adding React Bits components

[React Bits](https://reactbits.dev) is a library of animated React components. Adding one is one command.

## Add one

Find a component on reactbits.dev. Its name is in the URL (`/text-animations/blur-text` is `BlurText`). Then:

```bash
npm run add:bit -- BlurText
```

That grabs the **JS + CSS** version (this site has no TypeScript or Tailwind) and installs any npm packages it needs. Several at once works too: `npm run add:bit -- BlurText CountUp`.

Rather paste from the site? Set the Code tab to **JS** + **CSS** first, then paste its command:

```bash
npx shadcn@latest add @react-bits/BlurText-JS-CSS
```

## Where it lands

`src/components/reactbits/BlurText.jsx` (plus `BlurText.css` if it has styles). It's your code now, so edit it freely.

## Use it

```jsx
import BlurText from "@/components/reactbits/BlurText";

<BlurText text="Hello there" trigger="load" />
```

`@/` means `src/`. Props are listed on the component's page. Real example: the hero name in `src/components/Hero.jsx` uses `SplitText`.

## If something's off

- **It wants Tailwind** (`-TW` in the name, or lots of `className="flex ..."`): use the `-JS-CSS` variant instead. `add:bit` always picks it, even if you paste a `-TS-TW` name.
- **Missing package** (e.g. `three`, `matter-js`): the CLI usually installs it; if not, `npm install <package>`. Already installed: `gsap`, `@gsap/react`, `motion`.
- **Already exists**: add `--overwrite` (replaces your edits). Add `--dry-run` to preview any install without writing files.
- **Reduced motion**: check the component respects it (SplitText and BlurText do). Keep effects subtle and play them once.

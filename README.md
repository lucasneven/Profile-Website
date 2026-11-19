# Profile Website

Lucas Neven's personal site, built with React and Vite.

## Run it

```bash
npm install     # first time only
npm run dev     # open the link it prints (usually http://localhost:5173)
```

The page reloads by itself as you edit. Opening `index.html` directly won't work. Use the dev server.

## Build it

```bash
npm run build   # finished site goes to dist/
npm run preview # check the built version locally
```

`dist/` is plain HTML, CSS and JS, so it can go on any static host (Vercel, Netlify, GitHub Pages).

## Where things are

| To change... | Edit |
| --- | --- |
| Text: experience, projects, skills, interests | `src/data.js` |
| Page structure and section order | `src/App.jsx` |
| Nav, hero, section wrapper, icons | `src/components/` |
| Dot background behind the hero (colors, strength) | `src/components/HeroBackground.jsx` |
| Colors, fonts, layout | `src/style.css` (colors are at the top) |
| Profile photo | `src/assets/profile.jpg` |
| Favicon | `public/favicon.svg` |
| Animated components (React Bits) | `src/components/reactbits/` (see `REACT_BITS.md`) |

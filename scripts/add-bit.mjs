// Adds React Bits components (https://reactbits.dev) in the TypeScript + Tailwind flavor.
//
//   npm run add:bit -- BlurText
//   npm run add:bit -- BlurText ShinyText          (several at once)
//   npm run add:bit -- BlurText --overwrite        (replace an existing copy)
//
// Also accepts a name copied from the site, e.g. "@react-bits/SplitText-JS-CSS";
// the variant is always switched to TS-TW to match this project.
// Files land in src/components/reactbits/ and npm dependencies install automatically.
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("-"));
const names = args.filter((a) => !a.startsWith("-"));

if (names.length === 0) {
  console.log("Usage: npm run add:bit -- <ComponentName> [more names] [--overwrite]");
  console.log("Example: npm run add:bit -- BlurText");
  process.exit(1);
}

const items = names.map((raw) => {
  const base = raw.split("/").pop().replace(/\.json$/i, "");
  const variant = base.match(/-(JS|TS)-(CSS|TW)$/i);
  const name = variant ? base.slice(0, -variant[0].length) : base;
  if (variant && variant[0].toUpperCase() !== "-TS-TW") {
    console.log(`Note: using ${name}-TS-TW instead of ${base} (this site uses TypeScript + Tailwind).`);
  }
  return `@react-bits/${name}-TS-TW`;
});

console.log(`Adding ${items.join(", ")} ...`);
const result = spawnSync(
  "npx",
  ["--yes", "shadcn@latest", "add", ...items, "--yes", "--path", "src/components/reactbits", ...flags],
  { stdio: "inherit", shell: process.platform === "win32" },
);

if (result.status === 0 && !flags.includes("--dry-run")) {
  const first = items[0].replace("@react-bits/", "").replace(/-TS-TW$/, "");
  console.log(`\nDone. Use it in a component like:\n  import ${first} from "@/components/reactbits/${first}";`);
  console.log("Components with hooks or animation need to be used from a file that starts with \"use client\".");
}
process.exit(result.status ?? 1);

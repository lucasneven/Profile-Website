// Adds React Bits components (https://reactbits.dev) in the JS + plain CSS flavor.
//
//   npm run add:bit -- BlurText
//   npm run add:bit -- BlurText ShinyText          (several at once)
//   npm run add:bit -- BlurText --overwrite        (replace an existing copy)
//
// Also accepts a name copied from the site, e.g. "@react-bits/SplitText-TS-TW";
// the variant is always switched to JS-CSS because this site doesn't use TS or Tailwind.
// Files land in src/components/reactbits/ (<Name>.jsx, plus <Name>.css if it has one)
// and any npm dependencies install automatically.
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
  if (variant && variant[0].toUpperCase() !== "-JS-CSS") {
    console.log(`Note: using ${name}-JS-CSS instead of ${base} (this site is plain JS + CSS).`);
  }
  return `@react-bits/${name}-JS-CSS`;
});

console.log(`Adding ${items.join(", ")} ...`);
const result = spawnSync("npx", ["--yes", "shadcn@latest", "add", ...items, "--yes", ...flags], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.status === 0 && !flags.includes("--dry-run")) {
  console.log("\nDone. Import it like:");
  for (const item of items) {
    const name = item.replace("@react-bits/", "").replace(/-JS-CSS$/, "");
    console.log(`  import ${name} from "@/components/reactbits/${name}";`);
  }
}
process.exit(result.status ?? 1);

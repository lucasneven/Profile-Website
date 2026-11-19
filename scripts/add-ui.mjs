// Adds Aceternity UI components (https://ui.aceternity.com).
//
//   npm run add:ui -- bento-grid
//   npm run add:ui -- bento-grid spotlight-new      (several at once)
//   npm run add:ui -- bento-grid --overwrite        (replace an existing copy)
//
// The name is the last part of the component's URL:
// ui.aceternity.com/components/bento-grid -> bento-grid.
// Files land in src/components/ui/ and npm dependencies install automatically.
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("-"));
const names = args.filter((a) => !a.startsWith("-"));

if (names.length === 0) {
  console.log("Usage: npm run add:ui -- <component-name> [more names] [--overwrite]");
  console.log("Example: npm run add:ui -- bento-grid");
  process.exit(1);
}

const items = names.map((raw) => `@aceternity/${raw.split("/").pop().replace(/^@aceternity\//, "")}`);

console.log(`Adding ${items.join(", ")} ...`);
const result = spawnSync("npx", ["--yes", "shadcn@latest", "add", ...items, "--yes", ...flags], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.status === 0 && !flags.includes("--dry-run")) {
  console.log("\nDone. Files are in src/components/ui/. Import from \"@/components/ui/<name>\".");
  console.log("Their colors are Aceternity's defaults: swap neutral/slate/purple classes for the site's");
  console.log("(bg-surface, border-border, text-muted-foreground, text-accent) to match the theme.");
}
process.exit(result.status ?? 1);

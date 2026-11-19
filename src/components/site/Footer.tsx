// The footer: name, year and email.
import { profile } from "@/lib/data";

// The year is worked out once when the page is built ("use cache"), not on every visit
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          Made by {profile.name} · <Year />
        </p>
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}

// 07 What's next: the closing card, with Aceternity Background Beams behind it and a
// button that copies my email. The text is `nextUp` in src/lib/data.ts.
import { CopyEmailButton } from "@/components/site/CopyEmailButton";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { nextUp, profile } from "@/lib/data";

export function NextUp() {
  const [before, after] = nextUp.split("M.E.T.");
  return (
    <section id="next" className="mx-auto max-w-6xl px-6 pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 md:px-12 md:py-14">
        <BackgroundBeams className="opacity-70" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">07</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">What&apos;s next</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
            {before}
            {after !== undefined && (
              <>
                <abbr title="Management, Entrepreneurship & Technology">M.E.T.</abbr>
                {after}
              </>
            )}
          </p>
          <CopyEmailButton email={profile.email} className="mt-7" />
        </div>
      </div>
    </section>
  );
}

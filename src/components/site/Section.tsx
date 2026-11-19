import { Reveal } from "@/components/site/motion";
import { cn } from "@/lib/utils";

/**
 * A page section: its number and title on one line, followed by a thin rule, then
 * the content. Both fade in on scroll. Change the spacing between sections here (py-*).
 */
export function Section({
  id,
  number,
  title,
  children,
  className,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-8 md:py-12", className)}>
      <Reveal>
        <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight md:text-2xl">
          <span aria-hidden="true" className="text-xs font-semibold tracking-[0.2em] text-accent">
            {number}
          </span>
          {title}
          <span aria-hidden="true" className="ml-2 h-px flex-1 bg-border" />
        </h2>
      </Reveal>
      <Reveal className="mt-6 md:mt-8" delay={0.1}>
        {children}
      </Reveal>
    </section>
  );
}

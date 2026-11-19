// 05 Skills & coursework, in one panel: the skills drift by in a row (Aceternity
// Infinite Moving Cards; it slows to a stop while hovered), and the coursework sits
// underneath like a transcript. Both lists are in src/lib/data.ts (`skillGroups`,
// `coursework`); a coursework line is "Label: course, course, course".
import { Section } from "@/components/site/Section";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { coursework, skillGroups } from "@/lib/data";

export function Skills() {
  // Each group's name, then its skills
  const chips = skillGroups.flatMap((group) => [
    {
      key: group.title,
      node: (
        <span className="flex h-8 items-center gap-2 pr-1 pl-3 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          {group.title}
        </span>
      ),
    },
    ...group.items.map((skill) => ({
      key: `${group.title}-${skill}`,
      node: (
        <span className="flex h-8 items-center rounded-full border border-border bg-background px-3 text-sm whitespace-nowrap">
          {skill}
        </span>
      ),
    })),
  ]);

  const courses = coursework.map((line) => {
    const split = line.indexOf(": ");
    return split === -1
      ? { label: "", list: line.split(", ") }
      : { label: line.slice(0, split), list: line.slice(split + 2).split(", ") };
  });

  return (
    <Section id="skills" number="05" title="Skills & coursework">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <InfiniteMovingCards items={chips} speed={28} className="py-4 motion-reduce:px-4" />

        <dl className="border-t border-border">
          {courses.map(({ label, list }) => (
            <div
              key={label + list[0]}
              className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-6 md:px-5"
            >
              <dt className="text-xs font-medium tracking-wider text-muted-foreground uppercase md:pt-0.5">{label}</dt>
              <dd className="text-sm leading-relaxed">
                {list.map((course, i) => (
                  <span key={course}>
                    {i > 0 && (
                      <span aria-hidden="true" className="px-2 text-accent/60">
                        ·
                      </span>
                    )}
                    {course}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

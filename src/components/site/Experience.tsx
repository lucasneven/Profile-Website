// 02 Experience: Aceternity Timeline, a beam fills down the line as you scroll.
// The jobs are `experience` in src/lib/data.ts.
import { Section } from "@/components/site/Section";
import { Timeline } from "@/components/ui/timeline";
import { experience } from "@/lib/data";

export function Experience() {
  const data = experience.map((job) => ({
    title: job.title,
    content: (
      <div className="rounded-2xl border border-border bg-surface p-6">
        {/* The status tag sits above the role on phones and to its right on wider screens */}
        <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
          {job.status && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              {job.status}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{job.org}</p>
        <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">{job.date}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{job.text}</p>
      </div>
    ),
  }));

  return (
    <Section id="experience" number="02" title="Experience">
      <Timeline data={data} />
    </Section>
  );
}

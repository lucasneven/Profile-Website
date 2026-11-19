// 03 Projects: a stack of folders you click through (folder-stack.tsx, built from
// Aceternity Animated Testimonials). Each folder holds the project's screenshot, or
// its icon until there is one. The projects are `projects` in src/lib/data.ts;
// screenshots come from src/assets/photos/ (see src/lib/photos.ts).
import { MediaFill } from "@/components/site/MediaFill";
import { Section } from "@/components/site/Section";
import { FolderStack } from "@/components/ui/folder-stack";
import { projects } from "@/lib/data";
import { icons } from "@/lib/icons";
import { photo } from "@/lib/photos";

export function Projects() {
  const folders = projects.map((project) => {
    const media = photo(project.photo, project.photoAlt ?? `Screenshot of ${project.title}`, project.photoPosition);
    return {
      id: project.title,
      title: project.title,
      tag: project.tag,
      text: project.text,
      chips: project.stack?.split(" · "),
      media: media ? (
        <MediaFill media={media} sizes="(min-width: 1152px) 600px, (min-width: 768px) 52vw, 100vw" className="object-top" />
      ) : (
        <ProjectArt icon={project.icon} title={project.title} />
      ),
    };
  });

  return (
    <Section id="projects" number="03" title="Projects">
      <FolderStack items={folders} />
    </Section>
  );
}

/** Stand-in for a missing screenshot: the project's icon on a faint blueprint grid. */
function ProjectArt({ icon, title }: { icon: keyof typeof icons; title: string }) {
  const Icon = icons[icon];
  return (
    <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <span className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_60%)]" />
      <span className="relative grid size-20 place-items-center rounded-2xl border border-accent/30 bg-background text-accent shadow-[0_0_48px_-12px_var(--accent)] md:size-24">
        <Icon className="size-9 md:size-11" strokeWidth={1.5} />
      </span>
      <span className="absolute bottom-3 left-4 text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </span>
    </span>
  );
}

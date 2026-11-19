// 01 About: one big paragraph. The text is `profile.about` in src/lib/data.ts.
import { Section } from "@/components/site/Section";
import { profile } from "@/lib/data";

export function About() {
  return (
    <Section id="about" number="01" title="About me">
      <p className="max-w-3xl text-xl leading-relaxed text-foreground/90 md:text-2xl">{profile.about}</p>
    </Section>
  );
}

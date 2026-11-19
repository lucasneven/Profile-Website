// 01 About: one big paragraph. The text is `profile.about` in src/lib/data.ts.
// The words in `highlight` show in blue and get a marker-style wipe when the paragraph
// scrolls into view or one is hovered (SweepHighlight.tsx). Words not in the text are ignored.
import { Section } from "@/components/site/Section";
import { SweepHighlight } from "@/components/site/SweepHighlight";
import { profile } from "@/lib/data";

const highlight = ["building", "robots", "bouldering", "RS3"];

export function About() {
  return (
    <Section id="about" number="01" title="About me">
      <SweepHighlight
        text={profile.about}
        highlight={highlight}
        className="max-w-3xl text-xl leading-relaxed text-foreground/90 md:text-2xl"
      />
    </Section>
  );
}

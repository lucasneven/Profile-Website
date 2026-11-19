// 04 Leadership: compact rows that open into a card (Aceternity Expandable Card).
// The roles are `leadership` in src/lib/data.ts; a role's photo or video comes from
// src/assets/photos/ (see src/lib/photos.ts) and shows at the top of its open card.
import { MediaFill } from "@/components/site/MediaFill";
import { Section } from "@/components/site/Section";
import { ExpandableCardList } from "@/components/ui/expandable-card";
import { leadership } from "@/lib/data";
import { photo } from "@/lib/photos";

export function Leadership() {
  const items = leadership.map((role, i) => {
    const media = photo(role.photo, role.photoAlt ?? `${role.title}, ${role.sub ?? ""}`, role.photoPosition);
    return {
      id: `role-${i}`,
      title: role.title,
      sub: role.sub,
      text: role.text,
      icon: role.icon,
      media: media ? <MediaFill media={media} sizes="(min-width: 480px) 448px, 100vw" /> : undefined,
    };
  });

  return (
    <Section id="leadership" number="04" title="Leadership & activities">
      <ExpandableCardList items={items} className="-mx-3" />
    </Section>
  );
}

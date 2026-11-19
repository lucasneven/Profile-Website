// 06 Interests: a row of tall photo cards that slides along on its own and holds still
// while hovered or pressed (Aceternity Apple Cards Carousel). The cards are `interests`
// in src/lib/data.ts; photos come from src/assets/photos/ (see src/lib/photos.ts), and
// a card without one shows its icon. The Gym card carries the bench press widget.
import { BenchPress } from "@/components/site/BenchPress";
import { MediaFill } from "@/components/site/MediaFill";
import { Section } from "@/components/site/Section";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { interests } from "@/lib/data";
import { photo } from "@/lib/photos";

export function Interests() {
  const slides = interests.map((item, i) => {
    const media = photo(item.photo, item.photoAlt ?? `${item.title} photo`, item.photoPosition);
    return {
      key: item.title,
      label: item.title,
      node: (
        <Card
          title={item.title}
          text={item.text}
          icon={item.icon}
          caption={item.caption}
          index={i}
          media={media ? <MediaFill media={media} sizes="(min-width: 768px) 288px, 264px" /> : undefined}
        >
          {item.benchPress ? <BenchPress lb={item.benchPress} className="mt-4" /> : null}
        </Card>
      ),
    };
  });

  return (
    <Section id="interests" number="06" title="What I'm into">
      <Carousel slides={slides} label="Interests" />
    </Section>
  );
}

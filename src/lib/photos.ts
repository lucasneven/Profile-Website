// Photos (and short videos) for the cards live in src/assets/photos/. Name the file after
// its slot and it shows up on its own; there's no code to change. data.ts says which card
// uses which slot (the `photo` field), e.g. photo: "rs3" -> src/assets/photos/rs3.jpg.
//
//   Projects:   stackd, butterbot, nipei, kosik, this-website
//   Interests:  snowboarding, climbing, hiking, gym, rs3, travel, burning-man
//   Leadership: robotics, startup-team, asb, journalism
//
// Photos: .jpg, .jpeg, .png, .webp or .avif, lowercase extension (convert iPhone .heic
// to .jpg first). Videos: .mp4 (best) or .webm; they play muted on a loop while on
// screen. A photo with the same name as a video (robotics.jpg + robotics.mp4) becomes
// the video's still frame, shown before it plays and with reduced motion.
import type { StaticImageData } from "next/image";

export type Media =
  | { kind: "image"; src: StaticImageData; alt: string; position?: string }
  | { kind: "video"; src: string; poster?: StaticImageData; alt: string; position?: string };

const images = import.meta.glob<StaticImageData>(
  [
    "../assets/photos/*.jpg",
    "../assets/photos/*.jpeg",
    "../assets/photos/*.png",
    "../assets/photos/*.webp",
    "../assets/photos/*.avif",
  ],
  { eager: true, import: "default" },
);

// Imported as a URL (the rule for these is in next.config.ts)
const videos = import.meta.glob<string>(
  ["../assets/photos/*.mp4", "../assets/photos/*.webm", "../assets/photos/*.mov"],
  { eager: true, import: "default" },
);

/** "../assets/photos/burning-man.jpg" -> "burning-man" */
const slotName = (path: string) => (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "");

const imageBySlot = new Map(Object.entries(images).map(([path, image]) => [slotName(path), image]));
const videoBySlot = new Map(Object.entries(videos).map(([path, url]) => [slotName(path), url]));

/**
 * The photo or video for a slot, or undefined while its file hasn't been added yet.
 * `position` is the CSS object-position that keeps the subject in frame, e.g. "64% 50%".
 */
export function photo(slot: string | undefined, alt: string, position?: string): Media | undefined {
  if (!slot) return undefined;
  const image = imageBySlot.get(slot);
  const video = videoBySlot.get(slot);
  if (video) return { kind: "video", src: video, poster: image, alt, position };
  if (image) return { kind: "image", src: image, alt, position };
  return undefined;
}

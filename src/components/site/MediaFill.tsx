"use client";
// A card's photo or video (from src/assets/photos/, see src/lib/photos.ts), filling its
// parent, which needs `relative` and a size. Videos play muted on a loop, only while on
// screen, and stay on their still frame with reduced motion.
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media } from "@/lib/photos";
import { cn } from "@/lib/utils";

export function MediaFill({
  media,
  sizes,
  className,
}: {
  media: Media;
  /** How wide it shows, so the browser downloads the right size, e.g. "288px" */
  sizes: string;
  className?: string;
}) {
  const style = media.position ? { objectPosition: media.position } : undefined;

  if (media.kind === "video") return <LoopingVideo media={media} className={className} style={style} />;

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      placeholder={media.src.blurDataURL ? "blur" : "empty"}
      draggable={false}
      className={cn("object-cover", className)}
      style={style}
    />
  );
}

function LoopingVideo({
  media,
  className,
  style,
}: {
  media: Extract<Media, { kind: "video" }>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    const update = () => {
      if (onScreen && !reduce.matches) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reduce.addEventListener("change", update);
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <video
      ref={ref}
      // Without a still frame, #t=0.1 makes browsers (iOS too) show the first frame
      src={media.poster ? media.src : `${media.src}#t=0.1`}
      poster={media.poster?.src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      className={cn("absolute inset-0 size-full object-cover", className)}
      style={style}
    />
  );
}

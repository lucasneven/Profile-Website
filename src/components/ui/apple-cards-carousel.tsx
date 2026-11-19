"use client";
// Aceternity UI "Apple Cards Carousel" (https://ui.aceternity.com/components/apple-cards-carousel),
// reworked into an endless row that moves on its own:
// - every few seconds it slides one card along; the ring on the round button shows the
//   time until the next slide, and the button pauses or plays it
// - it holds still while you hover it, press and hold it, focus it with the keyboard, or
//   while it's off screen
// - drag it with a mouse or swipe it on a phone, and it settles on the nearest card;
//   the arrows step one card
// - with reduced motion it never moves on its own and steps without sliding
// No pop-up on click here (the Leadership list opens its rows into cards instead).
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { icons, type IconName } from "@/lib/icons";
import { cn, pressable } from "@/lib/utils";

const GUTTER = 24; // px, the page's side padding, so the first card lines up with the section title
const COPIES = 3; // the row is drawn three times so it can loop forever; the middle copy is the real one
const EASE = [0.22, 1, 0.36, 1] as const;

export type Slide = { key: string; label: string; node: React.ReactNode };

export function Carousel({
  slides,
  label,
  interval = 3500,
}: {
  slides: Slide[];
  /** Name of the carousel for screen readers, e.g. "Interests" */
  label: string;
  /** Milliseconds between automatic slides */
  interval?: number;
}) {
  const n = slides.length;
  const reduce = !!useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(GUTTER);
  const progress = useMotionValue(0); // 0 -> 1 until the next automatic slide
  const ringOffset = useTransform(progress, (p) => 1 - p);
  const [playing, setPlaying] = useState(true);
  // Reasons to hold still right now (besides the pause button)
  const hold = useRef({ hover: false, press: false, focus: false, drag: false, offscreen: true });
  // One card plus the gap, and one full copy of the row, in px (measured)
  const size = useRef({ step: 0, set: 0 });
  const sliding = useRef<AnimationPlaybackControls | null>(null);

  /** Moves x back into the middle copy; the copies look identical, so nothing visibly jumps */
  const recenter = () => {
    const { step, set } = size.current;
    if (!set) return;
    let at = x.get();
    while (at < GUTTER - 2 * set + step / 2) at += set;
    while (at > GUTTER - set + step / 2) at -= set;
    x.set(at);
  };

  /** Settles on the card nearest `to` */
  const settle = (to: number, velocity = 0) => {
    const { step } = size.current;
    if (!step) return;
    sliding.current?.stop();
    const target = GUTTER + Math.round((to - GUTTER) / step) * step;
    const controls = animate(
      x,
      target,
      reduce ? { duration: 0 } : velocity ? { type: "spring", stiffness: 300, damping: 36, velocity } : { duration: 0.8, ease: EASE },
    );
    controls.then(recenter);
    sliding.current = controls;
    progress.set(0);
  };

  /** One card forward (1) or back (-1) */
  const go = (by: number) => {
    const { step } = size.current;
    if (step) settle(GUTTER + Math.round((x.get() - GUTTER) / step) * step - by * step);
  };

  // Measure the cards (and again when they change size), keeping the current card in place
  useEffect(() => {
    const row = track.current;
    if (!row) return;
    const measure = () => {
      const cards = row.children as HTMLCollectionOf<HTMLElement>;
      if (cards.length < 2) return;
      const old = size.current;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const index = old.step ? Math.round((GUTTER - x.get()) / old.step) : n;
      size.current = { step, set: step * n };
      x.set(GUTTER - index * step);
      recenter();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
    // recenter only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, x]);

  // Hold still while off screen, and let go of a press anywhere on the page
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => (hold.current.offscreen = !entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    const release = () => (hold.current.press = false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  // The clock for automatic slides: only runs while nothing is holding the row still
  useAnimationFrame((_, delta) => {
    const h = hold.current;
    if (reduce || !playing || h.hover || h.press || h.focus || h.drag || h.offscreen || !size.current.step) return;
    const next = progress.get() + delta / interval;
    if (next >= 1) go(1);
    else progress.set(next);
  });

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === "mouse" && (hold.current.hover = true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && (hold.current.hover = false)}
      onPointerDown={() => (hold.current.press = true)}
      onFocus={(e) => (hold.current.focus = e.target.matches(":focus-visible"))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && (hold.current.focus = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Reaches out to the page edges on phones; the edges fade */}
      <div
        ref={viewport}
        className="-mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
      >
        <motion.div
          ref={track}
          drag="x"
          dragMomentum={false}
          style={{ x }}
          onDragStart={() => {
            hold.current.drag = true;
            sliding.current?.stop();
          }}
          onDragEnd={(_, info) => {
            hold.current.drag = false;
            settle(x.get() + info.velocity.x * 0.2, info.velocity.x);
          }}
          className="flex w-max cursor-grab gap-4 py-1 select-none active:cursor-grabbing"
        >
          {Array.from({ length: COPIES }, (_, copy) =>
            slides.map((slide, i) => {
              const real = copy === 1;
              return (
                <div
                  key={`${copy}-${slide.key}`}
                  role={real ? "group" : undefined}
                  aria-roledescription={real ? "slide" : undefined}
                  aria-label={real ? `${i + 1} of ${n}: ${slide.label}` : undefined}
                  aria-hidden={real ? undefined : true}
                  inert={!real}
                  className="shrink-0"
                >
                  {slide.node}
                </div>
              );
            }),
          )}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <RoundButton label="Previous" onClick={() => go(-1)}>
          <ArrowLeft className="size-4" />
        </RoundButton>
        {/* No autoplay with reduced motion, so no pause button either */}
        <RoundButton
          label={playing ? "Pause the slideshow" : "Play the slideshow"}
          onClick={() => setPlaying(!playing)}
          className="relative motion-reduce:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 40 40" className="absolute inset-0 -rotate-90 text-accent">
            <motion.circle
              cx="20"
              cy="20"
              r="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: ringOffset }}
            />
          </svg>
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        </RoundButton>
        <RoundButton label="Next" onClick={() => go(1)}>
          <ArrowRight className="size-4" />
        </RoundButton>
      </div>
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid size-10 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        pressable,
        className,
      )}
    >
      {children}
    </button>
  );
}

// Where the soft accent glow sits on cards without a photo, so neighbors differ
const GLOWS = ["20% 18%", "82% 30%", "30% 78%", "75% 65%", "50% 22%"];

/**
 * A tall card: its photo or video fills it (or, until there is one, its icon on a
 * tinted background). The title and text sit at the top, over the part of a photo
 * that's usually sky or background; the caption and `children` (like the bench press
 * widget) sit at the bottom.
 */
export function Card({
  title,
  text,
  icon,
  media,
  caption,
  index = 0,
  children,
}: {
  title: string;
  text: string;
  icon: IconName;
  media?: React.ReactNode;
  caption?: string;
  index?: number;
  children?: React.ReactNode;
}) {
  const Icon = icons[icon];
  return (
    <article
      className={cn(
        "relative flex h-[22rem] w-[16.5rem] flex-col overflow-hidden rounded-3xl border border-border bg-surface md:h-96 md:w-72",
        pressable,
      )}
    >
      {media ? (
        <>
          {media}
          {/* Darkens the top (and a little of the bottom) so the text stays readable on any photo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.8),rgb(0_0_0/0.35)_38%,transparent_60%,transparent_75%,rgb(0_0_0/0.6))]" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_top,black,transparent_85%)]" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${GLOWS[index % GLOWS.length]}, color-mix(in oklab, var(--accent) 20%, transparent), transparent 62%)`,
            }}
          />
          <Icon strokeWidth={1} className="absolute -right-10 -bottom-10 size-56 -rotate-12 text-accent/[0.13]" />
        </div>
      )}

      <div className="relative p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-black/40 text-accent backdrop-blur-sm">
            <Icon className="size-4" />
          </span>
          <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{text}</p>
      </div>

      {(caption || children) && (
        <div className="relative mt-auto p-5 pt-0">
          {caption && <p className="text-[11px] tracking-[0.12em] text-white/70 uppercase">{caption}</p>}
          {children}
        </div>
      )}
    </article>
  );
}

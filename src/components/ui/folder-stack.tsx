"use client";
// Built from Aceternity UI "Animated Testimonials"
// (https://ui.aceternity.com/components/animated-testimonials): a pile of cards you
// shuffle through, with the text beside it and prev/next buttons. Reworked into a
// stack of folders. Each folder has a numbered tab, spread along the top so every tab
// peeks out of the pile. Clicking the front folder slides it to the back and brings
// the one under it forward; clicking a tab pulls that folder to the front. With a
// mouse, the pile tilts slightly toward the pointer. With reduced motion there's no
// tilt and folders swap instantly.
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { cn, pressable } from "@/lib/utils";

export type Folder = {
  id: string;
  title: string;
  tag: string;
  text: string;
  /** Small chips under the text, e.g. the tech stack */
  chips?: string[];
  /** What's inside the folder: a screenshot or artwork filling the space */
  media: React.ReactNode;
};

const LIFT = 10; // px each folder further back sits higher, so its top edge shows
const SHRINK = 0.035; // how much narrower each folder further back is
const TAB = 28; // tab height, px
const TILT = 5; // most the pile tilts toward the pointer, degrees
// A fixed lean for each folder in the pile (fixed, not random, so server and browser agree)
const LEAN = [-1.6, 1.2, -0.8, 1.5, -1.2, 0.9, -1.4, 1.1];
const EASE = [0.22, 1, 0.36, 1] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** True on devices with a mouse or trackpad (no tilt on touch screens) */
function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(hover: hover) and (pointer: fine)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );
}

export function FolderStack({ items, className }: { items: Folder[]; className?: string }) {
  const n = items.length;
  // `previous` is the folder that was in front before the last change; it decides how each folder moves
  const [{ active, previous }, setOrder] = useState({ active: 0, previous: 0 });
  const reduce = !!useReducedMotion();
  const tilts = useFinePointer() && !reduce;
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 });

  const wrap = (i: number) => ((i % n) + n) % n;
  const show = (i: number) => setOrder((o) => (wrap(i) === o.active ? o : { active: wrap(i), previous: o.active }));
  const step = (by: number) => setOrder((o) => ({ active: wrap(o.active + by), previous: o.active }));
  /** 0 for the front folder, 1 for the one under it, and so on */
  const depth = (i: number, front: number) => wrap(i - front);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilts || e.pointerType === "touch") return;
    const box = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - box.left) / box.width - 0.5) * 2 * TILT);
    rotateX.set(-((e.clientY - box.top) / box.height - 0.5) * 2 * TILT);
  };
  const untilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const current = items[active];

  return (
    <div
      className={cn("grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-14", className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {/* The pile. Room on top for the tabs and the folders sitting higher behind. */}
      <div style={{ paddingTop: TAB + (n - 1) * LIFT }}>
        <motion.div
          onPointerMove={tilt}
          onPointerLeave={untilt}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative aspect-[16/11]"
        >
          {items.map((item, i) => {
            const d = depth(i, active);
            const was = depth(i, previous);
            const front = d === 0;
            const target = {
              y: -d * LIFT,
              scale: 1 - d * SHRINK,
              rotate: front ? 0 : LEAN[i % LEAN.length],
              zIndex: n - d,
            };
            let animate: TargetAndTransition = target;
            let transition: Transition = { type: "spring", stiffness: 260, damping: 28, zIndex: { duration: 0 } };
            if (reduce) {
              transition = { duration: 0 };
            } else if (was === 0 && d >= 2) {
              // Pulled down off the front, then slid in at the back
              animate = { ...target, y: [null, 36, target.y], zIndex: [n + 1, n + 1, target.zIndex] };
              transition = { duration: 0.65, times: [0, 0.35, 1], ease: EASE };
            } else if (d === 0 && was >= 2) {
              // Lifted up out of the pile, then dropped on top
              animate = { ...target, y: [null, -(n * LIFT) - 28, 0], zIndex: [null, n + 1, n] };
              transition = { duration: 0.6, times: [0, 0.45, 1], ease: EASE };
            }
            // Folders further back get darker
            const dim = Math.min(d, 4) * 0.12;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={animate}
                transition={transition}
                style={{ transformOrigin: "50% 0%" }}
                className="absolute inset-0"
              >
                <button
                  type="button"
                  onClick={() => (front ? step(1) : show(i))}
                  tabIndex={front ? 0 : -1}
                  aria-hidden={front ? undefined : true}
                  aria-label={front ? `Next project: ${items[wrap(i + 1)].title}` : undefined}
                  className={cn(
                    "group/folder absolute inset-0 cursor-pointer rounded-2xl border border-border bg-surface p-2 text-left shadow-[0_-8px_20px_-12px_rgb(0_0_0/0.9)] hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                    front && pressable,
                  )}
                >
                  <span className="relative block size-full overflow-hidden rounded-xl bg-background">{item.media}</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-background transition-opacity duration-500"
                    style={{ opacity: dim }}
                  />
                </button>

                {/* The tab: overlaps the folder's top border by 1px so the two read as one piece */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => show(i)}
                  aria-label={`Project ${i + 1}: ${item.title}`}
                  aria-current={front ? "true" : undefined}
                  className={cn(
                    "absolute flex cursor-pointer items-center justify-center overflow-hidden rounded-t-lg border border-b-0 border-border bg-surface text-[11px] font-semibold tracking-[0.12em] tabular-nums",
                    front ? "text-accent" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{
                    height: TAB,
                    bottom: "calc(100% - 1px)",
                    left: `calc(14px + (100% - 28px) * ${i / n})`,
                    width: `calc((100% - 28px) / ${n} - 6px)`,
                  }}
                >
                  {pad(i + 1)}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-background transition-opacity duration-500"
                    style={{ opacity: dim }}
                  />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* The text for the front folder. Every folder's text sits invisibly in the same
          spot, so the box is always as tall as the longest one and nothing below jumps. */}
      <div className="flex flex-col">
        <div className="grid">
          {items.map((item) => (
            <div key={item.id} aria-hidden="true" className="invisible col-start-1 row-start-1">
              <Details folder={item} />
            </div>
          ))}
          <div aria-live="polite" className="col-start-1 row-start-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Details folder={current} reveal={!reduce} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className={cn(
              "grid size-10 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent",
              pressable,
            )}
          >
            <ArrowLeft className="size-4" />
          </button>
          <p className="w-20 text-center text-xs text-muted-foreground tabular-nums">
            <span className="text-foreground">{pad(active + 1)}</span> / {pad(n)}
          </p>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className={cn(
              "grid size-10 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground hover:border-accent hover:text-accent",
              pressable,
            )}
          >
            <ArrowRight className="size-4" />
          </button>
          <p className="ml-3 hidden text-xs text-muted-foreground sm:block">
            <span className="pointer-coarse:hidden">Click</span>
            <span className="hidden pointer-coarse:inline">Tap</span> the folder for the next one
          </p>
        </div>
      </div>
    </div>
  );
}

/** Tag, title, text and chips. `reveal` fades the words in one after another. */
function Details({ folder, reveal = false }: { folder: Folder; reveal?: boolean }) {
  return (
    <>
      <p className="w-fit rounded-full border border-accent/30 bg-accent/[0.07] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-accent uppercase">
        {folder.tag}
      </p>
      <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">{folder.title}</h3>
      {/* Words are separate boxes either way, so the invisible copies wrap exactly like this one */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {folder.text.split(" ").map((word, i) =>
          reveal ? (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.012 * i }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ) : (
            <span key={i} className="inline-block">
              {word}&nbsp;
            </span>
          ),
        )}
      </p>
      {folder.chips && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {folder.chips.map((chip) => (
            <li key={chip} className="rounded-md border border-border px-2 py-0.5 text-xs text-foreground/80">
              {chip}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

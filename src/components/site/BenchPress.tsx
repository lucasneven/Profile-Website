"use client";
// The bench press widget in the Gym card (Interests). When it scrolls into view the
// plates slide onto the bar one pair at a time, heaviest first like loading a real bar,
// and the number climbs from the empty bar (45 lb) as each pair lands. It plays once;
// with reduced motion the loaded bar just shows. The weight is `benchPress` in data.ts
// and the plates are worked out from it: 185 = 45 lb bar + a 45 and a 25 on each side.
import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const BAR = 45; // lb, a standard barbell

// Standard plates in lb, heaviest first, and how each is drawn (height and thickness in px)
const PLATES = [
  { lb: 45, height: 40, width: 8, tone: "bg-accent" },
  { lb: 35, height: 35, width: 7, tone: "bg-accent/85" },
  { lb: 25, height: 29, width: 6, tone: "bg-accent/70" },
  { lb: 10, height: 22, width: 5, tone: "bg-accent/60" },
  { lb: 5, height: 17, width: 4, tone: "bg-accent/50" },
  { lb: 2.5, height: 13, width: 3, tone: "bg-accent/40" },
];
type Plate = (typeof PLATES)[number];

const START = 0.2; // seconds before the first pair slides on
const SLIDE = 0.5; // seconds per pair
const EASE = [0.22, 1, 0.36, 1] as const; // the same ease-out as the hero entrance

/** The plates on each side of the bar, heaviest first: 185 -> 45, 25. */
function platesPerSide(total: number) {
  let left = (total - BAR) / 2;
  const plates: Plate[] = [];
  for (const plate of PLATES) {
    while (left >= plate.lb) {
      plates.push(plate);
      left -= plate.lb;
    }
  }
  return plates;
}

/** What the bar weighs after each pair goes on: 185 -> 45, 135, 185. */
function loadSteps(total: number) {
  const steps = [BAR];
  for (const plate of platesPerSide(total)) steps.push(steps[steps.length - 1] + plate.lb * 2);
  steps[steps.length - 1] = total; // end on the real number even if plates can't make it exactly
  return steps;
}

export function BenchPress({ lb, className }: { lb: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = !!useReducedMotion();
  const play = inView || reduce;
  const plates = platesPerSide(lb);

  const weight = useMotionValue(BAR);
  const shown = useTransform(weight, (v) => String(Math.round(v)));

  useEffect(() => {
    if (!play) return;
    const steps = loadSteps(lb);
    if (reduce || steps.length < 2) {
      weight.set(lb);
      return;
    }
    // One step per pair, timed to match the plates sliding on
    const controls = animate(weight, steps, {
      delay: START,
      duration: SLIDE * (steps.length - 1),
      times: steps.map((_, i) => i / (steps.length - 1)),
      ease: EASE,
    });
    return () => controls.stop();
  }, [play, reduce, lb, weight]);

  return (
    <div ref={ref} className={cn("flex items-center gap-4", className)}>
      <p className="shrink-0">
        <span className="block text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
          Bench press
        </span>
        <span className="mt-1.5 block text-2xl leading-none font-bold tabular-nums">
          <span className="sr-only">{lb} lb</span>
          {/* Fixed width (1ch = one monospace digit) so "lb" stays put while counting */}
          <motion.span
            aria-hidden="true"
            className="inline-block text-right"
            style={{ minWidth: `${String(lb).length}ch` }}
          >
            {shown}
          </motion.span>
          <span aria-hidden="true" className="ml-1 text-sm font-medium text-muted-foreground">
            lb
          </span>
        </span>
      </p>

      {/* sleeve + plates, collar, shaft, collar, sleeve + plates */}
      <div aria-hidden="true" className="flex h-11 min-w-0 flex-1 items-center">
        <Sleeve side="left" plates={plates} play={play} reduce={reduce} />
        <span className="h-3.5 w-1 shrink-0 rounded-[1px] bg-muted-foreground/70" />
        <span className="h-[3px] min-w-6 flex-1 bg-muted-foreground/40" />
        <span className="h-3.5 w-1 shrink-0 rounded-[1px] bg-muted-foreground/70" />
        <Sleeve side="right" plates={plates} play={play} reduce={reduce} />
      </div>
    </div>
  );
}

/** One end of the bar. Plates stack outward from the collar and slide on from the end. */
function Sleeve({
  side,
  plates,
  play,
  reduce,
}: {
  side: "left" | "right";
  plates: Plate[];
  play: boolean;
  reduce: boolean;
}) {
  const from = side === "left" ? -20 : 20;
  return (
    <div className={cn("relative flex h-full w-10 shrink-0 items-center gap-0.5", side === "left" && "flex-row-reverse")}>
      <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted-foreground/60" />
      {plates.map((plate, i) => {
        const delay = START + i * SLIDE;
        return (
          <motion.span
            key={i}
            className={cn("relative shrink-0 rounded-[2px]", plate.tone)}
            style={{ height: plate.height, width: plate.width }}
            initial={{ x: from, opacity: 0 }}
            animate={play ? { x: 0, opacity: 1 } : undefined}
            transition={
              reduce
                ? { duration: 0 }
                : { delay, duration: SLIDE, ease: EASE, opacity: { delay, duration: SLIDE * 0.4 } }
            }
          />
        );
      })}
    </div>
  );
}

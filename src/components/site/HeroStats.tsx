"use client";
// The stats row under the hero. Numbers count up from 0 once (React Bits CountUp),
// starting as the row fades in, once most of it is on screen. Values come from `stats`
// in data.ts: "70+" counts to 70 and keeps the "+", "4.0" keeps its decimal, and text
// like "ASB VP" is shown as is. With reduced motion the final values appear right away.
// Hovering one stat softly blurs and dims the others (no blur with reduced motion).
import { useEffect, useRef, useState } from "react";
import { inView } from "motion/react";
import CountUp from "@/components/reactbits/CountUp";
import { cn } from "@/lib/utils";

type Stat = { value: string; label: string };

/** "70+" -> { prefix: "", to: 70, decimals: 0, suffix: "+" }. Returns null when there's no number. */
function parseStat(value: string) {
  const match = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return {
    prefix,
    suffix,
    to: Number(number.replace(/,/g, "")),
    decimals: number.split(".")[1]?.length ?? 0,
    separator: number.includes(",") ? "," : "",
  };
}

/**
 * Seconds until the row's fade-in starts (the rise animation set in Hero.tsx), so the
 * count waits for it, intro curtain or not. 0 once it has started, or if there's none.
 */
function secondsUntilFadeIn(row: Element) {
  const fade = row.getAnimations().find((a) => a instanceof CSSAnimation);
  if (!fade) return 0;
  const delay = Number(fade.effect?.getTiming().delay ?? 0);
  const elapsed = Number(fade.currentTime ?? delay);
  return Math.max(0, delay - elapsed) / 1000;
}

export function HeroStats({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = useRef<HTMLDListElement>(null);
  // How long to wait before counting; null until the row is mostly on screen
  const [wait, setWait] = useState<number | null>(null);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;
    return inView(row, () => setWait(secondsUntilFadeIn(row)), { amount: 0.6 });
  }, []);

  return (
    <dl ref={ref} className={cn("group/stats", className)}>
      {stats.map((stat, i) => {
        const number = parseStat(stat.value);
        return (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-2 transition duration-300 group-hover/stats:opacity-60 hover:opacity-100! motion-safe:group-hover/stats:blur-[2px] motion-safe:hover:blur-none!"
          >
            {/* On phones the text scales with the screen width, so all three stats fit in one
                row down to 320px; long labels wrap onto a second line */}
            <dt className="text-[clamp(0.625rem,3.2vw,0.75rem)] leading-4 tracking-[0.1em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.14em]">
              {stat.label}
            </dt>
            <dd className="text-[clamp(1.25rem,7vw,1.875rem)] leading-none font-bold whitespace-nowrap sm:text-4xl md:text-5xl">
              {number ? (
                <>
                  {/* Screen readers get the real value, not the moving digits. So does reduced
                      motion, from the first paint (the count would start at 0 until the JS loads). */}
                  <span className="sr-only motion-reduce:not-sr-only">{stat.value}</span>
                  <span aria-hidden="true" className="motion-reduce:hidden">
                    <CountUp
                      to={number.to}
                      decimals={number.decimals}
                      prefix={number.prefix}
                      suffix={number.suffix}
                      separator={number.separator}
                      easing="expo"
                      duration={2}
                      delay={(wait ?? 0) + 0.1 + i * 0.1}
                      trigger="load"
                      startWhen={wait !== null}
                      // Reserve the final width (1ch = one monospace character) so nothing shifts
                      className="inline-block"
                      style={{ minWidth: `${stat.value.length}ch` }}
                    />
                  </span>
                </>
              ) : (
                stat.value
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

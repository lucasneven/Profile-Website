"use client";
// Aceternity UI "Infinite Moving Cards" (https://ui.aceternity.com/components/infinite-moving-cards),
// adapted: takes any items (chips here), drifts slowly sideways forever and eases to a
// stop while hovered. The second copy that makes the loop seamless is drawn by React
// (hidden from screen readers) instead of cloned, and the motion runs in the browser's
// animation engine, so there's nothing to add to globals.css. With reduced motion it's
// a plain wrapped list that doesn't move.
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  items: { key: string; node: React.ReactNode }[];
  /** Pixels per second */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const box = container.current;
    const row = list.current;
    if (!box || !row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animation: Animation | undefined;
    const start = () => {
      animation?.cancel();
      // One copy plus one gap: moving exactly this far lines the second copy up with the first
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const distance = (row.scrollWidth + gap) / 2;
      const frames = [{ transform: "translateX(0)" }, { transform: `translateX(${-distance}px)` }];
      animation = row.animate(direction === "left" ? frames : frames.reverse(), {
        duration: (distance / speed) * 1000,
        iterations: Infinity,
        easing: "linear",
      });
    };
    start();

    // Ease the speed down to a stop (and back up) instead of freezing abruptly
    let raf = 0;
    const easeTo = (target: number) => {
      cancelAnimationFrame(raf);
      const tick = () => {
        if (!animation) return;
        const rate = animation.playbackRate + (target - animation.playbackRate) * 0.12;
        animation.playbackRate = Math.abs(target - rate) < 0.01 ? target : rate;
        if (animation.playbackRate !== target) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const slow = () => pauseOnHover && easeTo(0);
    const resume = () => easeTo(1);
    box.addEventListener("pointerenter", slow);
    box.addEventListener("pointerleave", resume);

    const observer = new ResizeObserver(start);
    observer.observe(row);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      box.removeEventListener("pointerenter", slow);
      box.removeEventListener("pointerleave", resume);
      animation?.cancel();
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={container}
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]",
        className,
      )}
    >
      <ul ref={list} className="flex w-max gap-2.5 motion-reduce:w-auto motion-reduce:flex-wrap">
        {items.map((item) => (
          <li key={item.key} className="shrink-0">
            {item.node}
          </li>
        ))}
        {items.map((item) => (
          <li key={`copy-${item.key}`} aria-hidden="true" className="shrink-0 motion-reduce:hidden">
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
};

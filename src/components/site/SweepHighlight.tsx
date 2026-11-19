"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// The blue block behind a keyword, as clip-path insets (top right bottom left). The 12%
// top and bottom trims it from the full line height down to about the letters' height.
const HIDDEN = "inset(12% 100% 12% 0% round 0.15em)"; // squeezed to the left edge
const SHOWN = "inset(12% 0% 12% 0% round 0.15em)";
const GONE = "inset(12% 0% 12% 100% round 0.15em)"; // squeezed to the right edge

type Wipe = { order: number; reduce: boolean };

// The block always wipes in from the left and leaves to the right, like a marker pass
const wipe: Variants = {
  idle: { clipPath: HIDDEN },
  in: ({ reduce }: Wipe) => ({
    clipPath: [HIDDEN, SHOWN],
    transition: { duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
  out: ({ reduce }: Wipe) => ({
    clipPath: GONE,
    transition: { duration: reduce ? 0 : 0.35, ease: "easeIn" },
  }),
  // Once, when the paragraph scrolls into view: each keyword in turn, 0.3s apart
  sweep: ({ order }: Wipe) => ({
    clipPath: [HIDDEN, SHOWN, SHOWN, GONE],
    transition: { duration: 1.2, times: [0, 0.3, 0.6, 1], ease: "easeInOut", delay: 0.5 + order * 0.3 },
  }),
};

// Everything except the hovered keyword softly blurs and fades, so that word stands out
const fade = "transition-[filter,opacity] duration-300 ease-out motion-reduce:transition-none";
const dim = "opacity-45 blur-[1.5px]";

type Part = { text: string } | { keyword: string; tail: string; order: number };

/** Splits the text around the keywords (whole words, any case), keeping trailing punctuation with each. */
function split(text: string, keywords: string[]): Part[] {
  if (!keywords.length) return [{ text }];
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`\\b(${escaped.join("|")})\\b([.,!?;:]*)`, "gi");
  const parts: Part[] = [];
  let last = 0;
  let order = 0;
  for (let m = pattern.exec(text); m; m = pattern.exec(text)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ keyword: m[1], tail: m[2], order: order++ });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

/**
 * A paragraph with a few keywords in the accent blue. When it scrolls into view, a blue
 * block wipes across each keyword in turn, flipping its letters dark as it passes. On a
 * computer, hovering a keyword wipes the block back in while the rest of the paragraph
 * blurs a little. Only clip-path, opacity and blur change, so nothing shifts. With reduced
 * motion on there's no wipe on scroll, and hovering highlights instantly.
 */
export function SweepHighlight({
  text,
  highlight = [],
  className,
}: {
  text: string;
  highlight?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.75 });
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState<number | null>(null);
  const dimmed = active !== null;

  return (
    <p ref={ref} className={className}>
      {split(text, highlight).map((part, i) =>
        "keyword" in part ? (
          // nowrap keeps trailing punctuation from wrapping onto its own line
          <span key={i} className="whitespace-nowrap">
            <Keyword
              word={part.keyword}
              timing={{ order: part.order, reduce }}
              sweep={inView && !reduce}
              hovered={active === i}
              dimmed={dimmed && active !== i}
              onHover={(on) => setActive((a) => (on ? i : a === i ? null : a))}
            />
            {part.tail && <span className={cn(fade, dimmed && dim)}>{part.tail}</span>}
          </span>
        ) : (
          <span key={i} className={cn(fade, dimmed && dim)}>
            {part.text}
          </span>
        ),
      )}
    </p>
  );
}

function Keyword({
  word,
  timing,
  sweep,
  hovered,
  dimmed,
  onHover,
}: {
  word: string;
  timing: Wipe;
  sweep: boolean;
  hovered: boolean;
  dimmed: boolean;
  onHover: (on: boolean) => void;
}) {
  const [touched, setTouched] = useState(false);
  const state = hovered ? "in" : touched ? "out" : sweep ? "sweep" : "idle";

  return (
    <motion.span
      className={cn("relative inline-block cursor-default text-accent", fade, dimmed && dim)}
      // Mouse and pen only: motion ignores touch here, so phones just get the scroll wipe
      onHoverStart={() => {
        setTouched(true);
        onHover(true);
      }}
      onHoverEnd={() => onHover(false)}
    >
      {word}
      {/* A dark-on-blue copy of the word on top, cut to the block's shape */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -inset-x-[0.2em] whitespace-nowrap bg-accent px-[0.2em] text-accent-foreground select-none"
        variants={wipe}
        custom={timing}
        initial="idle"
        animate={state}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}

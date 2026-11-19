"use client";
// Aceternity UI "Expandable Card" (https://ui.aceternity.com/components/expandable-card),
// the standard list version, adapted: compact rows with an icon, title and subtitle;
// clicking one grows it into a card in the middle of the screen, with its photo or video
// on top when it has one. Close it with the X, Escape, or a click outside. Site colors,
// and keyboard focus moves into the card and back to the row. With reduced motion the
// card appears without growing.
import { AnimatePresence, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ExpandableItem = {
  id: string;
  title: string;
  sub?: string;
  text: string;
  icon: IconName;
  /** A photo or video for the open card (fills a 4:3 box) */
  media?: React.ReactNode;
};

// These rows animate with motion, so the press-down transition lists only what CSS animates
const press = "transition-[scale,background-color,border-color] motion-safe:active:scale-[0.97]";

export function ExpandableCardList({ items, className }: { items: ExpandableItem[]; className?: string }) {
  const [active, setActive] = useState<ExpandableItem | null>(null);
  const id = useId();
  const card = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      // The close button is the only thing to focus in the card, so Tab stays on it
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButton.current?.focus({ preventScroll: true });
    const row = opener.current;
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
      row?.focus({ preventScroll: true });
    };
  }, [active, close]);

  useOutsideClick(card, close);

  const ActiveIcon = active ? icons[active.icon] : null;

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background/75 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && ActiveIcon && (
          <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={card}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${active.id}-${id}`}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
            >
              {active.media ? (
                <div className="relative aspect-[4/3] w-full border-b border-border bg-background">
                  {active.media}
                  <motion.span
                    layoutId={`icon-${active.id}-${id}`}
                    className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-xl border border-white/15 bg-black/55 text-accent backdrop-blur-sm"
                  >
                    <ActiveIcon className="size-5" />
                  </motion.span>
                </div>
              ) : (
                <div className="relative flex h-32 items-end overflow-hidden border-b border-border p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,color-mix(in_oklab,var(--accent)_24%,transparent),transparent_65%)]" />
                  <motion.span
                    layoutId={`icon-${active.id}-${id}`}
                    className="relative grid size-12 place-items-center rounded-xl border border-accent/30 bg-background text-accent"
                  >
                    <ActiveIcon className="size-6" />
                  </motion.span>
                </div>
              )}

              <div className="p-6">
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  id={`title-${active.id}-${id}`}
                  className="text-lg font-semibold tracking-tight"
                >
                  {active.title}
                </motion.h3>
                {active.sub && (
                  <motion.p layoutId={`sub-${active.id}-${id}`} className="mt-1 text-sm text-accent">
                    {active.sub}
                  </motion.p>
                )}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="mt-4 leading-relaxed text-muted-foreground"
                >
                  {active.text}
                </motion.p>
              </div>

              <motion.button
                ref={closeButton}
                type="button"
                onClick={close}
                aria-label="Close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className={cn(
                  "absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  press,
                )}
              >
                <X className="size-4" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className={cn("grid grid-cols-1 gap-x-6 gap-y-1 md:grid-cols-2", className)}>
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.id}>
              <motion.button
                layoutId={`card-${item.id}-${id}`}
                type="button"
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setActive(item);
                }}
                aria-haspopup="dialog"
                className={cn(
                  "group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-transparent p-3 text-left hover:border-border hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  press,
                )}
              >
                <motion.span
                  layoutId={`icon-${item.id}-${id}`}
                  className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent"
                >
                  <Icon className="size-5" />
                </motion.span>
                <span className="min-w-0 flex-1">
                  <motion.span layoutId={`title-${item.id}-${id}`} className="block font-semibold tracking-tight">
                    {item.title}
                  </motion.span>
                  {item.sub && (
                    <motion.span
                      layoutId={`sub-${item.id}-${id}`}
                      className="block truncate text-sm text-muted-foreground"
                    >
                      {item.sub}
                    </motion.span>
                  )}
                </span>
                <Plus
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground transition group-hover:rotate-90 group-hover:text-accent motion-reduce:transition-none"
                />
              </motion.button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

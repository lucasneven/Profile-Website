"use client";
// Aceternity UI "Card Hover Effect" (https://ui.aceternity.com/components/card-hover-effect),
// adapted: site colors, optional link/icon/subtitle, works without links.
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type HoverItem = {
  title: string;
  description: string;
  sub?: string;
  icon?: React.ReactNode;
  link?: string;
};

export const HoverEffect = ({ items, className }: { items: HoverItem[]; className?: string }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, idx) => {
        const Wrapper = item.link ? "a" : "div";
        return (
          <Wrapper
            href={item.link}
            key={item.title}
            className="group relative block h-full w-full p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-3xl bg-accent/10"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <Card>
              {item.icon && <div className="mb-4 text-accent">{item.icon}</div>}
              <CardTitle>{item.title}</CardTitle>
              {item.sub && <p className="mt-1 text-xs font-medium text-accent">{item.sub}</p>}
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Wrapper>
        );
      })}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors group-hover:border-accent/40",
        className,
      )}
    >
      <div className="relative z-50">{children}</div>
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <h3 className={cn("font-semibold tracking-tight text-foreground", className)}>{children}</h3>;
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <p className={cn("mt-3 text-sm leading-relaxed text-muted-foreground", className)}>{children}</p>
  );
};

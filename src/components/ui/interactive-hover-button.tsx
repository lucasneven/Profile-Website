// MagicUI Interactive Hover Button (magicui.design/docs/components/interactive-hover-button).
// Hover it: the dot grows until it fills the button and the label slides out as a copy with an
// arrow slides in. Site edits: accent colors instead of primary, renders a link when given
// `href`, presses down on click, and with reduced motion the fill swaps in without moving.
import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = { children: ReactNode; className?: string } & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className">)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">)
);

export function InteractiveHoverButton({ children, className, ...props }: InteractiveHoverButtonProps) {
  const classes = cn(
    "group bg-background relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-transform motion-safe:active:scale-[0.97]",
    className
  );
  const content = (
    <>
      <span className="flex items-center justify-center gap-2">
        <span className="bg-accent h-2 w-2 shrink-0 rounded-full transition-all duration-300 group-hover:scale-[100.8] motion-reduce:transition-none"></span>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 motion-reduce:transition-none">
          {children}
        </span>
      </span>
      <span aria-hidden="true" className="text-accent-foreground absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none">
        <span>{children}</span>
        <ArrowRight className="size-[1.25em] shrink-0" />
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <a className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

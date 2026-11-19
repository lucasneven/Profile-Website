"use client";
// The email button in "What's next". Clicking copies the address and the label flips to
// "Copied" for a moment. If copying isn't possible, it opens the mail app instead (it's
// a normal mailto: link underneath). With reduced motion the label fades without moving.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, pressable } from "@/lib/utils";

export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const reset = useRef<number | undefined>(undefined);
  const shift = useReducedMotion() ? 0 : 8;

  useEffect(() => () => window.clearTimeout(reset.current), []);

  const copy = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.clipboard?.writeText) return; // no clipboard: let the mailto: link work
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(reset.current);
      reset.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={copy}
      title="Copy my email"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        pressable,
        className,
      )}
    >
      {copied ? <Check aria-hidden="true" className="size-4" /> : <Mail aria-hidden="true" className="size-4" />}
      {/* The invisible address keeps the button the same width while it says "Copied" */}
      <span className="grid overflow-hidden">
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          {email}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "email"}
            initial={{ y: shift, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -shift, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="col-start-1 row-start-1 text-center"
          >
            {copied ? "Copied" : email}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </a>
  );
}

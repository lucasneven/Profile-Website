"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate, useReducedMotion } from "motion/react";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // SVG patterns for different states and themes
  const dotPatterns = {
    light: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.default,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: dotPatterns.dark.default,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          backgroundImage: dotPatterns.light.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

// Site edits: recolored to the accent, instant with reduced motion, and a
// trigger="hover" mode (used on the hero name) that fills on hover instead of on load.
const accentFill = "linear-gradient(var(--accent), var(--accent))";
const accentText = "linear-gradient(var(--accent-foreground), var(--accent-foreground))";

export const Highlight = ({
  children,
  className,
  trigger = "load",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "load" | "hover";
}) => {
  const reduce = useReducedMotion();

  if (trigger === "hover") {
    const ease = [0.22, 1, 0.36, 1] as const;
    const transition = reduce ? { duration: 0 } : { duration: 0.55, ease };
    return (
      // The accent block wipes in from the left while the pointer is over it.
      <motion.span
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={{ rest: { backgroundSize: "0% 100%" }, hover: { backgroundSize: "100% 100%" } }}
        transition={transition}
        style={{ backgroundImage: accentFill, backgroundRepeat: "no-repeat", backgroundPosition: "left center" }}
        className={cn("relative -mx-[0.06em] inline-block", className)}
      >
        {/* Same wipe, clipped to the letters: they flip to the text-on-accent color
            exactly where the block has reached, and stay accent everywhere else. */}
        <motion.span
          variants={{
            rest: { backgroundSize: "0% 100%, 100% 100%" },
            hover: { backgroundSize: "100% 100%, 100% 100%" },
          }}
          transition={transition}
          style={{
            backgroundImage: `${accentText}, ${accentFill}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
          className="block px-[0.06em] text-transparent"
        >
          {children}
        </motion.span>
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 2,
              ease: "linear",
              delay: 0.5,
            }
      }
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-accent/25 to-accent/45 px-1 pb-1`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};

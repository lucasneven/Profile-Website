"use client";
// Floating navbar built from Aceternity's Resizable Navbar: full width at the top,
// shrinks into a pill once you scroll. Name on the left, links on the right: a soft
// accent pill springs between links as you point at them, and the link for the section
// you're reading gets an accent underline. "Say hi" has a light circling its border and
// fills from its dot on hover. Phones get a menu button whose lines fold into an X.
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MobileNav, MobileNavHeader, MobileNavMenu, NavBody, Navbar } from "@/components/ui/resizable-navbar";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((item) => item.link.replace("#", ""));

// Pressing anything here shrinks it a touch
const press = "transition motion-safe:active:scale-[0.97]";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Id of the section passing a line about a third of the way down the screen (null in the hero). */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const crossing = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) crossing.set(entry.target.id, entry.isIntersecting);
        setActive(sectionIds.find((id) => crossing.get(id)) ?? null);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

function Logo() {
  return (
    <a
      href="#top"
      className={cn("relative z-20 shrink-0 py-1 text-base font-bold tracking-tight text-foreground", press, focusRing)}
    >
      {profile.name}
    </a>
  );
}

/** Desktop links. One pill slides (with a little bounce) to the link under the pointer or keyboard focus. */
function NavLinks({ active }: { active: string | null }) {
  const reduce = useReducedMotion();
  // jump: the pill was hidden, so it appears in place instead of sliding over from the last link
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false, jump: true });

  const pointAt = (link: HTMLElement) =>
    setPill((p) => ({ left: link.offsetLeft, width: link.offsetWidth, visible: true, jump: !p.visible }));
  const hide = () => setPill((p) => ({ ...p, visible: false }));

  const slide = reduce || pill.jump ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 28 };

  return (
    <div className="relative" onPointerLeave={hide}>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-accent/10 ring-1 ring-accent/20 ring-inset"
        initial={false}
        animate={{ x: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
        transition={{ x: slide, width: slide, opacity: { duration: 0.2 } }}
      />
      <ul className="flex items-center">
        {navLinks.map((item) => {
          const isActive = active === item.link.slice(1);
          return (
            <li key={item.link}>
              <a
                href={item.link}
                aria-current={isActive ? "true" : undefined}
                onPointerEnter={(e) => pointAt(e.currentTarget)}
                onFocus={(e) => pointAt(e.currentTarget)}
                onBlur={hide}
                className={cn(
                  "relative block rounded-full px-3 py-2 text-sm hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                  press,
                  focusRing,
                )}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 bottom-0.5 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The "Say hi" email button. A light keeps circling its border (a conic gradient spinning
 * behind a 1px gap; still with reduced motion). Hover it: the dot grows until it fills the
 * button and the label slides out as a copy with an arrow slides in, like the hero button.
 */
function SayHi({ className }: { className?: string }) {
  const swap = "transition duration-300 motion-reduce:transition-none";
  return (
    <a
      href={`mailto:${profile.email}`}
      className={cn(
        "group relative isolate inline-flex h-9 overflow-hidden rounded-full bg-accent/25 p-px text-xs font-semibold tracking-[0.14em] uppercase",
        press,
        focusRing,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-orbit motion-reduce:animate-none"
        style={{ background: "conic-gradient(transparent 0 58%, var(--accent) 86%, #e6ecff 96%, transparent)" }}
      />
      <span className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-background px-4">
        <span aria-hidden="true" className={cn(swap, "size-1.5 shrink-0 rounded-full bg-accent group-hover:scale-[80]")} />
        <span className={cn(swap, "text-accent group-hover:translate-x-8 group-hover:opacity-0")}>Say hi</span>
        <span
          aria-hidden="true"
          className={cn(
            swap,
            "absolute inset-0 flex translate-x-8 items-center justify-center gap-1.5 text-accent-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          )}
        >
          Say hi
          <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
        </span>
      </span>
    </a>
  );
}

/** Phone menu button: three lines (the middle one short, it stretches on hover) that fold into an X. */
function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const line =
    "absolute right-0 h-0.5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "group grid size-10 cursor-pointer place-items-center rounded-full text-foreground hover:bg-accent/10 hover:text-accent aria-expanded:text-accent",
        press,
        focusRing,
      )}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-5">
        <span className={cn(line, "top-0 w-full group-aria-expanded:translate-y-1.5 group-aria-expanded:rotate-45")} />
        <span
          className={cn(
            line,
            "top-1.5 w-3 group-hover:w-full group-aria-expanded:w-full group-aria-expanded:scale-x-0 group-aria-expanded:opacity-0",
          )}
        />
        <span className={cn(line, "top-3 w-full group-aria-expanded:-translate-y-1.5 group-aria-expanded:-rotate-45")} />
      </span>
    </button>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <Navbar className="fixed top-4">
      {/* min-w-fit! lets the scrolled pill grow to fit the links */}
      <NavBody className="max-w-6xl min-w-fit! gap-10 px-6">
        <Logo />
        <div className="relative z-20 flex items-center gap-5">
          <NavLinks active={active} />
          <SayHi />
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader className="pl-2">
          <Logo />
          <MenuButton open={open} onClick={() => setOpen(!open)} />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={open}
          onClose={() => setOpen(false)}
          className="border border-border bg-background dark:bg-background"
        >
          {navLinks.map((item) => {
            const isActive = active === item.link.slice(1);
            return (
              <a
                key={item.link}
                href={item.link}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "w-full hover:text-foreground",
                  isActive ? "text-accent" : "text-muted-foreground",
                  press,
                  focusRing,
                )}
              >
                {item.name}
              </a>
            );
          })}
          <SayHi className="mt-2 h-11 w-full" />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

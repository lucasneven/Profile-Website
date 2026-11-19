// The first screen: who I am on the left, a big portrait on the right (stacked on
// phones, portrait first), and the stats row along the bottom. Text and links come
// from src/lib/data.ts.
import Image from "next/image";
import { GraduationCap, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { HeroDots } from "@/components/site/HeroDots";
import { HeroStats } from "@/components/site/HeroStats";
import { Highlight } from "@/components/ui/hero-highlight";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Spotlight } from "@/components/ui/spotlight-new";
import { profile, socials, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
// The portrait photo. To swap it: put the new file in src/assets/ (.jpg, .png or .webp),
// change the path on this line, then update portraitAlt and portraitFocus below.
// On desktop the frame takes the photo's own shape, so any aspect ratio works.
import portrait from "@/assets/profile-new.jpg";

const portraitAlt = "Lucas sitting on the steps of a columned building";
// Phones show a shorter crop; it stays centered on this point (x% y%). You're lower right.
const portraitFocus = "75% 85%";

const socialIcons = { github: IconBrandGithub, instagram: IconBrandInstagram, x: IconBrandX };

// Each block fades up once on load, one after another. Every page load opens with the
// intro curtain (IntroCurtain.tsx), which sweeps away right to left, so then each block
// waits for its intro: delay instead and appears just as the columns over it leave:
// photo frame 0.4s, photo 0.5s, text from 0.55s, stats 0.75s, all settled by about 1.6s.
// Off with reduced motion.
const rise = "animate-rise motion-reduce:animate-none";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
// Pressing a button shrinks it a touch
const press = "motion-safe:active:scale-[0.97]";
const iconButton = cn(
  "grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent",
  press,
  focusRing,
);

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");
  const links = socials.filter((s) => s.href); // only the ones with a link pasted in

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Faint light beams swaying in from the top corners (Aceternity Spotlight New) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 md:opacity-80">
        <Spotlight duration={10} className="intro:[animation-delay:100ms]" />
      </div>
      <HeroDots />

      <div className="mx-auto flex min-h-svh max-w-6xl flex-col px-6 pt-24 pb-8 lg:pt-28">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p
              className={cn(
                rise,
                "flex items-center gap-3 text-base text-muted-foreground md:text-lg intro:[animation-delay:550ms]",
              )}
            >
              <span aria-hidden="true" className="size-2 shrink-0 bg-accent" />
              {profile.role}
            </p>

            {/* Hover the name: an accent block wipes across it (Aceternity Highlight) */}
            <h1
              className={cn(
                rise,
                // 1.1 line height keeps the comma in "Hi," clear of the highlight block below it
                "mt-3 text-[clamp(3.5rem,13vw,6.5rem)] leading-[1.1] font-bold tracking-tight [animation-delay:60ms] intro:[animation-delay:610ms]",
              )}
            >
              Hi, I&apos;m
              <br />
              <Highlight trigger="hover">
                {first}
                <br />
                {rest.join(" ")}
              </Highlight>
            </h1>

            <p
              className={cn(
                rise,
                "mt-7 inline-flex max-w-full items-center gap-2 rounded-2xl border border-accent/25 bg-accent/[0.07] py-1.5 pr-3.5 pl-2.5 text-xs text-foreground/85 sm:rounded-full sm:text-sm [animation-delay:120ms] intro:[animation-delay:670ms]",
              )}
            >
              <GraduationCap aria-hidden="true" className="size-4 shrink-0 text-accent" />
              {profile.school.replace(/\.$/, "")}
            </p>

            {/* The "|" sticks to the tagline (no-break space) so a wrapped line never starts with it */}
            <p
              className={cn(
                rise,
                "mt-4 max-w-xl text-base text-muted-foreground [animation-delay:160ms] intro:[animation-delay:710ms]",
              )}
            >
              {profile.tagline}
              {" "}
              <span aria-hidden="true" className="text-muted-foreground/50">
                |
              </span>{" "}
              <span className="whitespace-nowrap">{profile.location}</span>
            </p>

            <div
              className={cn(
                rise,
                "mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:200ms] intro:[animation-delay:750ms]",
              )}
            >
              {/* Hover it: the dot fills the button (MagicUI Interactive Hover Button) */}
              <InteractiveHoverButton
                href="#projects"
                className={cn("h-11 border-accent/60 px-6 text-xs tracking-[0.14em] text-accent uppercase", focusRing)}
              >
                See what I&apos;ve built
              </InteractiveHoverButton>
              <div className="flex items-center gap-3">
                <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email" className={iconButton}>
                  <Mail className="size-[18px]" />
                </a>
                {links.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className={iconButton}
                    >
                      <Icon className="size-[18px]" stroke={1.75} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portrait: above the text on phones, right column on desktop */}
          <div className="order-first lg:order-none">
            <Portrait />
          </div>
        </div>

        {/* Three stats in one row of equal thirds: centered on phones, left-aligned from
            tablet width up (HeroStats.tsx shrinks the text a little on narrow phones so it fits) */}
        <HeroStats
          stats={stats}
          className={cn(
            rise,
            "mt-10 grid grid-cols-3 items-start gap-x-3 border-t border-border pt-7 text-center md:gap-x-6 md:text-left [animation-delay:260ms] intro:[animation-delay:750ms]",
          )}
        />
      </div>
    </section>
  );
}

/**
 * The photo in a rounded frame, with a thin dashed accent border just outside it whose
 * dashes slowly travel around (frame-dash in globals.css; holds still with reduced motion).
 * On load the frame fades in first and the photo follows (frame-in, photo-in).
 * Desktop shows the whole photo at its own aspect ratio; phones get a shorter 4:3 crop
 * so the text isn't pushed down. Hovering zooms the photo very slightly.
 */
function Portrait() {
  return (
    <div className="group relative w-full max-w-md lg:w-[20rem] lg:max-w-none xl:w-[26rem]">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -left-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] animate-frame-in overflow-visible text-accent/60 [filter:drop-shadow(0_0_3px_color-mix(in_oklab,var(--accent)_45%,transparent))] [animation-delay:100ms] motion-reduce:animate-none intro:[animation-delay:400ms]"
      >
        <rect
          width="100%"
          height="100%"
          rx="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="20 150 40 40"
          pathLength="1000"
          className="animate-frame-dash motion-reduce:animate-none"
        />
      </svg>
      <div className="animate-photo-in overflow-hidden rounded-3xl [animation-delay:200ms] motion-reduce:animate-none intro:[animation-delay:500ms]">
        <Image
          src={portrait}
          alt={portraitAlt}
          preload
          placeholder="blur"
          sizes="(min-width: 1280px) 416px, (min-width: 1024px) 320px, (min-width: 640px) 448px, calc(100vw - 3rem)"
          style={{ objectPosition: portraitFocus }}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none lg:aspect-auto"
        />
      </div>
    </div>
  );
}

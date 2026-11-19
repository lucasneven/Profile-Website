// All the site's text lives here. Edit this file to update content.
// Icons are names from src/lib/icons.ts.
import type { IconName } from "./icons";

export const profile = {
  name: "Lucas Neven",
  role: "Student builder", // small line above the name in the hero
  tagline: "I like building things.",
  location: "Los Angeles, CA", // shown after the tagline in the hero
  school: "Junior at Malibu High, CS at Santa Monica College.",
  email: "lucashneven@gmail.com",
  about:
    "I'm in the class of 2028 and like building real software, then finding out whether people actually need it. Long term, I want to build and ship real products and companies. Away from the keyboard, I'm driving canyon roads in my RS3, snowboarding at Mammoth, climbing or out on a hike.",
};

export const navLinks = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Leadership", link: "#leadership" },
  { name: "Skills", link: "#skills" },
  { name: "Interests", link: "#interests" },
];

// Numbers count up when the row scrolls into view; text values (like "ASB VP") just show.
export const stats = [
  { value: "4.0", label: "Unweighted GPA" },
  { value: "ASB VP", label: "Malibu High" },
  { value: "2", label: "Internships" },
];

// Round icon buttons in the hero, next to the email button.
// To show one, paste its full profile link between the quotes, e.g.
// href: "https://github.com/your-username". Entries left empty stay hidden.
export const socials: { name: string; icon: "github" | "instagram" | "x"; href: string }[] = [
  { name: "GitHub", icon: "github", href: "" },
  { name: "Instagram", icon: "instagram", href: "" },
  { name: "X", icon: "x", href: "" },
];

// status is the small tag next to the role, e.g. "Past" or "Current".
export const experience = [
  {
    title: "Wilkinson",
    role: "Intern",
    org: "Wilkinson Global Asset Management",
    date: "August 2026",
    status: "Past",
    text: "Mapped how the Operations and Client Services teams work, then started an internal workflow project based on it.",
  },
  {
    title: "Kosik Lab",
    role: "Research Intern",
    org: "Kosik Lab, UC Santa Barbara",
    date: "2026 · Professor Kenneth Kosik · brain organoid research",
    status: "Past",
    text: "Helped build the lab's workflow web app: the front end, job tracking (like organoid feeding), and antibody management and tracking, which the lab relies on. The app's owner is now turning it into a startup for UCSB's New Venture Competition.",
  },
];

// Photos and screenshots: `photo` is the file's name in src/assets/photos/ (see
// src/lib/photos.ts). Drop in a file with that name and the card shows it on its own;
// until then the card shows its icon. photoAlt describes it for screen readers, and
// photoPosition ("x% y%") keeps the subject in frame when the card crops it.
type Photo = { photo?: string; photoAlt?: string; photoPosition?: string };

// Projects are a stack of folders: the first one starts on top, and each click
// brings the next one forward. Screenshots crop to about 16:10. Only use real ones.
type Project = Photo & {
  tag: string;
  title: string;
  text: string;
  stack?: string;
  icon: IconName;
};

export const projects: Project[] = [
  {
    tag: "Never launched · Lesson learned",
    title: "Stackd",
    text: "A financial literacy app: Duolingo-style bite-size lessons with streaks and XP, an AI money coach, and a paid subscription. I shut it down before launch after realizing people rarely pay to learn finance. Lesson: validate demand before building.",
    stack: "React · Supabase · Stripe",
    icon: "layers",
    photo: "stackd",
    photoAlt: "Stackd's landing page: learn credit in 5 minutes a day, next to a simulated credit score card",
  },
  {
    tag: "Ended · Automation",
    title: "ButterBot",
    text: "A Telegram bot that sent me a daily brief: the moves in my holdings plus the market news that mattered. It ran on a Mac mini until cost and API limits ended it.",
    stack: "Python · Telegram · cron",
    icon: "bot",
    photo: "butterbot",
    photoAlt: "A ButterBot daily brief in Telegram: portfolio holds, this week's earnings, and a play of the day",
  },
  {
    tag: "You're looking at it",
    title: "This website",
    text: "Built with Claude Code.",
    stack: "Next.js · Tailwind · Aceternity UI",
    icon: "code",
    photo: "this-website",
    photoAlt: "Screenshot of the top of this website: Hi, I'm Lucas Neven, next to my portrait",
  },
  {
    tag: "Past · Helped build",
    title: "Kosik Lab Workflow App",
    text: "Order handling and job tracking for a UCSB neuroscience lab. As an intern I helped build the front end, job tracking (like organoid feeding), and antibody management and tracking. Its owner is now turning it into a startup.",
    icon: "flask",
    photo: "kosik",
    photoAlt: "The lab app's antibody inventory: vials left, low-stock flags, and where each antibody is stored",
  },
  {
    tag: "Ended · E-commerce",
    title: "Nipei Oil",
    text: "A wellness and essential oil brand, sourced in partnership with an Amazon community. I built the Shopify store, but it never made a sale before it ended.",
    stack: "Shopify",
    icon: "droplet",
    photo: "nipei",
  },
];

type Card = Photo & { icon: IconName; title: string; sub?: string; text: string };

// Each row opens into a card with the text (and its photo or video, once added).
export const leadership: Card[] = [
  {
    icon: "landmark",
    title: "ASB Vice President",
    sub: "Malibu High School",
    text: "I manage all of the school's clubs: I keep track of each one and its spending, and work closely with every club president.",
    photo: "asb",
  },
  {
    icon: "rocket",
    title: "Founder & President",
    sub: "Software Startup Team",
    text: "I teach students git and AI-assisted development so they ship real software. We've run our first build sprint and demo day, and we're planning to compete in Next Big Thing LA.",
    photo: "startup-team",
  },
  {
    icon: "mountain",
    title: "Co-founder",
    sub: "Body Improvement Club",
    text: "I run group lifts, teach beginners form and programming, and organize climbing trips.",
  },
  {
    icon: "waves",
    title: "Commission Member",
    sub: "Harry Barovsky Memorial Youth Commission, City of Malibu",
    text: "I advise the city council, plan youth events, and do community service.",
  },
  {
    icon: "newspaper",
    title: "Website Editor",
    sub: "Journalism · Malibu High School",
    text: "I run the content stream on our journalism site and publish all of the articles.",
    photo: "journalism",
  },
  {
    icon: "bot",
    title: "Robotics",
    sub: "Builder · Malibu High School",
    text: "I'm a builder on our VEX tournament team and put in the most hours of anyone; I'm on track to lead it next year. I also built a marble sorter in RobotC.",
    photo: "robotics", // a short robotics.mp4 works here too
    photoAlt: "Our VEX robot at a tournament",
    photoPosition: "50% 45%",
  },
  { icon: "trophy", title: "Former Varsity Athlete", sub: "Track · Football · Tennis", text: "Competed on three varsity teams." },
];

export const skillGroups = [
  { title: "Languages", items: ["Python", "JavaScript", "C"] },
  { title: "Backend & services", items: ["Supabase", "Stripe", "Vercel", "AWS (S3, Glacier)", "Windows Server"] },
  { title: "AI dev tools", items: ["Claude Code", "Lovable", "Custom Claude Code skills & agents"] },
  { title: "Other", items: ["git", "Shopify", "cron automation"] },
];

export const coursework = [
  "Santa Monica College (college credit): CS87A Python Programming, CS79A Cloud Computing",
  "Planned at SMC: CS 52, CS 20A, Multivariable Calc, Linear Algebra, Micro & Macro Econ",
  "Malibu High, junior year: AP Calc BC, AP Physics 1, AP U.S. History, AP English Language, Journalism, ASB",
  "Sophomore year: AP World History, Honors Chemistry, Honors Precalc/Calc, Honors English, Engineering",
];

// The photo carousel. It slides along on its own and holds still while you hover or
// press it. Photos crop to tall cards (about 3:4); set photoPosition to keep you in
// frame. caption is a small line under the text, for what's in the photo.
// benchPress is in lb: the Gym card shows it on a barbell loaded with matching plates.
type Interest = Card & { caption?: string; benchPress?: number };

export const interests: Interest[] = [
  {
    icon: "snowflake",
    title: "Snowboarding",
    text: "I ride black runs and hit the terrain park at Mammoth.",
    photo: "snowboarding",
    photoAlt: "Lucas snowboarding at night",
    photoPosition: "50% 60%",
  },
  {
    icon: "mountain",
    title: "Rock climbing",
    text: "I climb every week and boulder around V3–V4.",
    photo: "climbing",
    photoAlt: "Lucas bouldering at a climbing gym",
    photoPosition: "50% 48%",
  },
  {
    icon: "footprints",
    title: "Hiking",
    text: "I hike the trails around Malibu. My favorite is Punch Bowls.",
    caption: "At Topanga Point",
    photo: "hiking",
    photoAlt: "Lucas at Topanga Point overlooking the Santa Monica Mountains",
    photoPosition: "38% 75%",
  },
  {
    icon: "dumbbell",
    title: "Gym",
    text: "I lift on a weekly split.",
    benchPress: 185,
    photo: "gym",
    photoAlt: "Lucas taking a mirror selfie in the gym locker room",
    photoPosition: "50% 20%", // head to knees in the tall card
  },
  {
    icon: "car",
    title: "Cars",
    text: "I drive an Audi RS3 and dream of a Porsche Cayman. Favorite road: Angeles Crest, with Mulholland, Latigo and the Malibu canyons close behind.",
    photo: "rs3",
    photoAlt: "Lucas's dark grey Audi RS3 at night",
    photoPosition: "10% 50%", // keeps the grille, headlight and front wheel in the tall card
  },
  {
    icon: "plane",
    title: "Travel",
    text: "I love to travel. The photo up top is from Paris.",
    photo: "travel",
    photoAlt: "The candlelit altar and sculptures inside a church in Paris, shot on film",
    photoPosition: "50% 75%", // keeps the lit altar, trims the dark dome
  },
  {
    icon: "flame",
    title: "Burning Man",
    text: "I'm a Burning Man regular.",
    caption: "With John Summit at Burning Man",
    photo: "burning-man",
    photoAlt: "Lucas with John Summit at Burning Man",
    photoPosition: "64% 50%",
  },
  {
    icon: "trendingUp",
    title: "Investing",
    text: "I manage my own portfolio: long-term holds in tech and AI semiconductor stocks.",
  },
];

export const nextUp =
  "Summer 2027: I'm planning to apply to Summer Discovery at UC Berkeley, leaning toward its Engineering & Robotics Academy. Then CS and entrepreneurship in college, aiming for Stanford, UC Berkeley (especially its M.E.T. program), and UCLA.";

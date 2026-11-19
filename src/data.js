// All the site's content lives here. Edit this file to update text.

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#leadership", label: "Leadership" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#likes", label: "Interests" },
];

export const stats = [
  { value: "4.0", label: "GPA" },
  { value: "ASB VP", label: "Malibu High" },
  { value: "2", label: "internships" },
  { value: "70+", label: "app ideas tested" },
];

export const experience = [
  {
    year: "2026",
    title: "Intern, Wilkinson Global Asset Management",
    sub: "August 2026",
    text: "Mapped how the Operations and Client Services teams work, then built an internal workflow project based on it.",
  },
  {
    year: "2026",
    title: "Research Intern, Kosik Lab, UC Santa Barbara",
    sub: "Professor Kenneth Kosik · brain organoid research",
    text: "Built the lab's workflow web app for orders and jobs like organoid feeding, now being developed into a startup for UCSB's New Venture Competition.",
  },
];

export const leadership = [
  { icon: "landmark", title: "ASB Vice President", sub: "Malibu High School", text: "Student government." },
  {
    icon: "rocket",
    title: "Founder & President",
    sub: "Software Startup Team",
    text: "I teach students git and AI-assisted development so they ship real software. We run build sprints with demo days and plan to compete in Next Big Thing LA.",
  },
  { icon: "mountain", title: "Co-founder", sub: "Body Improvement Club", text: "Lifting and bouldering together." },
  {
    icon: "waves",
    title: "Commission Member",
    sub: "Harry Barovsky Memorial Youth Commission, City of Malibu",
    text: "Youth representative to the city.",
  },
  { icon: "newspaper", title: "Journalism", sub: "Malibu High School", text: "I write and report for the school's journalism program." },
  {
    icon: "bot",
    title: "Robotics",
    sub: "Member · Malibu High School",
    text: "School club. I also did VEX robotics and built a marble sorter in RobotC.",
  },
  { icon: "trophy", title: "Former Varsity Athlete", sub: "Track · Football · Tennis", text: "Competed on three varsity teams." },
];

export const projects = [
  { tag: "Active · Startup", title: "Kosik Lab Workflow App", text: "Order handling and job tracking for a UCSB neuroscience lab." },
  {
    tag: "Shut down · Lesson learned",
    title: "Stackd",
    text: "A financial literacy web app I shut down after realizing people rarely pay to learn finance. Lesson: validate demand before building.",
    stack: "React · Supabase · Stripe",
  },
  {
    tag: "Running daily",
    title: "ButterBot",
    text: "A Telegram bot that sends me daily stock briefs from a Mac mini.",
    stack: "Python · Telegram · cron",
  },
  {
    tag: "E-commerce",
    title: "Nipei Oil",
    text: "A single-product brand selling oil sourced in partnership with an Amazon community.",
    stack: "Shopify",
  },
  {
    tag: "Exploration",
    title: "70+ app ideas",
    text: "Explored ideas and stress-tested business models like dropshipping and AI consumer apps.",
  },
  { tag: "You're looking at it", title: "This website", text: "Built with Claude Code.", stack: "React · Vite" },
];

export const skillGroups = [
  { title: "Languages & frameworks", items: ["Python", "JavaScript", "React"] },
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

export const interests = [
  { icon: "trendingUp", title: "Investing", text: "I manage my own stock portfolio, focused on tech and AI semiconductors." },
  { icon: "car", title: "Cars", text: "I love driving, especially BMW and Porsche, and want to tune and work on cars myself." },
  { icon: "shirt", title: "Fashion", text: "Archive and vintage designers like Raf Simons, Helmut Lang, and Comme des Garçons." },
  { icon: "dumbbell", title: "Fitness", text: "I lift on a weekly split and climb or boulder every week." },
];

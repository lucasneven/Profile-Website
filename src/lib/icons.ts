// Icon names used in data.ts, mapped to Lucide icons (https://lucide.dev/icons).
// To use a new icon: import it here, add a name for it, then use that name in data.ts.
import {
  Bot,
  Car,
  Code,
  Droplet,
  Dumbbell,
  Flame,
  FlaskConical,
  Footprints,
  Landmark,
  Layers,
  Lightbulb,
  Mountain,
  Newspaper,
  Plane,
  Rocket,
  Snowflake,
  TrendingUp,
  Trophy,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  bot: Bot,
  car: Car,
  code: Code,
  droplet: Droplet,
  dumbbell: Dumbbell,
  flame: Flame,
  flask: FlaskConical,
  footprints: Footprints,
  landmark: Landmark,
  layers: Layers,
  lightbulb: Lightbulb,
  mountain: Mountain,
  newspaper: Newspaper,
  plane: Plane,
  rocket: Rocket,
  snowflake: Snowflake,
  trendingUp: TrendingUp,
  trophy: Trophy,
  waves: Waves,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

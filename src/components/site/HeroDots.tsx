// React Bits Dot Field behind the hero. Tweak the look with the props below:
// baseOpacity = how strong the dots are, cursorRadius = lens size,
// bulgeStrength = how much the lens magnifies.
import DotField from "@/components/reactbits/DotField";

export function HeroDots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
    >
      <DotField
        gradientFrom="#ffffff"
        gradientTo="#ffffff"
        glowColor="#ffffff"
        dotRadius={1}
        dotSpacing={24}
        baseOpacity={0.12}
        glowIntensity={0.12}
        glowRadius={120}
        cursorRadius={160}
        bulgeStrength={0}
        holdToZoom={false} /* otherwise clicking a link zooms the dots */
      />
    </div>
  );
}

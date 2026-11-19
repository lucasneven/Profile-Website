import DotField from "@/components/reactbits/DotField";

// Interactive dot field behind the top of the page. It fades out toward the
// bottom (see .hero-bg in style.css) and ignores clicks so links still work.
// DotField follows the cursor across the whole window, so the lens still tracks
// the mouse even with text on top of it.
export default function HeroBackground({ theme }) {
  const light = theme === "light";
  return (
    <div className="hero-bg" aria-hidden="true">
      <DotField
        gradientFrom="#2f6fed"   /* the site's accent blues */
        gradientTo="#7aa2ff"
        glowColor={light ? "#2f6fed" : "#ffffff"}
        baseOpacity={0.4}        /* lower = subtler dots */
        cursorRadius={220}       /* size of the lens around the cursor */
        bulgeStrength={0.6}      /* how much the lens magnifies */
        holdToZoom={false}       /* otherwise clicking any link zooms the dots */
        lightMode={light}
      />
    </div>
  );
}
